---
name: extract-snippets
description: 'Extract resume snippets from an existing resume file and save them into the snippet library. Use when the user wants to import an old resume, parse an existing CV, extract experience from a past resume, or populate the snippet folders from a resume document.'
argument-hint: 'Path to the existing resume file, or paste the resume text'
---

# Extract Snippets from an Existing Resume

Parses an existing resume document and extracts structured snippets into the appropriate folders in the snippet library.

## When to Use
- User wants to import an old resume into the workspace
- User says "extract from my resume", "parse my CV", "import my old resume"
- User points to an existing `.md`, `.txt`, `.docx`, or pasted resume text

## Procedure

### Step 1 — Read the Source Resume
If the user provides a `.docx` file path, extract its text using the bundled script:
```
node .github/skills/extract-snippets/scripts/extract_docx.js "<path-to-file.docx>"
```
See [extract_docx.js](./scripts/extract_docx.js). Requires `mammoth` — install once with `npm install mammoth` in the workspace root if not already present.

If the user provides a `.md` or `.txt` file, read it directly. If the user pastes text, use that as the source. Confirm you have the content before proceeding.

### Step 2 — Inventory Existing Snippets
Before creating anything, check what already exists:
- List files in `work-experience/`, `certifications/`, `accomplishments/`, `skills/`, `education/`
- Note existing entries to avoid creating duplicates

### Step 3 — Extract and Classify Content

Parse the resume and identify each section. Map sections to snippet folders:

| Resume Section | Snippet Folder |
|----------------|----------------|
| Work History / Experience | `work-experience/` |
| Skills / Technical Skills / Competencies | `skills/` |
| Certifications / Licenses / Credentials | `certifications/` |
| Awards / Honors / Achievements / Recognition | `accomplishments/` |
| Education / Degrees | `education/` |

For each identified item, extract:
- All relevant facts (dates, titles, companies, metrics, technologies)
- Bullet points or descriptions verbatim — do not paraphrase or embellish
- Tags: derive from technologies, domains, and themes mentioned

### Step 4 — Present Extraction Plan

Before writing any files, present a summary table of what will be created:

```
📋 Extraction Plan

Work Experience (3 entries):
  • 2021-2023  Senior Software Engineer — Acme Corp  [new]
  • 2018-2021  Software Engineer — Beta Inc          [new]
  • 2016-2018  Junior Developer — Gamma LLC          [new]

Skills (2 files):
  • programming-languages.md                        [new]
  • cloud-platforms.md                              [new]

Certifications (1 entry):
  • AWS Solutions Architect Associate               [new]

Accomplishments (1 entry):
  • Employee of the Year 2022                       [new]

Education (1 entry):
  • BS Computer Science — State University          [new]

⚠️  Skipping: [any items already covered by existing snippets]
```

Ask: "Does this look right? Should I proceed?"

### Step 5 — Create Snippet Files

After confirmation, create each file using the format defined in the folder's README.

#### Work Experience files → `work-experience/YYYY-COMPANYNAME-title.md`
```markdown
---
company: [Company Name]
title: [Job Title]
start: [YYYY-MM]
end: [YYYY-MM or present]
location: [City, State or Remote]
tags: [derived from technologies, domains, responsibilities]
---

## Summary
[1-2 sentence overview extracted from resume]

## Responsibilities
[Bullet points extracted verbatim from resume]

## Achievements
[Metrics and accomplishments extracted verbatim]
```

#### Skills files → `skills/category-name.md`
```markdown
---
category: [Category Name]
tags: [individual skill names]
---

## Skills
[Skills with proficiency or years if mentioned in source resume]
```

#### Certifications → `certifications/YYYY-cert-name.md`
```markdown
---
name: [Certification Name]
issuer: [Issuing Organization]
issued: [YYYY-MM if known]
expires: [YYYY-MM or N/A]
tags: [relevant technology/domain tags]
---

## Description
[Description from resume if present]
```

#### Accomplishments → `accomplishments/YYYY-short-description.md`
```markdown
---
title: [Award or Achievement Title]
context: [Company or Organization]
year: [YYYY]
tags: [relevant tags]
---

## Description
[Description extracted from resume]
```

#### Education → `education/YYYY-institution-degree.md`
```markdown
---
institution: [Institution Name]
degree: [Degree Type]
field: [Field of Study]
graduated: [YYYY-MM if known]
tags: [field, domain tags]
---

## Highlights
[Honors, GPA, notable coursework if mentioned]
```

### Step 6 — Report Results

After creating all files, print a summary:
- List each file created with its path
- Note any content that was ambiguous or skipped, and why
- Suggest: "Run `/resume-builder` or `/cover-letter` now that your snippets are populated."

## Rules
- **Never invent or embellish** — only use what appears in the source resume
- **Preserve metrics** exactly as written (percentages, dollar amounts, headcounts)
- **Derive tags** from the actual content — do not guess at skills not mentioned
- If a section is ambiguous (e.g., unclear dates, combined roles), note it and ask before creating the file
