# Dev.to to Kazakh Blog Automation

This repository can already deploy to GitHub Pages from GitHub Actions. The new Dev.to workflow adds one more automation layer:

1. Fetch your Dev.to posts
2. Translate them into Kazakh with OpenAI
3. Save them as Astro markdown files in `src/data/blog/_devto/`
4. Commit those generated files back to `main`
5. Let the existing Pages deploy workflow publish the site

## What was added

- Script: `scripts/import-devto.mjs`
- Workflow: `.github/workflows/import-devto.yml`
- NPM script: `pnpm run sync:devto`
- Generated content folder: `src/data/blog/_devto/`

## One-time GitHub setup

### 1. Enable Pages deployment from Actions

In your GitHub repository:

1. Open `Settings`
2. Open `Pages`
3. Set `Source` to `GitHub Actions`

Your existing workflow `.github/workflows/deploy.yml` will build and publish the site after each push to `main`.

### 2. Add repository secrets

Open `Settings -> Secrets and variables -> Actions` and add these repository secrets:

- `DEVTO_USERNAME`: your Dev.to username only, without `@`
- `OPENAI_API_KEY`: your OpenAI API key

Optional secrets:

- `DEVTO_API_KEY`: use this if you want authenticated Dev.to API access
- `OPENAI_MODEL`: override the default translation model

## Local test

You can run the importer locally before using the workflow.

### PowerShell

```powershell
$env:DEVTO_USERNAME="your-devto-username"
$env:OPENAI_API_KEY="your-openai-api-key"
$env:OPENAI_MODEL="gpt-4.1-mini"
pnpm run sync:devto
```

Generated posts will appear in `src/data/blog/_devto/`.

## How generated posts behave

- Each imported Dev.to post becomes a Markdown file.
- Files are generated in `src/data/blog/_devto/`.
- The original Dev.to URL is stored in `canonicalURL`.
- Generated posts default to `draft: false` so successful imports are published automatically.
- If the source article has not changed, the script reuses the existing translation and skips another API call.

## Publish flow

1. Publish or update an article on Dev.to
2. Run the `Import Dev.to posts` workflow manually, or wait for the nightly schedule
3. Review the generated Markdown in `src/data/blog/_devto/`
4. Push to `main`
5. GitHub Pages publishes the updated site

## Recommended next edits

Before launch, personalize `src/config.ts`:

- `website`
- `title`
- `desc`
- `author`
- `profile`
- `lang` -> set to `kk`

## Notes

- The importer is designed for your own Dev.to posts.
- Translation quality is usually good, so it is still worth reviewing technical wording after import.
- If you want to hold posts for manual review in the future, set `DEVTO_IMPORT_DRAFT=true` in the workflow or local environment.
