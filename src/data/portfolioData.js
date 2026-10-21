const publicAsset = (path) => `${import.meta.env.BASE_URL}${path}`;

export const profileData = {
  name: "Duong Tan Thinh",
  nativeName: "Dương Tấn Thịnh",
  englishName: "Evan",
  koreanName: "양진성",
  origin: "Vietnam 🇻🇳",
  title: "Biomedical AI Researcher",
  bio: "Graduate researcher applying bioinformatics and artificial intelligence to peptide research and medical imaging.",
  personalEmail: "thinhduon9@gmail.com",
  affiliationEmail: "tanthinhdt@skku.edu",
  github: "https://github.com/tanthinhdt",
  linkedin: "https://www.linkedin.com/in/tanthinhdt",
  orcid: "https://orcid.org/0009-0007-0142-7523",
};

export const labData = {
  name: "Computational Biology and Bioinformatics Laboratory",
  shortName: "CBBL",
  url: "https://balalab-skku.org/",
  membersUrl: "https://balalab-skku.org/currentmembers/"
};

export const updatesData = [
  {
    id: "update-cbbl-2025",
    date: "Sep 2025",
    dateTime: "2025-09",
    title: "Joined CBBL at Sungkyunkwan University",
    description: "Began the combined Master's and PhD program, focusing on peptide research and medical imaging through bioinformatics and AI.",
    url: labData.membersUrl,
    external: true
  },
  {
    id: "update-mapr-2025",
    date: "2025",
    dateTime: "2025",
    title: "Published Vietnamese audio-visual speech recognition research",
    description: "Presented peer-reviewed work at MAPR on combining acoustic signals with visual lip dynamics for Vietnamese speech recognition.",
    url: "/publications/#mapr-2025",
    external: false
  },
  {
    id: "update-valedictorian-2024",
    date: "Nov 2024",
    dateTime: "2024-11",
    title: "Named FPT University valedictorian",
    description: "Recognized as Valedictorian of the Engineering and Technology Batch 3 for academic excellence and leadership.",
    url: "/awards/#award-fptu-valedictorian-engineering-technology-2024",
    external: false
  }
];

export const publicationsData = [
  {
    id: "mapr-2025",
    title: "Vietnamese Automatic Speech Recognition Utilizing Audio and Visual Data",
    authors: [
      { name: "Tan-Thinh Duong", highlight: true },
      { name: "Van-Minh Nguyen", highlight: false },
      { name: "Hong-Duyen-Khanh Pham", highlight: false },
      { name: "Thanh-Hai Le", highlight: false }
    ],
    venue: "2025 International Conference on Multimedia Analysis and Pattern Recognition (MAPR)",
    year: "2025",
    type: "IEEE Conference",
    category: "conference",
    doi: "10.1109/MAPR67746.2025.11133884",
    link: "https://ieeexplore.ieee.org/abstract/document/11133884/",
    posterUrl: publicAsset("publications/mapr-2025/vietnamese-audio-visual-speech-recognition-poster.pdf"),
    sourceCodeUrl: "https://github.com/tanthinhdt/vasr",
    citationCount: 0,
    citationSource: "Crossref",
    citationChecked: "October 2026",
    isHighlight: true,
    abstract: "Investigates audio-visual speech recognition (AVSR) techniques specifically optimized for the Vietnamese language, addressing low-resource challenges and improving speech recognition accuracy by fusing visual lip dynamics with acoustic signals.",
    keywords: ["Speech Recognition", "Audio-Visual Fusion", "Deep Learning", "Vietnamese Language", "MAPR"],
    bibtex: `@inproceedings{duong2025vietnamese,
  title={Vietnamese Automatic Speech Recognition Utilizing Audio and Visual Data},
  author={Duong, Tan-Thinh and Nguyen, Van-Minh and Pham, Hong-Duyen-Khanh and Le, Thanh-Hai},
  booktitle={2025 International Conference on Multimedia Analysis and Pattern Recognition (MAPR)},
  year={2025},
  doi={10.1109/MAPR67746.2025.11133884}
}`
  },
  {
    id: "procs-2024",
    title: "Medicinal plant recognition based on Vision Transformer and BEiT",
    authors: [
      { name: "Duy Tran Nguyen Nhut", highlight: false },
      { name: "Thinh Duong Tan", highlight: true },
      { name: "Trung Nguyen Quoc", highlight: false },
      { name: "Vinh Truong Hoang", highlight: false }
    ],
    venue: "Procedia Computer Science, Vol. 234, pp. 188–195 (Elsevier)",
    year: "2024",
    type: "Elsevier Journal",
    category: "journal",
    doi: "10.1016/j.procs.2024.02.165",
    link: "https://www.sciencedirect.com/science/article/pii/S187705092400351X",
    journalQuartile: "Q2",
    journalRankSource: "SCImago Journal Rank",
    journalRankYear: "2024",
    journalRankChecked: "October 2026",
    citationCount: 16,
    citationSource: "Crossref",
    citationChecked: "October 2026",
    isHighlight: true,
    certificateUrl: publicAsset("certificates/2023-isico-conference-certificate.pdf"),
    abstract: "Applies self-supervised Vision Transformers (ViT) and Bidirectional Encoder representation from Image Transformers (BEiT) to high-precision medicinal plant classification, significantly improving recognition accuracy over conventional CNN architectures.",
    keywords: ["Vision Transformer (ViT)", "BEiT", "Plant Recognition", "Computer Vision", "Medicinal Species"],
    bibtex: `@article{nhut2024medicinal,
  title={Medicinal plant recognition based on Vision Transformer and BEiT},
  author={Nhut, Duy Tran Nguyen and Tan, Thinh Duong and Quoc, Trung Nguyen and Hoang, Vinh Truong},
  journal={Procedia Computer Science},
  volume={234},
  pages={188--195},
  year={2024},
  publisher={Elsevier},
  doi={10.1016/j.procs.2024.02.165}
}`
  }
];

