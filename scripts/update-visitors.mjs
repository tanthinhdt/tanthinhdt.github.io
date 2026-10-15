import { readFile, writeFile } from 'node:fs/promises';

const WEBSITE_ID = process.env.UMAMI_WEBSITE_ID || '672b9d84-7f2b-4d64-ba8f-3cc5d026f9dc';
const API_KEY = process.env.UMAMI_API_KEY;
let SHARE_TOKEN = process.env.UMAMI_SHARE_TOKEN;
const SHARE_URL_OR_ID = process.env.UMAMI_SHARE_URL || process.env.UMAMI_SHARE_ID;

// Curated centroid coordinates [longitude, latitude] for countries
const COUNTRY_COORDINATES = {
  VN: [108.2772, 14.0583], // Vietnam
  KR: [127.7669, 35.9078], // South Korea
  US: [-95.7129, 37.0902], // United States
  JP: [138.2529, 36.2048], // Japan
  GB: [-3.4360, 55.3781],  // United Kingdom
  DE: [10.4515, 51.1657],  // Germany
  FR: [2.2137, 46.2276],   // France
  CA: [-106.3468, 56.1304],// Canada
  AU: [133.7751, -25.2744],// Australia
  IN: [78.9629, 20.5937],  // India
  SG: [103.8198, 1.3521],  // Singapore
  TW: [120.9605, 23.6978], // Taiwan
  CN: [104.1954, 35.8617], // China
  TH: [100.9925, 15.8700], // Thailand
  MY: [101.9758, 4.2105],  // Malaysia
  ID: [113.9213, -0.7893], // Indonesia
  PH: [121.7740, 12.8797], // Philippines
  BR: [-51.9253, -14.2350],// Brazil
  MX: [-102.5528, 23.6345],// Mexico
  ES: [-3.7492, 40.4637],  // Spain
  IT: [12.5674, 41.8719],  // Italy
  NL: [5.2913, 52.1326],   // Netherlands
  SE: [18.6435, 60.1282],  // Sweden
  CH: [8.2275, 46.8182],   // Switzerland
  PL: [19.1451, 51.9194],  // Poland
  RU: [105.3188, 61.5240], // Russia
  NZ: [174.8860, -40.9006],// New Zealand
  IE: [-8.2439, 53.4129],  // Ireland
  BE: [4.4699, 50.5039],   // Belgium
  AT: [14.5501, 47.5162],  // Austria
  DK: [9.5018, 56.2639],   // Denmark
  NO: [8.4689, 60.4720],   // Norway
  FI: [25.7482, 61.9241],  // Finland
  PT: [-8.2245, 39.3999],  // Portugal
  GR: [21.8243, 39.0742],  // Greece
  TR: [35.2433, 38.9637],  // Turkey
  IL: [34.8516, 31.0461],  // Israel
  ZA: [22.9375, -30.5595], // South Africa
  AE: [53.8478, 23.4241],  // United Arab Emirates
  SA: [45.0792, 23.8859],  // Saudi Arabia
  HK: [114.1694, 22.3193], // Hong Kong
  CZ: [15.4730, 49.8175],  // Czechia
  UA: [31.1656, 48.3794],  // Ukraine
  AR: [-63.6167, -38.4161],// Argentina
  CL: [-71.5430, -35.6751],// Chile
  CO: [-74.2973, 4.5709]   // Colombia
};

