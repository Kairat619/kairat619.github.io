import fs from "node:fs/promises";
import path from "node:path";

const DEVTO_USERNAME = process.env.DEVTO_USERNAME;
const DEVTO_API_KEY = process.env.DEVTO_API_KEY;
const DEVTO_API_BASE = process.env.DEVTO_API_BASE || "https://dev.to/api";
const DEVTO_PER_PAGE = Number(process.env.DEVTO_PER_PAGE || 100);
const DEVTO_MAX_PAGES = Number(process.env.DEVTO_MAX_PAGES || 10);
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const OPENAI_API_BASE = (process.env.OPENAI_API_BASE || "https://api.openai.com/v1").replace(/\/+$/, "");
const TRANSLATION_LANGUAGE = process.env.TRANSLATION_LANGUAGE || "Kazakh";
const TARGET_LOCALE = process.env.TARGET_LOCALE || "kk";
const IMPORT_DRAFT = (process.env.DEVTO_IMPORT_DRAFT || "true").toLowerCase() !== "false";
const OUTPUT_DIR = path.join(process.cwd(), "src", "data", "blog", "_devto");
const STATE_FILE = path.join(OUTPUT_DIR, ".state.json");

if (process.argv.includes("--help")) {
  process.stdout.write(`Imports Dev.to posts, translates them, and writes Astro markdown files.

Required environment variables:
  DEVTO_USERNAME
  OPENAI_API_KEY

Optional environment variables:
  DEVTO_API_KEY
  DEVTO_API_BASE
  DEVTO_PER_PAGE
  DEVTO_MAX_PAGES
  OPENAI_API_BASE
  OPENAI_MODEL
  TRANSLATION_LANGUAGE
  TARGET_LOCALE
  DEVTO_IMPORT_DRAFT
`);
  process.exit(0);
}

if (!DEVTO_USERNAME) {
  process.stderr.write("Missing DEVTO_USERNAME environment variable.\n");
  process.exit(1);
}

