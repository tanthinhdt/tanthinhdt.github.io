import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const languages = {
  en: { label: 'English', shortLabel: 'EN', nativeLabel: 'English' },
  vi: { label: 'Tiếng Việt', shortLabel: 'VI', nativeLabel: 'Tiếng Việt' },
  ko: { label: '한국어', shortLabel: 'KO', nativeLabel: '한국어' }
};

const translations = {
  en: {
    nav: { home: 'Home', experience: 'Experience', publications: 'Publications', awards: 'Awards', credentials: 'Credentials' },
    language: { label: 'Language', switchTo: 'Switch language' },
    home: {
      greeting: "Hi, I'm", englishName: 'English Name:', koreanName: 'Korean Name:', from: 'From:',
      profileTitle: 'Developer & Researcher',
      profileBio: 'Passionate software developer and researcher exploring the frontiers of artificial intelligence, intelligent systems, and scalable modern web applications.',
      researchInterests: 'Research Interests', personalEmail: 'Personal Email', affiliationEmail: 'Affiliation Email',
      education: 'Education', highlightedPublications: 'Highlighted Publications', viewAllPublications: 'View All Publications',
      featured: 'Featured', citation: 'citation', citations: 'citations', viewPaper: 'View Paper',
      experience: 'Experience', awards: 'Awards', details: 'Details', visitorMap: 'Visitors by Country',
      grade: 'Grade:', interest1: 'Anticancer Peptides', interest2: 'Audio-Visual Speech Recognition (AVSR)', interest3: 'Multimodal Deep Learning', interest4: 'Medical Imaging', visitors: 'Visitors around the world', visitorsLabel: 'World map showing visitor countries', countryList: 'Visitor countries ranked by visitors', conference: 'Conference', journal: 'Journal'
    },
    experience: {
      tag: 'Career & Experience', title: 'Professional', titleAccent: 'Experience',
      description: 'My journey in AI engineering, data annotation, and quality assurance.',
      contributions: 'Key Contributions & Responsibilities:', credential: 'View Related Credential'
    },
    publications: {
      tag: 'Research & Scholarship', title: 'Publications &', titleAccent: 'Research',
      description: 'Peer-reviewed articles, international conference proceedings, and academic contributions in Artificial Intelligence, Computer Vision, and Speech Processing.',
      all: 'All Publications', conferences: 'Conferences (IEEE)', journals: 'Journals (Elsevier)',
      search: 'Search by title, author, topic...', empty: 'No publications match your search criteria.',
      citation: 'citation', citations: 'citations', journal: 'journal', conference: 'conference', checked: 'checked',
      read: 'Read Paper', certificate: 'View Conference Certificate', copy: 'Copy BibTeX',
      copied: 'BibTeX Copied!', hide: 'Hide BibTeX', show: 'Show BibTeX'
    },
    awards: {
      tag: 'Honors & Competitions', title: 'Awards &', titleAccent: 'Honors',
      description: 'Recognition of academic excellence, competitive coding challenges, and hackathons.',
      source: 'View FPT University Post'
    },
    credentials: {
      tag: 'Credentials', title: 'Professional', titleAccent: 'Credentials',
      description: 'Certificates and credentials that document my professional training and experience.',
      certificate: 'View Certificate', download: 'Download PDF', experience: 'View Related Experience'
    },
    footer: { rights: 'All rights reserved.' },
    labels: { Freelance: 'Freelance', Contract: 'Contract', Apprenticeship: 'Apprenticeship', Remote: 'Remote' }
  },
  vi: {
    countries: { Vietnam: 'Việt Nam', 'South Korea': 'Hàn Quốc', 'United States': 'Hoa Kỳ', Japan: 'Nhật Bản', 'Other countries': 'Các quốc gia khác' },
    nav: { home: 'Trang chủ', experience: 'Kinh nghiệm', publications: 'Công bố', awards: 'Giải thưởng', credentials: 'Chứng chỉ' },
    language: { label: 'Ngôn ngữ', switchTo: 'Chuyển ngôn ngữ' },
    home: {
      greeting: 'Xin chào, tôi là', englishName: 'Tên tiếng Anh:', koreanName: 'Tên tiếng Hàn:', from: 'Đến từ:',
      profileTitle: 'Nhà phát triển & Nhà nghiên cứu',
      profileBio: 'Lập trình viên và nhà nghiên cứu đam mê khám phá những giới hạn mới của trí tuệ nhân tạo, hệ thống thông minh và các ứng dụng web hiện đại có khả năng mở rộng.',
      researchInterests: 'Lĩnh vực nghiên cứu', personalEmail: 'Email cá nhân', affiliationEmail: 'Email trường',
      education: 'Học vấn', highlightedPublications: 'Công bố nổi bật', viewAllPublications: 'Xem tất cả công bố',
      featured: 'Nổi bật', citation: 'trích dẫn', citations: 'trích dẫn', viewPaper: 'Xem bài viết',
      experience: 'Kinh nghiệm', awards: 'Giải thưởng', details: 'Chi tiết', visitorMap: 'Khách truy cập theo quốc gia',
      grade: 'Xếp loại:', interest1: 'Anticancer Peptides', interest2: 'Audio-Visual Speech Recognition (AVSR)', interest3: 'Multimodal Deep Learning', interest4: 'Medical Imaging', visitors: 'Khách truy cập trên toàn thế giới', visitorsLabel: 'Bản đồ thế giới thể hiện các quốc gia của khách truy cập', countryList: 'Các quốc gia được xếp hạng theo số khách', conference: 'Hội nghị', journal: 'Tạp chí'
    },
    experience: {
      tag: 'Sự nghiệp & Kinh nghiệm', title: 'Kinh nghiệm', titleAccent: 'chuyên môn',
      description: 'Hành trình của tôi trong kỹ thuật AI, gán nhãn dữ liệu và đảm bảo chất lượng.',
      contributions: 'Đóng góp & trách nhiệm chính:', credential: 'Xem chứng chỉ liên quan'
    },
    publications: {
      tag: 'Nghiên cứu & Học thuật', title: 'Công bố &', titleAccent: 'Nghiên cứu',
      description: 'Các bài báo phản biện, kỷ yếu hội nghị quốc tế và đóng góp học thuật trong Trí tuệ nhân tạo, Thị giác máy tính và Xử lý tiếng nói.',
      all: 'Tất cả công bố', conferences: 'Hội nghị (IEEE)', journals: 'Tạp chí (Elsevier)',
      search: 'Tìm theo tiêu đề, tác giả, chủ đề...', empty: 'Không có công bố phù hợp với tìm kiếm.',
      citation: 'trích dẫn', citations: 'trích dẫn', journal: 'tạp chí', conference: 'hội nghị', checked: 'kiểm tra',
      read: 'Đọc bài viết', certificate: 'Xem chứng nhận hội nghị', copy: 'Sao chép BibTeX',
      copied: 'Đã sao chép BibTeX!', hide: 'Ẩn BibTeX', show: 'Hiện BibTeX'
    },
    awards: {
      tag: 'Danh dự & Cuộc thi', title: 'Giải thưởng &', titleAccent: 'Danh dự',
      description: 'Ghi nhận thành tích học tập, các cuộc thi lập trình và hackathon.',
      source: 'Xem bài đăng của Đại học FPT'
    },
    credentials: {
      tag: 'Chứng chỉ', title: 'Chứng chỉ', titleAccent: 'chuyên môn',
      description: 'Các chứng chỉ ghi nhận quá trình đào tạo và kinh nghiệm chuyên môn của tôi.',
      certificate: 'Xem chứng chỉ', download: 'Tải PDF', experience: 'Xem kinh nghiệm liên quan'
    },
    footer: { rights: 'Bảo lưu mọi quyền.' },
    labels: { Freelance: 'Tự do', Contract: 'Hợp đồng', Apprenticeship: 'Học việc', Remote: 'Từ xa' }
  },
  ko: {
    countries: { Vietnam: '베트남', 'South Korea': '대한민국', 'United States': '미국', Japan: '일본', 'Other countries': '기타 국가' },
    nav: { home: '홈', experience: '경력', publications: '논문', awards: '수상', credentials: '자격증' },
    language: { label: '언어', switchTo: '언어 변경' },
    home: {
      greeting: '안녕하세요, 저는', englishName: '영어 이름:', koreanName: '한국 이름:', from: '출신:',
      profileTitle: '개발자 및 연구자',
      profileBio: '인공지능, 지능형 시스템 및 확장 가능한 현대 웹 애플리케이션의 가능성을 탐구하는 소프트웨어 개발자이자 연구자입니다.',
      researchInterests: '연구 분야', personalEmail: '개인 이메일', affiliationEmail: '학교 이메일',
      education: '학력', highlightedPublications: '주요 논문', viewAllPublications: '모든 논문 보기',
      featured: '추천', citation: '회 인용', citations: '회 인용', viewPaper: '논문 보기',
      experience: '경력', awards: '수상', details: '자세히', visitorMap: '국가별 방문자',
      grade: '성적:', interest1: 'Anticancer Peptides', interest2: 'Audio-Visual Speech Recognition (AVSR)', interest3: 'Multimodal Deep Learning', interest4: 'Medical Imaging', visitors: '전 세계 방문자', visitorsLabel: '방문 국가를 보여주는 세계 지도', countryList: '방문자 수 기준 국가 순위', conference: '학술대회', journal: '저널'
    },
    experience: {
      tag: '경력 및 경험', title: '전문', titleAccent: '경력',
      description: 'AI 엔지니어링, 데이터 주석 및 품질 보증 분야에서의 여정입니다.',
      contributions: '주요 기여 및 업무:', credential: '관련 자격증 보기'
    },
    publications: {
      tag: '연구 및 학술 활동', title: '논문 및', titleAccent: '연구',
      description: '인공지능, 컴퓨터 비전 및 음성 처리 분야의 심사를 거친 논문과 국제 학술대회 발표 자료입니다.',
      all: '전체 논문', conferences: '학술대회 (IEEE)', journals: '저널 (Elsevier)',
      search: '제목, 저자, 주제로 검색...', empty: '검색 조건에 맞는 논문이 없습니다.',
      citation: '회 인용', citations: '회 인용', journal: '저널', conference: '학술대회', checked: '확인',
      read: '논문 읽기', certificate: '학술대회 인증서 보기', copy: 'BibTeX 복사',
      copied: 'BibTeX가 복사되었습니다!', hide: 'BibTeX 숨기기', show: 'BibTeX 보기'
    },
    awards: {
      tag: '수상 및 대회', title: '수상 및', titleAccent: '영예',
      description: '학업 성취, 프로그래밍 대회 및 해커톤 수상 기록입니다.',
      source: 'FPT 대학교 게시물 보기'
    },
    credentials: {
      tag: '자격증', title: '전문', titleAccent: '자격증',
      description: '전문 교육 및 경험을 증명하는 자격증과 인증서입니다.',
      certificate: '인증서 보기', download: 'PDF 다운로드', experience: '관련 경력 보기'
    },
    footer: { rights: '모든 권리 보유.' },
    labels: { Freelance: '프리랜서', Contract: '계약직', Apprenticeship: '견습', Remote: '원격' }
  }
};