function getFlagEmoji(code) {
  if (!code || code.length !== 2) return '🌐';
  const codePoints = code
    .toUpperCase()
    .split('')
    .map((c) => 127397 + c.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

async function resolveShareToken(shareUrlOrId) {
  if (!shareUrlOrId) return null;
  const match = shareUrlOrId.match(/share\/([a-zA-Z0-9_-]+)/);
  const shareId = match ? match[1] : shareUrlOrId.trim();

  try {
    const res = await fetch(`https://cloud.umami.is/api/share/${shareId}`, {
      headers: { Accept: 'application/json' }
    });
    if (res.ok) {
      const data = await res.json();
      return data.token || data.shareToken || data.id;
    }
  } catch (err) {
    console.warn(`[Umami Visitor Updater] Notice: Could not resolve share ID: ${err.message}`);
  }
  return null;
}

async function run() {
  const dataPath = new URL('../src/data/portfolioData.js', import.meta.url);
  const source = await readFile(dataPath, 'utf8');

  // Attempt to resolve public share token if provided
  if (!SHARE_TOKEN && SHARE_URL_OR_ID) {
    console.log(`Resolving free public Umami Share ID/URL: ${SHARE_URL_OR_ID}...`);
    SHARE_TOKEN = await resolveShareToken(SHARE_URL_OR_ID);
    if (SHARE_TOKEN) {
      console.log('Successfully acquired public share token!');
    }
  }

  if (!API_KEY && !SHARE_TOKEN && !SHARE_URL_OR_ID) {
    console.log('\n============================================================');
    console.log('[Umami Visitor Updater] ℹ️  No Umami credentials configured.');
    console.log('FREE OPTION (Umami Free Plan):');
    console.log('  1. In Umami Cloud (https://cloud.umami.is), edit your website.');
    console.log('  2. Enable "Share URL" under the Share tab.');
    console.log('  3. Copy your public share link (e.g. https://cloud.umami.is/share/abc123xyz/...)');
    console.log('  4. Add it to GitHub repository secrets:');
    console.log('     Name: UMAMI_SHARE_URL (or UMAMI_SHARE_ID)');
    console.log('     Value: <your-share-url-or-id>');
    console.log('Keeping existing visitor data intact in portfolioData.js.');
    console.log('============================================================\n');
    process.exit(0);
  }

  const headers = {
    Accept: 'application/json',
    'User-Agent': 'my-page visitor updater (https://github.com/tanthinhdt/my-page)'
  };
  
  let endpoint = `https://api.umami.is/v1/websites/${WEBSITE_ID}/metrics?type=country&startAt=0&endAt=${Date.now()}`;

  if (API_KEY) {
    headers['x-umami-api-key'] = API_KEY;
  } else if (SHARE_TOKEN) {
    endpoint = `https://cloud.umami.is/api/websites/${WEBSITE_ID}/metrics?type=country&startAt=0&endAt=${Date.now()}`;
    headers['x-umami-share-token'] = SHARE_TOKEN;
  }

  console.log(`Fetching visitor analytics from Umami (${WEBSITE_ID})...`);

  const response = await fetch(endpoint, { headers });
  if (!response.ok) {
    const errorText = await response.text();
    console.warn(`[Umami Visitor Updater] Request returned ${response.status}: ${errorText}`);
    console.warn('Skipping update to preserve existing metrics.');
    process.exit(0);
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    console.warn(`[Umami Visitor Updater] Unexpected response format. Keeping existing data.`);
    process.exit(0);
  }

  if (data.length === 0) {
    console.log('Umami returned 0 visitor records. Keeping existing data.');
    return;
  }

  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

  // Map and sort country records
  const mapped = [];
  for (const item of data) {
    const code = (item.x || '').toUpperCase().trim();
    const visitors = Number(item.y || 0);
    if (!code || visitors <= 0) continue;

    let countryName = code;
    try {
      countryName = regionNames.of(code) || code;
    } catch {
      countryName = code;
    }

    const flag = getFlagEmoji(code);
    const coordinates = COUNTRY_COORDINATES[code] || null;

    mapped.push({
      country: countryName,
      code,
      flag,
      visitors,
      coordinates
    });
  }

  mapped.sort((a, b) => b.visitors - a.visitors);

  // Take top 5 countries, aggregate remaining into "Other countries"
  const TOP_COUNT = 5;
  const topCountries = mapped.slice(0, TOP_COUNT);
  const remaining = mapped.slice(TOP_COUNT);
  const otherVisitors = remaining.reduce((sum, item) => sum + item.visitors, 0);

  const finalResults = [...topCountries];
  if (otherVisitors > 0) {
    finalResults.push({
      country: 'Other countries',
      flag: '🌎',
      visitors: otherVisitors
    });
  }

  console.log('Updated visitor analytics:');
  finalResults.forEach(r => console.log(`  - ${r.flag} ${r.country}: ${r.visitors} visitors`));

  // Format code content
  const formattedArray = JSON.stringify(finalResults, null, 2)
    .replace(/"([^"]+)":/g, '$1:');

  const visitorPattern = /\/\/ (?:Updated automatically by Umami analytics workflow|Replace these values with the country totals from the site's analytics provider\.)[\s\S]*?export const visitorCountriesData = \[[^\]]*\];/;

  const newVisitorBlock = `// Updated automatically by Umami analytics workflow\nexport const visitorCountriesData = ${formattedArray};`;

  if (!visitorPattern.test(source)) {
    throw new Error('Could not locate visitorCountriesData block in portfolioData.js');
  }

  const updatedSource = source.replace(visitorPattern, newVisitorBlock);
  await writeFile(dataPath, updatedSource, 'utf8');
  console.log('Successfully updated portfolioData.js with latest Umami metrics!');
}

run().catch((err) => {
  console.error('[Umami Visitor Updater] Error:', err.message);
  process.exit(0);
});
