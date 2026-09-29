---
name: import-job
description: 'Import a job description into the job_applications folder. Use when the user wants to save a job posting, start a new job application, or add a job description to the workspace. Creates the application subfolder and saves the formatted job_description.md.'
argument-hint: 'Paste the full job description here'
agent: agent
tools: [read, edit]
---

Import the provided job description into the `job_applications/` folder.

## Step 1 — Extract Key Details

Parse the job description and extract:
- **Company name** — the hiring organization
- **Role title** — the exact job title
- **Location** — city/state/remote (if present)
- **Employment type** — full-time, contract, part-time (if present)
- **Source** — ask the user where they found the posting (LinkedIn, Indeed, company website, referral, etc.) if not obvious from the text

## Step 2 — Confirm Before Creating

Present a one-line summary to the user:

> "Creating application folder for **[Role Title]** at **[Company Name]** — does this look right?"

Wait for confirmation. If the company name or role title is unclear, ask before proceeding.

## Step 3 — Create the Application Folder

Folder path: `job_applications/YYYY-MM-DD_[Company]_[Role]/`
- Use today's date for `YYYY-MM-DD`
- Replace spaces with hyphens in company and role names
- Remove special characters (commas, slashes, parentheses)
- Example: `job_applications/2026-06-24_Acme-Corp_Senior-Software-Engineer/`

## Step 4 — Save job_description.md

Create `job_description.md` inside the new folder using this format:

```markdown
---
company: [Company Name]
role: [Role Title]
location: [Location or Remote]
employment_type: [Full-time / Contract / Part-time]
date_saved: [YYYY-MM-DD]
source: [LinkedIn / Indeed / Company Website / Referral / Other]
status: saved
---

[Full job description text pasted verbatim here]
```

## Step 5 — Confirm and Suggest Next Steps

Tell the user the exact path where the file was saved, then offer:

> **Next steps:**
> - `/resume-builder` — generate a tailored resume for this role
> - `/cover-letter` — write a cover letter for this role
> - **Interview Prep** agent — analyze gaps between your snippets and this JD
