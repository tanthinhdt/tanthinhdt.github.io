export const SITE_URL = 'https://tanthinhdt.github.io';

const websiteId = `${SITE_URL}/#website`;
const personId = `${SITE_URL}/#person`;

const pageMetadata = {
  '/': {
    title: 'Duong Tan Thinh — Biomedical AI Researcher',
    description: 'Research portfolio of Duong Tan Thinh, focusing on artificial intelligence for peptides and medical imaging.'
  },
  '/experience/': {
    title: 'Experience — Duong Tan Thinh',
    description: 'Professional experience in AI engineering, data quality, and Vietnamese-language AI systems.'
  },
  '/publications/': {
    title: 'Publications — Duong Tan Thinh',
    description: 'Peer-reviewed research in audio-visual speech recognition, computer vision, and biomedical AI.'
  },
  '/awards/': {
    title: 'Awards — Duong Tan Thinh',
    description: 'Academic honors and awards received by Duong Tan Thinh.'
  },
  '/credentials/': {
    title: 'Credentials — Duong Tan Thinh',
    description: 'Professional certificates and academic credentials of Duong Tan Thinh.'
  }
};

const website = {
  '@type': 'WebSite',
  '@id': websiteId,
  url: `${SITE_URL}/`,
  name: 'Duong Tan Thinh',
  alternateName: 'Tan Thinh',
  inLanguage: ['en', 'vi', 'ko'],
  publisher: { '@id': personId }
};

const person = {
  '@type': 'Person',
  '@id': personId,
  name: 'Duong Tan Thinh',
  alternateName: [
    'Dương Tấn Thịnh',
    'Tan-Thinh Duong',
    'Thinh Duong Tan',
    'Evan',
    '양진성'
  ],
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/portrait-og.jpg`,
  email: 'mailto:tanthinhdt@skku.edu',
  jobTitle: 'Graduate Researcher',
  description: 'Graduate researcher applying bioinformatics and artificial intelligence to peptide research and medical imaging.',
  affiliation: {
    '@type': 'CollegeOrUniversity',
    name: 'Sungkyunkwan University',
    url: 'https://www.skku.edu/'
  },
  memberOf: {
    '@type': 'Organization',
    name: 'Computational Biology and Bioinformatics Laboratory',
    alternateName: 'CBBL',
    url: 'https://balalab-skku.org/',
    parentOrganization: {
      '@type': 'CollegeOrUniversity',
      name: 'Sungkyunkwan University'
    }
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'FPT University',
    url: 'https://daihoc.fpt.edu.vn/'
  },
  sameAs: [
    'https://github.com/tanthinhdt',
    'https://www.linkedin.com/in/tanthinhdt',
    'https://orcid.org/0009-0007-0142-7523',
    'https://balalab-skku.org/currentmembers/'
  ],
  knowsAbout: [
    'Computer vision',
    'Bioinformatics',
    'Peptide informatics',
    'Therapeutic peptides',
    'Medical imaging',
    'Biomedical artificial intelligence'
  ]
};

export function createStructuredData(pathname = '/') {
  const normalizedPath = pathname === '/' ? '/' : `/${pathname.split('/').filter(Boolean).join('/')}/`;
  const metadata = pageMetadata[normalizedPath] || {
    title: 'Page — Duong Tan Thinh',
    description: 'Research portfolio of Duong Tan Thinh.'
  };
  const pageUrl = `${SITE_URL}${normalizedPath}`;
  const page = {
    '@type': normalizedPath === '/' ? 'ProfilePage' : 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: metadata.title,
    description: metadata.description,
    isPartOf: { '@id': websiteId },
    inLanguage: 'en',
    ...(normalizedPath === '/'
      ? { mainEntity: { '@id': personId } }
      : { about: { '@id': personId } })
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [website, person, page]
  };
}
