export type GitHubIssueComment = {
  id: number;
  bodyHtml: string;
  createdAt: Date;
  updatedAt: Date;
  url: string;
  author: {
    login: string;
    profileUrl: string;
    avatarUrl: string;
  };
};

function parseIssueUrl(issueUrl: string) {
  try {
    const url = new URL(issueUrl);
    const match = url.pathname.match(/^\/([^/]+)\/([^/]+)\/issues\/(\d+)\/?$/);

    if (!match) return null;

    return {
      owner: match[1],
      repo: match[2],
      issueNumber: match[3],
    };
  } catch {
    return null;
  }
}

export async function getIssueComments(issueUrl?: string): Promise<GitHubIssueComment[]> {
  if (!issueUrl) return [];

  const parsed = parseIssueUrl(issueUrl);
  if (!parsed) return [];

  const headers: HeadersInit = {
    Accept: "application/vnd.github.html+json",
    "User-Agent": `${parsed.owner}-${parsed.repo}-issue-comments`,
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(
    `https://api.github.com/repos/${parsed.owner}/${parsed.repo}/issues/${parsed.issueNumber}/comments?per_page=100`,
    { headers }
  );

  if (!response.ok) {
    return [];
  }

  const comments = await response.json();

  if (!Array.isArray(comments)) {
    return [];
  }

  return comments.map(comment => ({
    id: comment.id,
    bodyHtml: comment.body_html ?? "",
    createdAt: new Date(comment.created_at),
    updatedAt: new Date(comment.updated_at),
    url: comment.html_url,
    author: {
      login: comment.user?.login ?? "unknown",
      profileUrl: comment.user?.html_url ?? issueUrl,
      avatarUrl: comment.user?.avatar_url ?? "",
    },
  }));
}