const contentTranslations = {
  vi: {
    'exp-outlier-data-annotator': {
      role: 'Chuyên viên gán nhãn dữ liệu', description: 'Phát triển các câu hỏi toán học bằng tiếng Việt để huấn luyện khả năng suy luận logic của LLM.',
      highlights: ['Tạo câu hỏi toán học tiếng Việt cho việc huấn luyện suy luận logic', 'Cải thiện chất lượng và tính nhất quán của câu hỏi cho quá trình phát triển LLM']
    },
    'exp-highbrow-qa-lead': {
      role: 'Trưởng nhóm QA', description: 'Giám sát nhóm chuyên viên gán nhãn và triển khai quy trình QA để duy trì tính nhất quán của dữ liệu.',
      highlights: ['Dẫn dắt và hỗ trợ nhóm chuyên viên gán nhãn dữ liệu', 'Triển khai quy trình đảm bảo chất lượng cho bộ dữ liệu nhất quán, chất lượng cao', 'Theo dõi chất lượng gán nhãn và đưa ra phản hồi thiết thực']
    },
    'exp-highbrow-data-annotator': {
      role: 'Chuyên viên gán nhãn dữ liệu', description: 'Phát triển và tinh chỉnh các Vietnamese-language datasets để cải thiện độ chính xác và độ tự nhiên của phản hồi LLM.',
      highlights: ['Gán nhãn và tinh chỉnh các bộ dữ liệu tiếng Việt', 'Thiết kế và đánh giá câu hỏi để cải thiện chất lượng phản hồi LLM', 'Áp dụng hướng dẫn gán nhãn nhất quán trong quy trình chất lượng dữ liệu']
    },
    'exp-gradients-ai-engineer': {
      role: 'Kỹ sư AI', description: 'Đóng góp vào quy trình tinh chỉnh Vietnamese-language data và text retrieval cho các ứng dụng AI.',
      highlights: ['Tinh chỉnh phần tiếng Việt của bộ dữ liệu mC4', 'Hỗ trợ triển khai hệ thống truy hồi văn bản tiếng Việt']
    },
    'credential-isico-2023': { title: 'Chứng nhận hội nghị ISICO 2023', description: 'Chứng nhận hội nghị liên quan đến bài báo “Nhận dạng cây thuốc dựa trên Vision Transformer và BEiT.”' },
    'credential-ielts-2024': { title: 'International English Language Testing System (IELTS)', description: 'Điểm tổng: 7.5.' },
    'credential-fptu-ai-engineer': { title: 'Chứng nhận học việc Kỹ sư AI', issuer: 'Đại học FPT', description: 'Chứng nhận do Đại học FPT cấp sau khi hoàn thành chương trình học việc Kỹ sư AI tại Gradients Technologies Joint Stock Company.' },
    'edu-2': { degree: 'Thạc sĩ và Tiến sĩ liên thông', institution: 'Đại học Sungkyunkwan', details: 'Chuyên ngành: Công nghệ sinh học tích hợp.' },
    'edu-1': { degree: 'Bằng cử nhân', institution: 'Đại học FPT', details: 'Chuyên ngành: Trí tuệ nhân tạo.', grade: 'Xuất sắc' },
    'award-fptu-valedictorian-engineering-technology-2024': { organization: 'Đại học FPT', title: 'Thủ khoa Khóa 3 ngành Kỹ thuật và Công nghệ', description: 'Được vinh danh là Thủ khoa Khóa 3 ngành Kỹ thuật và Công nghệ nhờ thành tích học tập và năng lực lãnh đạo xuất sắc.' },
    'mapr-2025': { title: 'Vietnamese Automatic Speech Recognition Utilizing Audio and Visual Data', abstract: 'Investigates audio-visual speech recognition (AVSR) techniques specifically optimized for the Vietnamese language, addressing low-resource challenges and improving speech recognition accuracy by fusing visual lip dynamics with acoustic signals.', keywords: ['Speech Recognition', 'Audio-Visual Fusion', 'Deep Learning', 'Vietnamese Language', 'MAPR'] },
    'procs-2024': { title: 'Medicinal plant recognition based on Vision Transformer and BEiT', abstract: 'Applies self-supervised Vision Transformers (ViT) and Bidirectional Encoder representation from Image Transformers (BEiT) to high-precision medicinal plant classification, significantly improving recognition accuracy over conventional CNN architectures.', keywords: ['Vision Transformer (ViT)', 'BEiT', 'Plant Recognition', 'Computer Vision', 'Medicinal Species'] }
  },
  ko: {
    'exp-outlier-data-annotator': {
      role: '데이터 어노테이터', description: 'LLM의 논리적 추론 능력 학습을 위해 베트남어 수학 문제를 개발했습니다.',
      highlights: ['논리 추론 학습을 위한 베트남어 수학 문제 작성', 'LLM 개발을 위한 문제 품질과 일관성 개선']
    },
    'exp-highbrow-qa-lead': {
      role: 'QA 리드', description: '어노테이터 팀을 감독하고 데이터 품질과 일관성을 보장하는 QA 프로세스를 구현했습니다.',
      highlights: ['데이터 어노테이터 팀을 이끌고 지원', '일관된 고품질 데이터셋을 위한 품질 보증 프로세스 구현', '주석 품질을 모니터링하고 실행 가능한 피드백 제공']
    },
    'exp-highbrow-data-annotator': {
      role: '데이터 어노테이터', description: 'LLM 응답의 정확성과 자연스러움을 높이기 위해 Vietnamese-language datasets를 개발하고 개선했습니다.',
      highlights: ['베트남어 데이터셋 주석 처리 및 개선', 'LLM 응답 품질 향상을 위한 프롬프트 설계 및 검토', '데이터 품질 업무 전반에 일관된 주석 지침 적용']
    },
    'exp-gradients-ai-engineer': {
      role: 'AI 엔지니어', description: 'AI 애플리케이션을 위한 Vietnamese-language data 정제 및 text retrieval workflow에 기여했습니다.',
      highlights: ['mC4 데이터셋의 베트남어 부분 정제', '베트남어 텍스트 검색 시스템 구현 지원']
    },
    'credential-isico-2023': { title: 'ISICO 2023 학술대회 인증서', description: '“Vision Transformer와 BEiT 기반 약용 식물 인식” 논문과 관련된 학술대회 인증서입니다.' },
    'credential-ielts-2024': { title: 'International English Language Testing System (IELTS)', description: '종합 밴드 점수: 7.5.' },
    'credential-fptu-ai-engineer': { title: 'AI 엔지니어 견습 인증서', issuer: 'FPT 대학교', description: 'Gradients Technologies Joint Stock Company에서 AI 엔지니어 견습 과정을 수료하여 FPT 대학교에서 발급한 인증서입니다.' },
    'edu-2': { degree: '석사·박사 통합 과정', institution: '성균관대학교', details: '전공: 융합생명공학.' },
    'edu-1': { degree: '학사 학위', institution: 'FPT 대학교', details: '전공: 인공지능.', grade: '최우수' },
    'award-fptu-valedictorian-engineering-technology-2024': { organization: 'FPT 대학교', title: '공학 및 기술 3기 수석 졸업생', description: '탁월한 학업 성취와 리더십을 인정받아 공학 및 기술 3기 수석 졸업생으로 선정되었습니다.' },
    'mapr-2025': { title: 'Vietnamese Automatic Speech Recognition Utilizing Audio and Visual Data', abstract: 'Investigates audio-visual speech recognition (AVSR) techniques specifically optimized for the Vietnamese language, addressing low-resource challenges and improving speech recognition accuracy by fusing visual lip dynamics with acoustic signals.', keywords: ['Speech Recognition', 'Audio-Visual Fusion', 'Deep Learning', 'Vietnamese Language', 'MAPR'] },
    'procs-2024': { title: 'Medicinal plant recognition based on Vision Transformer and BEiT', abstract: 'Applies self-supervised Vision Transformers (ViT) and Bidirectional Encoder representation from Image Transformers (BEiT) to high-precision medicinal plant classification, significantly improving recognition accuracy over conventional CNN architectures.', keywords: ['Vision Transformer (ViT)', 'BEiT', 'Plant Recognition', 'Computer Vision', 'Medicinal Species'] }
  }
};