if (!OPENAI_API_KEY) {
  process.stderr.write("Missing OPENAI_API_KEY environment variable.\n");
  process.exit(1);
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function yamlString(value) {
  return JSON.stringify(value ?? "");
}

function excerpt(value, maxLength = 155) {
  const text = String(value || "")
    .replace(/\r/g, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/^#+\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) return `${TRANSLATION_LANGUAGE} translation imported from Dev.to.`;
  return text.slice(0, maxLength).trimEnd() + (text.length > maxLength ? "..." : "");
}

function responseText(payload) {
  if (typeof payload?.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  const text = [];
  for (const item of payload?.output || []) {
    for (const content of item?.content || []) {
      if (content?.type === "output_text" && typeof content.text === "string") {
        text.push(content.text);
      }
    }
  }

  return text.join("\n").trim();
}

function getHeaders(extra = {}) {
  const headers = {
    Accept: "application/json",
    "User-Agent": `devto-import-${DEVTO_USERNAME}`,
    ...extra,
  };

  if (DEVTO_API_KEY) {
    headers["api-key"] = DEVTO_API_KEY;
  }

  return headers;
}

async function fetchJson(url, init = {}) {
  const response = await fetch(url, init);

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Request failed for ${url}: ${response.status} ${response.statusText}\n${body}`);
  }

  return response.json();
}

async function loadState() {
  try {
    const raw = await fs.readFile(STATE_FILE, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return { articles: {} };
    }

    throw error;
  }
}

async function saveState(state) {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.writeFile(STATE_FILE, JSON.stringify(state, null, 2) + "\n", "utf8");
}

async function fetchAllArticles() {
  const results = [];

  for (let page = 1; page <= DEVTO_MAX_PAGES; page += 1) {
    const url = new URL(`${DEVTO_API_BASE}/articles`);
    url.searchParams.set("username", DEVTO_USERNAME);
    url.searchParams.set("page", String(page));
    url.searchParams.set("per_page", String(DEVTO_PER_PAGE));

    const pageItems = await fetchJson(url, {
      headers: getHeaders(),
    });

    if (!Array.isArray(pageItems) || pageItems.length === 0) {
      break;
    }

    results.push(...pageItems);

    if (pageItems.length < DEVTO_PER_PAGE) {
      break;
    }
  }

  return results.filter(article => article.published_at);
}

async function fetchArticleDetails(id) {
  return fetchJson(`${DEVTO_API_BASE}/articles/${id}`, {
    headers: getHeaders(),
  });
}

async function translateMarkdown(article) {
  const systemPrompt = [
    `You translate technical blog posts into natural ${TRANSLATION_LANGUAGE}.`,
    "Preserve Markdown structure, headings, lists, links, images, tables, and code blocks.",
    "Do not translate URLs, code, frontmatter, or inline code identifiers unless they are natural language sentences.",
    "Keep technical terms accurate. Use clear, human wording.",
    "Return only the requested tagged format.",
  ].join(" ");

  const userPrompt = [
    `Translate this Dev.to article into ${TRANSLATION_LANGUAGE}.`,
    "Return exactly this format:",
    "<TITLE>translated title</TITLE>",
    "<BODY_MARKDOWN>",
    "translated markdown body",
    "</BODY_MARKDOWN>",
    "",
    `Original title: ${article.title}`,
    "",
    "Original markdown body:",
    article.body_markdown || article.description || "",
  ].join("\n");

  const response = await fetch(`${OPENAI_API_BASE}/responses`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      reasoning: { effort: "low" },
      store: false,
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: systemPrompt }],
        },
        {
          role: "user",
          content: [{ type: "input_text", text: userPrompt }],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `OpenAI translation request failed: ${response.status} ${response.statusText}\n${errorBody}`
    );
  }

  const payload = await response.json();
  const translated = responseText(payload);
  const titleMatch = translated.match(/<TITLE>\s*([\s\S]*?)\s*<\/TITLE>/i);
  const bodyMatch = translated.match(/<BODY_MARKDOWN>\s*([\s\S]*?)\s*<\/BODY_MARKDOWN>/i);

  if (!titleMatch || !bodyMatch) {
    throw new Error(`Could not parse translated response for article ${article.id}.`);
  }

  return {
    title: titleMatch[1].trim(),
    body: bodyMatch[1].trim(),
  };
}

function buildMarkdown(article, translation) {
  const slug = slugify(article.slug || article.title || `devto-${article.id}`) || `devto-${article.id}`;
  const tags = Array.isArray(article.tag_list) && article.tag_list.length > 0
    ? [...new Set(["devto", TARGET_LOCALE, ...article.tag_list.map(tag => slugify(tag)).filter(Boolean)])]
    : ["devto", TARGET_LOCALE];
  const description = excerpt(translation.body || translation.title || article.description);
  const sourceLine =
    `> This post is a ${TRANSLATION_LANGUAGE} translation of the original Dev.to article. ` +
    `[Read the original](${article.url}).`;

  const frontmatter = [
    "---",
    `title: ${yamlString(translation.title || article.title)}`,
    `pubDatetime: ${article.published_at || article.created_at}`,
    `modDatetime: ${article.edited_at || article.published_at || article.created_at}`,
    `slug: ${yamlString(slug)}`,
    "featured: false",
    `draft: ${IMPORT_DRAFT ? "true" : "false"}`,
    `tags: [${tags.map(yamlString).join(", ")}]`,
    `description: ${yamlString(description)}`,
    `canonicalURL: ${yamlString(article.url)}`,
    "hideEditPost: true",
    `timezone: ${yamlString("Asia/Qyzylorda")}`,
    "---",
    "",
    sourceLine,
    "",
    translation.body.trim(),
    "",
  ];

  return {
    slug,
    content: frontmatter.join("\n"),
  };
}

async function syncArticles() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const [articles, existingState] = await Promise.all([fetchAllArticles(), loadState()]);
  const nextState = { articles: {} };
  const expectedFiles = new Set();

  for (const summary of articles) {
    const details = await fetchArticleDetails(summary.id);
    const currentVersion = details.edited_at || details.published_at || details.created_at;
    const previous = existingState.articles?.[String(details.id)];
    const existingFilePath = previous?.filePath ? path.join(process.cwd(), previous.filePath) : null;
    const canReuse =
      previous &&
      previous.sourceUpdatedAt === currentVersion &&
      existingFilePath;

    if (canReuse) {
      try {
        await fs.access(existingFilePath);
        nextState.articles[String(details.id)] = previous;
        expectedFiles.add(existingFilePath);
        process.stdout.write(`Reused translation for article ${details.id}: ${details.title}\n`);
        continue;
      } catch {
        // If the file disappeared locally, regenerate it.
      }
    }

    const translation = await translateMarkdown(details);
    const { slug, content } = buildMarkdown(details, translation);
    const fileName = `${String(details.id).padStart(6, "0")}-${slug}.md`;
    const relativeFilePath = path.join("src", "data", "blog", "_devto", fileName);
    const absoluteFilePath = path.join(process.cwd(), relativeFilePath);

    await fs.writeFile(absoluteFilePath, content, "utf8");

    nextState.articles[String(details.id)] = {
      filePath: relativeFilePath,
      slug,
      sourceUpdatedAt: currentVersion,
      sourceUrl: details.url,
      title: details.title,
    };
    expectedFiles.add(absoluteFilePath);
    process.stdout.write(`Translated and wrote article ${details.id}: ${details.title}\n`);
  }

  const previousFiles = Object.values(existingState.articles || {})
    .map(entry => entry?.filePath)
    .filter(Boolean)
    .map(filePath => path.join(process.cwd(), filePath));

  for (const filePath of previousFiles) {
    if (!expectedFiles.has(filePath)) {
      await fs.rm(filePath, { force: true });
      process.stdout.write(`Removed stale generated file ${path.relative(process.cwd(), filePath)}\n`);
    }
  }

  await saveState(nextState);
  process.stdout.write(`Synced ${articles.length} Dev.to article(s) into ${OUTPUT_DIR}\n`);
}

syncArticles().catch(error => {
  process.stderr.write(`${error instanceof Error ? error.stack || error.message : String(error)}\n`);
  process.exit(1);
});
