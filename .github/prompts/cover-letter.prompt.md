---
name: cover-letter
description: 'Generate a tailored cover letter for a job posting using the resume snippet library. Use when the user wants to write a cover letter, draft an application letter, or create a personalized introduction for a job.'
argument-hint: 'Paste the job description here'
agent: agent
tools: [read, search]
---

Generate a tailored cover letter for the job description provided as the argument (or pasted in the conversation).

## Step 1 — Locate the Job Description
If the user provides a path to a `job_applications/*/job_description.md` file, read that file.
If the user pastes a JD directly, determine the company name and role from it, then check if a matching folder exists in `job_applications/`. If not, create one named `YYYY-MM-DD_[Company]_[Role]` (using today's date) and save the JD as `job_description.md` inside it before continuing.

Note the application folder path — the cover letter will be saved there.

## Step 2 — Read Contact Info
Read [contact info](./../skills/resume-builder/assets/contact.md) to get the applicant's name, email, phone, location, and LinkedIn.

## Step 2 — Inventory the Snippet Library
Read all files in:
- `work-experience/*.md`
- `certifications/*.md`
- `accomplishments/*.md`
- `skills/*.md`
- `education/*.md`

Match snippet `tags` against keywords in the job description. Identify the top 2-3 most relevant experiences and 1-2 standout accomplishments.

## Step 3 — Extract Key Details from the JD
- Company name and hiring manager name (if present)
- The role title
- 2-3 core priorities or requirements to address directly
- Any values or culture signals worth mirroring in tone

## Step 4 — Write the Cover Letter

Use this structure:

```
[FULL NAME]
[Email] | [Phone] | [LinkedIn]
[City, State]

[Today's Date]

Hiring Manager
[Company Name]

Dear Hiring Manager,

[OPENING PARAGRAPH — 2-3 sentences]
Express genuine interest in the specific role and company. Name the position explicitly.
Hook with a concise statement of the value you bring.

[BODY PARAGRAPH 1 — 3-4 sentences]
Highlight the most relevant work experience. Tie a specific accomplishment (with a metric
from the snippets) directly to a stated requirement in the JD.

[BODY PARAGRAPH 2 — 3-4 sentences]
Address a second priority from the JD. Use a different snippet (skill category, certification,
or another role) to show breadth. Avoid repeating what was said in paragraph 1.

[CLOSING PARAGRAPH — 2-3 sentences]
Reiterate enthusiasm. State a clear call to action (interview, conversation, next step).
Thank the reader.

Sincerely,
[FULL NAME]
```

## Output Rules
- Keep the letter to **one page** — aim for 280–380 words in the body.
- Mirror language and keywords from the job description naturally — do not stuff.
- Do **not** invent experience — only use what is in the snippet files.
- Use a **confident, professional tone** — not overly formal, not casual.
- Save the output as `cover_letter.md` inside the job application folder (e.g., `job_applications/2026-06-24_Acme-Corp_Senior-Engineer/cover_letter.md`) and tell the user the full path.
