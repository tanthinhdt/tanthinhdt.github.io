import { readFile, writeFile } from 'node:fs/promises';

const dataPath = new URL('../src/data/portfolioData.js', import.meta.url);
const source = await readFile(dataPath, 'utf8');
const dois = [...source.matchAll(/doi:\s*"([^"]+)"/g)].map((match) => match[1]);

if (dois.length === 0) {
  throw new Error('No publication DOIs were found in portfolioData.js');
}

const checkedDate = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC'
}).format(new Date());

let updatedSource = source;

for (const doi of dois) {
  const response = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'my-page citation updater (https://github.com/tanthinhdt/my-page; mailto:tanthinh.dt@gmail.com)'
    }
  });

  if (!response.ok) {
    throw new Error(`Crossref request failed for ${doi}: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();
  const citationCount = payload.message?.['is-referenced-by-count'];

  if (!Number.isInteger(citationCount) || citationCount < 0) {
    throw new Error(`Crossref returned an invalid citation count for ${doi}`);
  }

  const escapedDoi = doi.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const publicationPattern = new RegExp(
    `(doi:\\s*"${escapedDoi}"[\\s\\S]*?citationCount:\\s*)\\d+(\\s*,\\s*citationSource:\\s*"Crossref",\\s*citationChecked:\\s*")[^"]+(")`
  );

  if (!publicationPattern.test(updatedSource)) {
    throw new Error(`Could not locate citation fields for ${doi}`);
  }

  updatedSource = updatedSource.replace(
    publicationPattern,
    `$1${citationCount}$2${checkedDate}$3`
  );

  console.log(`${doi}: ${citationCount} citations`);
}

await writeFile(dataPath, updatedSource);
