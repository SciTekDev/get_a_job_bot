# Resume Workspace — Agent Instructions

This workspace is a structured library of resume snippets used to compose tailored resumes for specific job postings.

## Workspace Structure

| Folder | Purpose |
|--------|---------|
| `work-experience/` | One file per role. See [README](./work-experience/README.md) for format. |
| `certifications/` | One file per certification/credential. See [README](./certifications/README.md). |
| `accomplishments/` | Notable achievements and awards. See [README](./accomplishments/README.md). |
| `skills/` | Skill category files grouped by domain. See [README](./skills/README.md). |
| `projects/` | Personal and side projects that demonstrate skills outside formal employment. See [README](./projects/README.md). |
| `education/` | Degree and educational credentials. See [README](./education/README.md). || `job_applications/` | One subfolder per job application. See [README](./job_applications/README.md). Each subfolder contains `job_description.md`, `resume.md`, and `cover_letter.md`. || `.github/skills/resume-builder/` | Skill that assembles finished resumes. |
| `.github/agents/` | Custom agents (e.g., interview-prep agent). |

## Snippet Conventions

- Every snippet file uses YAML frontmatter with a `tags:` array.
- Tags drive relevance matching — keep them specific and consistent.
- Use metrics and quantifiable results wherever possible.
- Files are written in first-person voice to match resume conventions.

## Available Tools

- **`/resume-builder`** — Assembles a tailored resume from snippets for a given job description.
- **Interview Agent** — Analyzes a job description and identifies gaps; ask it to review a JD.

## Key Rules for AI Agents

- Never invent or assume experience — only use what is present in the snippet files.
- When building a resume or cover letter, read ALL snippet files before selecting which to include.
- Always match snippet `tags` against job description keywords to determine relevance.
- **Job application folder**: Each application lives in `job_applications/YYYY-MM-DD_[Company]_[Role]/`. Always save `resume.md` and `cover_letter.md` into that subfolder alongside `job_description.md`.
- If a `job_applications/` subfolder does not yet exist for a given JD, create it and save the JD as `job_description.md` before generating any output.
- Output resumes in the format defined in the resume-builder skill template.
- Highlight the most relevant experience first; de-emphasize or omit unrelated content.
