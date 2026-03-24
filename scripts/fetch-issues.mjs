import fs from "node:fs/promises";
import path from "node:path";

const owner = process.env.GITHUB_OWNER || "Kairat619";
const repo = process.env.GITHUB_REPO || "kairat619.github.io";
const token = process.env.GITHUB_TOKEN;
const label = process.env.GITHUB_BLOG_LABEL || "blog-post";
const featuredLabel = process.env.GITHUB_FEATURED_LABEL || "featured";
const outputDir = path.join(process.cwd(), "src", "data", "blog", "_issues");

if (!token) {
  process.stderr.write("Missing GITHUB_TOKEN environment variable.\n");
  process.exit(1);
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function excerpt(body) {
  const text = body
    .replace(/\r/g, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/^#+\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) return "Imported from GitHub Issues.";
  return text.slice(0, 155).trimEnd() + (text.length > 155 ? "..." : "");
}

function yamlString(value) {
  return JSON.stringify(value ?? "");
}

function buildMarkdown(issue) {
  const slug = slugify(issue.title) || `issue-${issue.number}`;
  const issueLabels = issue.labels
    .map(item => (typeof item === "string" ? item : item.name))
    .filter(Boolean);
  const isFeatured = issueLabels.includes(featuredLabel);
  const tags = issueLabels.filter(name => name !== label && name !== featuredLabel);
  const frontmatter = [
    "---",
    `title: ${yamlString(issue.title)}`,
    `pubDatetime: ${issue.created_at}`,
    `modDatetime: ${issue.updated_at}`,
    `slug: ${slug}`,
    `featured: ${isFeatured ? "true" : "false"}`,
    "draft: false",
    `tags: ${tags.length ? `[${tags.map(yamlString).join(", ")}]` : "[\"others\"]"}`,
    `description: ${yamlString(excerpt(issue.body || ""))}`,
    `canonicalURL: ${yamlString(issue.html_url)}`,
    "hideEditPost: true",
    "---",
    "",
    issue.body?.trim() || "No content provided.",
    "",
    `Source issue: [#${issue.number}](${issue.html_url})`,
    "",
  ];

  return { slug, content: frontmatter.join("\n") };
}

async function fetchIssues() {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues?state=open&labels=${encodeURIComponent(label)}&per_page=100`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "User-Agent": `${owner}-${repo}-issue-sync`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`);
  }

  const issues = await response.json();
  return issues.filter(item => !item.pull_request);
}

async function resetOutputDirectory() {
  await fs.mkdir(outputDir, { recursive: true });
  const existing = await fs.readdir(outputDir, { withFileTypes: true });
  await Promise.all(
    existing
      .filter(entry => entry.isFile() && entry.name.endsWith(".md"))
      .map(entry => fs.unlink(path.join(outputDir, entry.name)))
  );
}

async function writePosts(issues) {
  await resetOutputDirectory();

  await Promise.all(
    issues.map(async issue => {
      const { slug, content } = buildMarkdown(issue);
      const filePath = path.join(outputDir, `${String(issue.number).padStart(4, "0")}-${slug}.md`);
      await fs.writeFile(filePath, content, "utf8");
    })
  );
}

async function main() {
  const issues = await fetchIssues();
  await writePosts(issues);
  process.stdout.write(
    `Generated ${issues.length} post(s) from GitHub Issues into ${outputDir}\n`
  );
}

main().catch(error => {
  process.stderr.write(`${error instanceof Error ? error.stack || error.message : String(error)}\n`);
  process.exit(1);
});