const monthNames = {
  vi: { Jan: 'Tháng 1', Feb: 'Tháng 2', Mar: 'Tháng 3', Apr: 'Tháng 4', May: 'Tháng 5', Jun: 'Tháng 6', Jul: 'Tháng 7', Aug: 'Tháng 8', Sep: 'Tháng 9', Oct: 'Tháng 10', Nov: 'Tháng 11', Dec: 'Tháng 12' },
  ko: { Jan: '1월', Feb: '2월', Mar: '3월', Apr: '4월', May: '5월', Jun: '6월', Jul: '7월', Aug: '8월', Sep: '9월', Oct: '10월', Nov: '11월', Dec: '12월' }
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved && translations[saved] ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t: (key) => key.split('.').reduce((result, part) => result?.[part], translations[language]) ?? key,
    content: (id, field, fallback) => contentTranslations[language]?.[id]?.[field] ?? fallback,
    formatPeriod: (period) => {
      if (language === 'en') return period;
      const localized = period.replace(/([A-Z][a-z]{2}) (\d{4})/g, (_, month, year) => (
        language === 'ko' ? `${year}년 ${monthNames[language][month]}` : `${monthNames[language][month]} ${year}`
      ));
      return localized
        .replace('Present', language === 'ko' ? '현재' : 'Hiện tại')
        .replace('mos', language === 'ko' ? '개월' : 'tháng')
        .replace('mo', language === 'ko' ? '개월' : 'tháng');
    }
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
