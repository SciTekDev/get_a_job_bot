---
name: resume-builder
description: 'Build a tailored resume document from the snippet library. Use when the user wants to generate a resume, create a resume for a job posting, or assemble resume content. Invoke with a job description or job title as the argument.'
argument-hint: 'Paste the job description or job title here'
---

# Resume Builder

Assembles a polished, tailored resume from the snippet library in this workspace, optimized for a specific job description.

## When to Use
- User wants to generate a resume for a specific job
- User says "build my resume", "create a resume for this job", "make a resume"
- User points to a `job_applications/*/job_description.md` file

## Procedure

### 1. Locate the Job Description
If the user provides a path to a `job_applications/*/job_description.md` file, read that file.
If the user pastes a JD directly, first determine the company name and role from it, then check if a matching folder exists in `job_applications/`. If not, create one named `YYYY-MM-DD_[Company]_[Role]` (using today's date) and save the JD as `job_description.md` inside it before proceeding.

Extract from the JD:
- Required skills and technologies
- Preferred qualifications
- Key responsibilities and themes
- Industry/domain signals (e.g., "cloud", "leadership", "data engineering")

### 2. Inventory All Snippets
Read every file in each snippet folder:
- `work-experience/*.md`
- `certifications/*.md`
- `accomplishments/*.md`
- `skills/*.md`
- `education/*.md`
- `projects/*.md`

Match each snippet's `tags` array against the extracted keywords. Score by overlap.

### 3. Select and Rank Content
- **Work experience**: Include top 2-4 most relevant roles. For each role, lead with bullet points that directly address the JD's priorities.
- **Skills**: Include only skill categories with meaningful overlap. Order by relevance.
- **Certifications**: Include if directly relevant to the role.
- **Accomplishments**: Include 1-3 that best demonstrate the JD's desired outcomes.
- **Projects**: Include when the JD requires skills not fully covered by professional experience — especially for game development, casino mathematics, embedded hardware, or other domains where personal/hobby work bridges a gap. Include 1-3 most relevant projects. Place the Projects section after Work Experience and before Certifications.
- **Education**: Always include; condense if space is needed.

### 4. Assemble Using the Template Below

Produce the final resume as a Markdown document and save it as `resume.md` inside the job application folder.

### 5. Self-Review After Saving the Draft

After the draft `resume.md` is written, perform the following checks and apply corrections directly to the file:

#### a. Banned Words Scan
Search every line for the following overused, hollow buzzwords and replace each with a concrete, specific alternative:

| Banned | Replace with |
|--------|-------------|
| spearheaded | led, launched, drove, initiated |
| revolutionized | transformed, rebuilt, overhauled, redesigned |
| leveraged | used, applied, built on, employed |
| utilized | used |
| cutting-edge | specific technology name, or just remove the modifier |
| robust | specific quality (fault-tolerant, high-availability, scalable) |
| seamlessly | remove the word; describe the actual integration |
| passionate | remove; show enthusiasm through accomplishments instead |
| innovative | describe the actual innovation concretely |

#### b. Grammar & Accuracy Check
- Verify all dates are consistent with the snippet source files
- Confirm no bullet points begin with "responsible for," "tasked with," or "in charge of"
- Confirm every bullet begins with a strong past-tense action verb (or present tense for current role)
- Check that all metrics and numbers match exactly what is in the snippet files — do not round, estimate, or embellish
- Confirm the contact block is populated from `contact.md` and not left as placeholder text

#### c. Report
After saving, briefly note any substitutions made during the banned-word scan so the user can review them.

---

## Resume Template

> **IMPORTANT**: Fill in the contact block below from the user's profile or ask if not yet stored.

```
[FULL NAME]
[City, State] | [Phone] | [Email] | [LinkedIn URL] | [GitHub/Portfolio URL (if relevant)]

---

## Summary
[2-3 sentence professional summary tailored to the target role. Mention years of experience,
core strengths, and the value delivered — mirror language from the JD.]

---

## Skills
[CATEGORY 1]: Item, Item, Item
[CATEGORY 2]: Item, Item, Item
[CATEGORY 3]: Item, Item, Item

---

## Work Experience

### [Job Title] — [Company Name] | [Start Month YYYY] – [End Month YYYY or Present]
*[Location or Remote]*
- [Achievement-focused bullet: Action verb + context + quantified result]
- [Achievement-focused bullet]
- [Achievement-focused bullet]

### [Job Title] — [Company Name] | [Start Month YYYY] – [End Month YYYY]
...

---

## Certifications
- **[Cert Name]** — [Issuer] | Issued [Month YYYY] | Expires [Month YYYY or N/A]

---

## Accomplishments
- **[Title]** ([Year]): [One-line impact statement]

---

## Projects  *(include only when bridging a skill gap — omit if not needed)*

### [Project Title] | [Year]
*[Technologies used]*
- [What you built and what it demonstrates]
- [Specific technical detail or outcome]

---

## Education
**[Degree], [Field]** — [Institution] | [Graduated Month YYYY]
[GPA or honors if notable]
```

---

## Output Rules
- Use **action verbs** to start every bullet (Led, Reduced, Built, Delivered, Optimized…).
- Include **metrics** wherever available from the snippets.
- Keep the resume to **one page** if under 10 years experience; two pages max otherwise.
- Do **not** fabricate experience — only use what is in the snippet files.
- Save the draft as `resume.md` inside the job application folder (e.g., `job_applications/2026-06-24_Acme-Corp_Senior-Engineer/resume.md`), then proceed to the Step 5 self-review before telling the user the file is ready.

---

## Best Practices Checklist (apply to every resume built)

These 10 principles must be actively applied during every resume assembly:

1. **Tailor to the job description** — Mirror the JD's exact keywords and phrases for ATS compatibility. Never send the full-library `full_resume` version as-is to an employer.

2. **Quantify results wherever possible** — Lead with numbers. Prefer bullets like *"serving ~60,000 terminals at 99.999% uptime"* over vague descriptions of scope.

3. **Action verbs only — no "responsible for"** — Every bullet must start with a strong verb: *Designed, Built, Led, Pitched, Delivered, Reduced, Implemented*. Flag and rewrite any passive phrasing.

4. **Two pages max — cut ruthlessly for relevance** — With extensive history, trim aggressively. Retail and unrelated roles should not appear on tech resumes unless the role specifically calls for diverse background.

5. **Leave off jobs older than 10–15 years unless highly relevant** — Only include older roles if they directly support the JD's requirements.

6. **Show career progression** — Frame the summary to highlight the arc of growth. Titles, promotions, and increasing scope signal seniority. Make the trajectory explicit.

7. **Omit high school if the candidate has higher education** — Trade School may be condensed into the Certifications section (as the origin of the a certification) rather than listed as a standalone education entry on targeted resumes.

8. **Provide links to work (LinkedIn, Credly)** — Always include LinkedIn in the header. Include the Credly profile URL (https://www.credly.com/users/--template--) in the certifications section for the any credential.

9. **Avoid generic soft skills — prove them with specifics** — Do not write "good communicator" or "team player." Replace with concrete examples already present in the accomplishments snippets (e.g., cross-functional architecture presentations, global team coordination).

10. **Use standard section headings for ATS compatibility** — Always use: Summary, Skills, Work Experience, Certifications, Accomplishments, Education. Do not rename sections creatively — ATS systems cannot parse non-standard headings.

## Contact Information Storage
If contact information is not yet saved, ask the user for:
- Full name
- City, State
- Phone number
- Email address
- LinkedIn URL
- GitHub or portfolio URL (optional)

Then save it to `.github/skills/resume-builder/assets/contact.md` for future use.
