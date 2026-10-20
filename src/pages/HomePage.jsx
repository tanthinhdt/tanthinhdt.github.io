import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  AudioWaveform,
  Award,
  Briefcase,
  ChevronRight,
  Cpu,
  ExternalLink,
  GraduationCap,
  Leaf,
  Mail,
  MapPin,
  Quote,
  Sparkles
} from 'lucide-react';
import portraitWebp from '../assets/portrait.webp';
import { GithubIcon, LinkedinIcon, OrcidIcon } from '../components/Icons';
import {
  awardsData,
  educationData,
  experienceData,
  profileData,
  publicationsData
} from '../data/portfolioData';
import { useLanguage } from '../useLanguage';

const projectVisuals = {
  'mapr-2025': { number: '01', icon: AudioWaveform, className: 'research-visual--speech' },
  'procs-2024': { number: '02', icon: Leaf, className: 'research-visual--bio' }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function HomePage() {
  const { t, content, formatPeriod } = useLanguage();
  const featuredProjects = publicationsData.filter((publication) => publication.isHighlight);

  return (
    <div className="page-content">
      <motion.section
        className="section hero-section"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container hero-wrapper">
          <div className="hero-copy">
            <motion.div variants={itemVariants} className="hero-eyebrow">
              <span className="status-dot" aria-hidden="true" />
              {t('home.currentStatus')}
            </motion.div>

            <motion.h1 variants={itemVariants}>
              {t('home.greeting')} <span className="text-gradient">{profileData.name}</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="hero-positioning">
              {t('home.positioning')}
            </motion.p>

            <motion.p variants={itemVariants} className="hero-summary">
              {t('home.profileBio')}
            </motion.p>

            <motion.div variants={itemVariants} className="name-alias-badges">
              <div className="alias-chip"><span>{t('home.englishName')}</span> <strong>{profileData.englishName}</strong></div>
              <div className="alias-chip"><span>{t('home.koreanName')}</span> <strong>{profileData.koreanName}</strong></div>
              <div className="alias-chip">
                <MapPin size={13} aria-hidden="true" />
                <span>{t('home.from')}</span> <strong>{t('countries.Vietnam')}</strong>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="hero-actions">
              <a href="#selected-work" className="btn-primary">
                {t('home.viewSelectedWork')} <ArrowRight size={17} />
              </a>
              <a href={`mailto:${profileData.affiliationEmail}`} className="btn-secondary">
                <Mail size={17} /> {t('home.contactMe')}
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="hero-socials" aria-label={t('home.profiles')}>
              <a href={profileData.github} target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub">
                <GithubIcon size={20} />
              </a>
              <a href={profileData.linkedin} target="_blank" rel="noreferrer" className="icon-btn" aria-label="LinkedIn">
                <LinkedinIcon size={20} />
              </a>
              <a href={profileData.orcid} target="_blank" rel="noreferrer" className="icon-btn" aria-label="ORCID">
                <OrcidIcon size={20} />
              </a>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="portrait-card">
            <div className="portrait-glow" />
            <div className="portrait-image-wrapper">
              <img
                src={portraitWebp}
                width="655"
                height="823"
                alt={`${profileData.name} (${profileData.englishName} / ${profileData.koreanName})`}
                className="portrait-img"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <div className="portrait-badge">
              <Sparkles size={14} aria-hidden="true" />
              <span>{t('home.profileTitle')}</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="selected-work"
        className="section selected-work-section anchor-target"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={containerVariants}
      >
        <div className="container">
          <motion.div variants={itemVariants} className="section-heading-row">
            <div>
              <span className="section-kicker">{t('home.selectedWorkKicker')}</span>
              <h2 className="section-title">
                <Cpu size={28} aria-hidden="true" />
                {t('home.selectedWork')}
              </h2>
              <p className="section-intro">{t('home.selectedWorkIntro')}</p>
            </div>
            <Link to="/publications" className="text-link">
              {t('home.viewAllPublications')} <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="research-grid">
            {featuredProjects.map((publication, index) => {
              const visual = projectVisuals[publication.id] || {
                number: String(index + 1).padStart(2, '0'),
                icon: Cpu,
                className: 'research-visual--speech'
              };
              const ProjectIcon = visual.icon;

              return (
                <motion.article key={publication.id} variants={itemVariants} className="research-card glass-panel">
                  <div className={`research-visual ${visual.className}`} aria-hidden="true">
                    <span>{visual.number}</span>
                    <ProjectIcon size={44} strokeWidth={1.5} />
                  </div>

                  <div className="research-card-content">
                    <div className="research-meta">
                      <span className="tag">{publication.year}</span>
                      <span className="tag">{publication.category === 'conference' ? t('home.conference') : t('home.journal')}</span>
                      {publication.citationCount > 0 && (
                        <span className="citation-badge">
                          <Quote size={13} aria-hidden="true" />
                          {publication.citationCount} {publication.citationCount === 1 ? t('home.citation') : t('home.citations')}
                        </span>
                      )}
                    </div>

                    <h3>{content(publication.id, 'title', publication.title)}</h3>
                    <p>{content(publication.id, 'abstract', publication.abstract)}</p>

                    <div className="research-keywords" aria-label={t('home.methods')}>
                      {content(publication.id, 'keywords', publication.keywords).slice(0, 4).map((keyword) => (
                        <span key={keyword}>{keyword}</span>
                      ))}
                    </div>

                    <div className="research-links">
                      <a href={publication.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
                        {t('home.viewPaper')} <ExternalLink size={15} />
                      </a>
                      <span className="doi-label">DOI {publication.doi}</span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={containerVariants}
      >
        <div className="container overview-grid">
          <div>
            <div className="overview-heading">
              <motion.h2 variants={itemVariants} className="section-title">
                <Briefcase size={26} aria-hidden="true" /> {t('home.experience')}
              </motion.h2>
              <Link to="/experience" className="text-link">{t('home.details')} <ChevronRight size={16} /></Link>
            </div>

            <div className="overview-list">
              {experienceData.slice(0, 2).map((experience) => (
                <Link key={experience.id} to={`/experience#${experience.id}`} className="overview-link-card">
                  <motion.div variants={itemVariants} className="glass-panel">
                    <span className="tag">{formatPeriod(experience.period)}</span>
                    <h3>{content(experience.id, 'role', experience.role)}</h3>
                    <div className="card-organization">{experience.organization}</div>
                    <p>{content(experience.id, 'description', experience.description)}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="overview-heading">
              <motion.h2 variants={itemVariants} className="section-title">
                <Award size={26} aria-hidden="true" /> {t('home.awards')}
              </motion.h2>
              <Link to="/awards" className="text-link">{t('home.details')} <ChevronRight size={16} /></Link>
            </div>

            {awardsData.slice(0, 1).map((award) => (
              <Link key={award.id} to={`/awards#${award.id}`} className="overview-link-card">
                <motion.div variants={itemVariants} className="glass-panel award-preview-card">
                  <div>
                    <div className="award-meta">
                      <span className="tag">{formatPeriod(award.year)}</span>
                      <span className="tag">
                        {t('home.issuedBy')} {content(award.id, 'organization', award.organization)}
                      </span>
                    </div>
                    <h3>{content(award.id, 'title', award.title)}</h3>
                    <p>{content(award.id, 'description', award.description)}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="section education-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={containerVariants}
      >
        <div className="container">
          <motion.h2 variants={itemVariants} className="section-title">
            <GraduationCap size={28} aria-hidden="true" /> {t('home.education')}
          </motion.h2>

          <div className="education-grid">
            {educationData.map((education) => (
              <motion.article key={education.id} variants={itemVariants} className="glass-panel education-card">
                {education.logo && (
                  <div className="institution-logo-badge">
                    <img
                      src={education.logo}
                      alt=""
                      width="68"
                      height="68"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                <div>
                  <span className="tag">{formatPeriod(education.period)}</span>
                  <h3>{content(education.id, 'degree', education.degree)}</h3>
                  <div className="card-organization">{content(education.id, 'institution', education.institution)}</div>
                  <p>{content(education.id, 'details', education.details)}</p>
                  {education.grade && <strong className="education-grade">{t('home.grade')} {content(education.id, 'grade', education.grade)}</strong>}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <section className="section contact-section">
        <div className="container">
          <div className="contact-panel">
            <span className="section-kicker">{t('home.contactKicker')}</span>
            <h2>{t('home.contactTitle')}</h2>
            <p>{t('home.contactDescription')}</p>
            <a href={`mailto:${profileData.affiliationEmail}`} className="btn-primary">
              <Mail size={17} /> {t('home.contactMe')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
