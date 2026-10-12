export const profileData = {
  name: "Duong Tan Thinh",
  nativeName: "Dương Tấn Thịnh",
  englishName: "Evan",
  koreanName: "양진성",
  origin: "Vietnam 🇻🇳",
  title: "Developer & Researcher",
  bio: "Passionate software developer and researcher exploring the frontiers of artificial intelligence, intelligent systems, and scalable modern web applications.",
  email: "tanthinh.dt@gmail.com",
  github: "https://github.com/tanthinhdt",
  linkedin: "https://linkedin.com",
};

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
    citationCount: 16,
    citationSource: "Crossref",
    citationChecked: "October 2026",
    isHighlight: true,
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

// Replace these values with the country totals from the site's analytics provider.
export const visitorCountriesData = [
  { country: "Vietnam", flag: "🇻🇳", visitors: 68 },
  { country: "South Korea", flag: "🇰🇷", visitors: 14 },
  { country: "United States", flag: "🇺🇸", visitors: 9 },
  { country: "Japan", flag: "🇯🇵", visitors: 6 },
  { country: "Other countries", flag: "🌎", visitors: 3 }
];

export const experienceData = [
  {
    id: "exp-1",
    role: "Software & AI Engineer",
    organization: "Research & Development",
    period: "2023 - Present",
    description: "Developing intelligent applications and machine learning workflows. Focused on high-efficiency model training, deployment, and intuitive modern interfaces.",
    highlights: [
      "Engineered machine learning pipelines for model evaluation and inference acceleration",
      "Designed full-stack web interfaces integrated with real-time AI endpoints",
      "Collaborated on multimodal research involving computer vision and speech"
    ]
  },
  {
    id: "exp-2",
    role: "Research Assistant",
    organization: "Computing & AI Laboratory",
    period: "2021 - 2023",
    description: "Conducted investigations into computer vision, machine learning models, and system performance optimizations.",
    highlights: [
      "Assisted in experimental benchmarks comparing Transformers and convolutional architectures",
      "Processed and augmented multimedia datasets for speech and vision tasks",
      "Co-authored scientific publications in peer-reviewed conferences and journals"
    ]
  }
];

export const educationData = [
  {
    id: "edu-1",
    degree: "Computer Science & Engineering",
    institution: "Higher Education",
    period: "2020 - Present",
    details: "Specializing in Artificial Intelligence, Software Engineering, and High-Performance Computing."
  }
];

export const awardsData = [
  {
    id: "award-1",
    title: "Academic Excellence Award",
    organization: "Honors & Distinctions",
    year: "Honors",
    description: "Recognized for distinguished academic achievements in Computer Science and Engineering."
  },
  {
    id: "award-2",
    title: "Tech Hackathon Award",
    organization: "Competitive Engineering",
    year: "Competition",
    description: "Developed innovative AI-driven software solutions in competitive programming and hackathon challenges."
  }
];
