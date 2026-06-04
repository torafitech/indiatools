# Agent: GitHub README Generator

## Context
**Route:** `/readme-generator` | **Category:** Developer | **Tier:** 2
**Purpose:** AI generates a complete README.md from project description. Paste or describe repo → get full professional README.

## Key Files
```
app/readme-generator/page.tsx
components/tools/ReadmeGenerator.tsx
app/api/readme-gen/route.ts
```

## Inputs
- Project name
- Description (what it does)
- Tech stack (comma-separated)
- Key features (bullet points)
- Installation steps
- Usage example

## Output
Full README.md with: badges, table of contents, installation, usage, features, contributing, license sections.
Display in a code block with "Copy Markdown" button.

## Skills to Load
```
/frontend-design  /claude-api
```
