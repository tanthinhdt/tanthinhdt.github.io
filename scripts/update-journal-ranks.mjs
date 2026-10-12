import { readFile, writeFile } from 'node:fs/promises';

const dataPath = new URL('../src/data/portfolioData.js', import.meta.url);
const source = await readFile(dataPath, 'utf8');
const journal = {
  title: 'Procedia Computer Science',
  issn: '1877-0509',
  provider: 'SCImago Journal Rank',
  exportUrl: 'https://www.scimagojr.com/journalrank.php?out=csv'
};

const response = await fetch(journal.exportUrl, {
  headers: {
    Accept: 'text/csv,text/plain',
    'User-Agent': 'my-page journal rank updater (https://github.com/tanthinhdt/my-page)'
  }
});

if (!response.ok) {
  throw new Error(`SCImago request failed: ${response.status} ${response.statusText}`);
}

const csv = await response.text();
const rows = csv.split(/\r?\n/).filter(Boolean);
const header = rows.shift()?.split(';').map((value) => value.trim().toLowerCase());
const titleIndex = header?.indexOf('title');
const issnIndex = header?.indexOf('issn');
const quartileIndex = header?.indexOf('sjr quartile');
const yearIndex = header?.indexOf('year');

if ([titleIndex, issnIndex, quartileIndex].some((index) => index < 0)) {
  throw new Error('SCImago export format changed: title, ISSN, or SJR Quartile column is missing');
}

const journalRow = rows
  .map((row) => row.split(';').map((value) => value.replace(/^"|"$/g, '').trim()))
  .find((columns) => (
    columns[issnIndex]?.includes(journal.issn) ||
    columns[titleIndex]?.toLowerCase() === journal.title.toLowerCase()
  ));

if (!journalRow || !/^Q[1-4]$/.test(journalRow[quartileIndex])) {
  throw new Error(`No valid SCImago quartile was found for ${journal.title}`);
}

const quartile = journalRow[quartileIndex];
const year = yearIndex >= 0 && journalRow[yearIndex] ? journalRow[yearIndex] : new Date().getUTCFullYear();
const escapedTitle = journal.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const publicationPattern = new RegExp(
  `(title:\\s*"${escapedTitle}"[\\s\\S]*?journalQuartile:\\s*")[^"]+("[\\s\\S]*?journalRankYear:\\s*")[^"]+("[\\s\\S]*?journalRankChecked:\\s*")[^"]+(")`
);

if (!publicationPattern.test(source)) {
  throw new Error(`Could not locate journal rank fields for ${journal.title}`);
}

const checkedDate = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC'
}).format(new Date());

const updatedSource = source.replace(
  publicationPattern,
  `$1${quartile}$2${year}$3${checkedDate}$4`
);

await writeFile(dataPath, updatedSource);
console.log(`${journal.title}: ${quartile} (${year})`);
