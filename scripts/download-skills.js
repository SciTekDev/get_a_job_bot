const fs = require('node:fs/promises');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..');
const skillNames = ['docx', 'pdf', 'skill-creator', 'doc-coauthoring'];
const branch = 'main';
const apiTreeUrl = `https://api.github.com/repos/anthropics/skills/git/trees/${branch}?recursive=1`;

async function getJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'get-a-job-bot-skill-downloader'
    }
  });
  if (!response.ok) {
    throw new Error(`GitHub request failed (${response.status}): ${url}`);
  }
  return response.json();
}

async function main() {
  const { tree, truncated } = await getJson(apiTreeUrl);
  if (truncated) {
    throw new Error('GitHub returned a truncated repository tree; no files were downloaded.');
  }

  for (const skillName of skillNames) {
    const sourcePrefix = `skills/${skillName}/`;
    const files = tree.filter(entry =>
      entry.type === 'blob' && entry.mode !== '120000' && entry.path.startsWith(sourcePrefix)
    );
    if (files.length === 0) {
      throw new Error(`No files found for upstream skill: ${skillName}`);
    }

    for (const file of files) {
      const relativePath = file.path.slice(sourcePrefix.length);
      const encodedPath = file.path.split('/').map(encodeURIComponent).join('/');
      const url = `https://raw.githubusercontent.com/anthropics/skills/${branch}/${encodedPath}`;
      const response = await fetch(url, { headers: { 'User-Agent': 'get-a-job-bot-skill-downloader' } });
      if (!response.ok) {
        throw new Error(`Download failed (${response.status}): ${url}`);
      }

      const destination = path.join(repoRoot, '.github', 'skills', skillName, ...relativePath.split('/'));
      await fs.mkdir(path.dirname(destination), { recursive: true });
      await fs.writeFile(destination, Buffer.from(await response.arrayBuffer()));
    }

    console.log(`Downloaded ${skillName} (${files.length} files)`);
  }
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