// Updated automatically by Umami analytics workflow
export const visitorCountriesData = [
  { country: "Vietnam", code: "VN", flag: "🇻🇳", visitors: 68, coordinates: [108.2772, 14.0583] },
  { country: "South Korea", code: "KR", flag: "🇰🇷", visitors: 14, coordinates: [127.7669, 35.9078] },
  { country: "United States", code: "US", flag: "🇺🇸", visitors: 9, coordinates: [-95.7129, 37.0902] },
  { country: "Japan", code: "JP", flag: "🇯🇵", visitors: 6, coordinates: [138.2529, 36.2048] },
  { country: "Other countries", flag: "🌎", visitors: 3 }
];

export const experienceData = [
  {
    id: "exp-outlier-data-annotator",
    role: "Data Annotator",
    organization: "Outlier",
    employmentType: "Freelance",
    location: "Remote",
    period: "Dec 2024 - Apr 2025 · 5 mos",
    description: "Developed Vietnamese math-focused prompts to train an LLM’s logical reasoning skills.",
    highlights: [
      "Created Vietnamese math-focused prompts for logical reasoning training",
      "Refined prompt quality and consistency for LLM development"
    ]
  },
  {
    id: "exp-highbrow-qa-lead",
    role: "QA Lead",
    organization: "Highbrow Technology Inc",
    employmentType: "Contract",
    location: "Remote",
    period: "Dec 2024 - May 2025 · 6 mos",
    description: "Supervised a team of annotators, implementing QA processes to ensure data quality and consistency.",
    highlights: [
      "Led and supported a team of data annotators",
      "Implemented quality assurance processes for consistent, high-quality datasets",
      "Monitored annotation quality and provided actionable feedback"
    ]
  },
  {
    id: "exp-highbrow-data-annotator",
    role: "Data Annotator",
    organization: "Highbrow Technology Inc",
    employmentType: "Contract",
    location: "Remote",
    period: "Nov 2024 · 1 mo",
    description: "Developed and refined Vietnamese datasets to improve LLM response accuracy and fluency.",
    highlights: [
      "Annotated and refined Vietnamese-language datasets",
      "Designed and reviewed prompts to improve LLM response quality",
      "Applied consistent annotation guidelines across data quality workflows"
    ]
  },
  {
    id: "exp-gradients-ai-engineer",
    credentialId: "credential-fptu-ai-engineer",
    role: "AI Engineer",
    organization: "Gradients Technologies Joint Stock Company",
    employmentType: "Apprenticeship",
    location: "Ho Chi Minh City, Vietnam · Hybrid",
    period: "May 2023 - Sep 2023 · 5 mos",
    description: "Contributed to Vietnamese language data refinement and retrieval workflows for AI applications.",
    highlights: [
      "Refined the Vietnamese part of the mC4 dataset",
      "Helped implement a text retrieval system for Vietnamese"
    ]
  }
];

export const credentialsData = [
  {
    id: "credential-isico-2023",
    title: "ISICO 2023 Conference Certificate",
    issuer: "ISICO",
    year: "2023",
    description: "Conference certificate related to the paper “Medicinal plant recognition based on Vision Transformer and BEiT.”",
    fileUrl: publicAsset("certificates/2023-isico-conference-certificate.pdf")
  },
  {
    id: "credential-ielts-2024",
    title: "International English Language Testing System (IELTS)",
    issuer: "IELTS",
    year: "Dec 2024",
    description: "Overall band score: 7.5.",
    scores: [
      { skill: "Listening", score: "9.0" },
      { skill: "Reading", score: "9.0" },
      { skill: "Writing", score: "6.5" },
      { skill: "Speaking", score: "5.5" }
    ]
  },
  {
    id: "credential-fptu-ai-engineer",
    title: "AI Engineer Apprenticeship Certificate",
    issuer: "FPT University",
    year: "2023",
    description: "Certificate issued by FPT University for completing the AI Engineer apprenticeship at Gradients Technologies Joint Stock Company.",
    fileUrl: publicAsset("certificates/fpt-university-ai-engineer-apprenticeship-2023.pdf"),
    experienceId: "exp-gradients-ai-engineer"
  }
];

export const educationData = [
  {
    id: "edu-2",
    degree: "Combined Master's and PhD",
    institution: "Sungkyunkwan University",
    period: "Sep 2025 - Present",
    grade: "In progress",
    logo: publicAsset("skku-logo.png"),
    details: "Major: Integrative Biotechnology.",
    lab: labData.shortName,
    labUrl: labData.url
  },
  {
    id: "edu-1",
    degree: "Bachelor's degree",
    institution: "FPT University",
    period: "Sep 2020 - Sep 2024",
    grade: "Excellent",
    logo: publicAsset("fpt-university-logo.jpg"),
    details: "Major: Artificial Intelligence."
  }
];

export const awardsData = [
  {
    id: "award-fptu-valedictorian-engineering-technology-2024",
    title: "Valedictorian of the Engineering and Technology Batch 3",
    organization: "FPT University",
    year: "Nov 2024",
    description: "Honored as Valedictorian of the Engineering and Technology Batch 3, recognizing exceptional academic excellence and leadership.",
    imageUrl: publicAsset("awards/valedictorian-engineering-technology-batch-3-2024.jpg"),
    sourceUrl: "https://www.facebook.com/srofptuhcmc/posts/542707318585556/"
  }
];
