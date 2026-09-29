#!/usr/bin/env node
// extract_docx.js — Extract text from a .docx file and print to stdout
// Usage: node extract_docx.js <path-to-file.docx>

const mammoth = require('mammoth');
const path = require('path');

const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: node extract_docx.js <path-to-file.docx>');
  process.exit(1);
}

mammoth.extractRawText({ path: path.resolve(filePath) })
  .then(result => {
    if (result.messages.length) {
      result.messages.forEach(m => process.stderr.write(m.message + '\n'));
    }
    process.stdout.write(result.value);
  })
  .catch(err => {
    console.error('Error reading file:', err.message);
    process.exit(1);
  });
