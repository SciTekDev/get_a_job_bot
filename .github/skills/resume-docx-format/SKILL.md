---
name: resume-docx-format
description: "Design system and code patterns for generating resume and cover letter Word documents (.docx) using the docx npm library. Use this skill whenever generating a new generate-resume.js or generate-cover-letter.js for a job application. Ensures visual consistency across all application documents."
---

# Resume Word Document Format Guide

All resume and cover letter `.docx` files in this workspace are generated with JavaScript using the `docx` npm package. This skill documents the exact formatting conventions, helper functions, and code patterns to use — ensuring every application looks consistent.

---

## Setup

```javascript
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, LevelFormat,
  BorderStyle, TabStopType, TabStopPosition, ExternalHyperlink, UnderlineType
} = require('docx');
const fs   = require('fs');
const path = require('path');
```

Install: `npm install docx` (workspace root has it pre-installed)

---

## Design Tokens

```javascript
const ACCENT = '1F5C9E'; // dark blue — name, section headings, hyperlinks, rule lines
const GRAY   = '555555'; // dates, location, contact details, secondary text
const BLACK  = '000000'; // body text, bullets
```

---

## Page Setup

```javascript
// US Letter, 0.75" margins all sides
properties: {
  page: {
    size: { width: 12240, height: 15840 },
    margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }
  }
}
```

Cover letters use 1" margins (`1440`) instead.

---

## Document-Level Defaults

```javascript
styles: {
  default: {
    document: { run: { font: 'Arial', size: 20 } }
  }
}
```

---

## Bullet Numbering Config

```javascript
numbering: {
  config: [{
    reference: 'bullets',
    levels: [{
      level: 0,
      format: LevelFormat.BULLET,
      text: '\u2022',
      alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 480, hanging: 240 } } }
    }]
  }]
}
```

---

## Helper Functions

All helpers are defined at the top of each script before the `Document` constructor.

### `rule()` — Horizontal section divider
```javascript
function rule() {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: ACCENT, space: 1 } },
    spacing: { before: 0, after: 100 },
    children: []
  });
}
```

### `sectionHeading(text)` — Returns `[headingParagraph, rule()]`
```javascript
function sectionHeading(text) {
  return [
    new Paragraph({
      spacing: { before: 220, after: 0 },
      children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 22, color: ACCENT, font: 'Arial' })]
    }),
    rule()
  ];
}
// Usage: ...sectionHeading('Work Experience')
```

### `bullet(text)` — Standard bullet point
```javascript
function bullet(text) {
  return new Paragraph({
    numbering: { reference: 'bullets', level: 0 },
    spacing: { before: 20, after: 20 },
    children: [new TextRun({ text, size: 20, font: 'Arial', color: BLACK })]
  });
}
```

### `skillLine(label, value)` — Bold label + normal value
```javascript
function skillLine(label, value) {
  return new Paragraph({
    spacing: { before: 30, after: 30 },
    children: [
      new TextRun({ text: label + ': ', bold: true, size: 20, font: 'Arial' }),
      new TextRun({ text: value, size: 20, font: 'Arial' })
    ]
  });
}
```

### `jobHeader(title, company, dates, _location)` — Right-aligned dates
```javascript
function jobHeader(title, company, dates, _location) {
  return new Paragraph({
    spacing: { before: 180, after: 40 },
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    children: [
      new TextRun({ text: `${title} \u2014 ${company}`, bold: true, size: 22, font: 'Arial' }),
      new TextRun({ text: `\t${dates}`, size: 20, font: 'Arial', color: GRAY })
    ]
  });
}
```

### `jobLocation(loc)` — Italic gray location line
```javascript
function jobLocation(loc) {
  return new Paragraph({
    spacing: { before: 0, after: 60 },
    children: [new TextRun({ text: loc, size: 20, font: 'Arial', color: GRAY, italics: true })]
  });
}
```

### `accomplishment(title, year, desc)` — Bold prefix bullet
```javascript
function accomplishment(title, year, desc) {
  return new Paragraph({
    numbering: { reference: 'bullets', level: 0 },
    spacing: { before: 30, after: 30 },
    children: [
      new TextRun({ text: `${title} (${year}): `, bold: true, size: 20, font: 'Arial' }),
      new TextRun({ text: desc, size: 20, font: 'Arial' })
    ]
  });
}
```

---

## Document Header Block (Resume)

Use `.github/skills/resume-builder/assets/contact.md` as the source of truth for all contact details. Do not copy real personal information into this skill or hardcode it in application scripts; substitute the values from that file when generating each document. The bracketed values below are template placeholders.

```javascript
// Name
new Paragraph({
  spacing: { before: 0, after: 60 },
  children: [new TextRun({ text: '[John Doe]', bold: true, size: 40, font: 'Arial', color: ACCENT })]
}),
// Contact line
new Paragraph({
  spacing: { before: 0, after: 0 },
  children: [
    new TextRun({ text: '[City, ST]  |  [555-867-5309]  |  ', size: 18, font: 'Arial', color: GRAY }),
    new ExternalHyperlink({
      link: 'mailto:myemail@mail.com',
      children: [new TextRun({ text: 'myemail@mail.com', size: 18, font: 'Arial', color: ACCENT, underline: { type: UnderlineType.SINGLE } })]
    }),
    new TextRun({ text: '  |  ', size: 18, font: 'Arial', color: GRAY }),
    new ExternalHyperlink({
      link: 'https://www.linkedin.com/in/--template--/',
      children: [new TextRun({ text: 'linkedin.com/in/--template--/', size: 18, font: 'Arial', color: ACCENT, underline: { type: UnderlineType.SINGLE } })]
    })
  ]
}),
rule(),
```

---

## Education Block Pattern

Condense to 2 paragraphs per degree: one for name + school, one for GPA + key details.

```javascript
new Paragraph({
  spacing: { before: 60, after: 20 },
  children: [
    new TextRun({ text: '[Degree], [Field of Study]', bold: true, size: 20, font: 'Arial' }),
    new TextRun({ text: ' \u2014 [University Name] | Graduated [Year]', size: 20, font: 'Arial' })
  ]
}),
new Paragraph({
  spacing: { before: 0, after: 40 },
  children: [new TextRun({ text: '[GPA, honors, minor, or other relevant details]', size: 19, font: 'Arial', color: GRAY })]
}),
```

---

## Cover Letter Helper (`p` and `t`)

Cover letters use simpler helpers. Margins are 1" (1440).

```javascript
function p(children, opts = {}) {
  return new Paragraph({ spacing: { before: 0, after: 200 }, children, ...opts });
}
function t(text, opts = {}) {
  return new TextRun({ text, size: 22, font: 'Arial', ...opts });
}
```

Header name size: 36. Contact line size: 19.

---

## Output

```javascript
const outPath = path.join(__dirname, 'resume.docx'); // or cover_letter.docx
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(outPath, buf);
  console.log('\u2705 Saved: ' + outPath);
}).catch(err => {
  console.error('\u274C Error:', err);
  process.exit(1);
});
```

---

## Validation

After generating, validate:
```bash
python scripts/office/validate.py resume.docx
```

---

## Checklist for New Application Scripts

1. Copy helper functions verbatim from this guide
2. Update content only — do not change helper implementations
3. Use `...sectionHeading(...)` (spread) when inserting into children array
4. `jobHeader` always takes 4 args — pass `''` if location is unused
5. Education: 2 paragraphs per degree, key details on one compact line
6. Save output to `__dirname` so it lands in the application folder
