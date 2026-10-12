import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, FileText, ChevronRight, BookOpen, Award, Briefcase, GraduationCap, MapPin, Globe, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';
import portraitImg from '../assets/portrait.png';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import { profileData, publicationsData, experienceData, educationData, awardsData } from '../data/portfolioData';

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const highlightPubs = publicationsData.filter(p => p.isHighlight);

  return (
    <div className="page-content">
      {/* Hero Section */}
      <motion.section 
        className="section" 
        style={{ minHeight: '88vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '7.5rem' }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container hero-wrapper">
          {/* Left Content */}
          <div style={{ flex: '1 1 500px' }}>
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-3" style={{ flexWrap: 'wrap' }}>
              <span className="tag">
                <Globe size={13} style={{ marginRight: 5, verticalAlign: 'middle' }} /> {profileData.origin}
              </span>
              <span className="tag">{profileData.title}</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)', lineHeight: 1.15, marginBottom: '1rem' }}>
              Hi, I'm <br />
              <span className="text-gradient">{profileData.name}</span>
            </motion.h1>

            {/* Name Badges */}
            <motion.div variants={itemVariants} className="name-alias-badges">
              <div className="alias-chip">
                <span>English Name:</span> <strong>{profileData.englishName}</strong>
              </div>
              <div className="alias-chip">
                <span>Korean Name:</span> <strong>{profileData.koreanName}</strong>
              </div>
              <div className="alias-chip">
                <MapPin size={13} style={{ color: 'var(--accent-primary)' }} />
                <span>From:</span> <strong>Vietnam</strong>
              </div>
            </motion.div>

            <motion.p variants={itemVariants} style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '580px', marginBottom: '2rem' }}>
              {profileData.bio}
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex gap-3 items-center" style={{ flexWrap: 'wrap' }}>
              <a href={`mailto:${profileData.email}`} className="btn-primary">
                <Mail size={18} />
                Get in Touch
              </a>
              <a href={profileData.github} target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub">
                <GithubIcon size={20} />
              </a>
              <a href={profileData.linkedin} target="_blank" rel="noreferrer" className="icon-btn" aria-label="LinkedIn">
                <LinkedinIcon size={20} />
              </a>
              <Link to="/about" className="icon-btn" aria-label="About">
                <FileText size={20} />
              </Link>
            </motion.div>
          </div>

          {/* Right Portrait */}
          <motion.div 
            variants={itemVariants} 
            className="portrait-card"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="portrait-glow"></div>
            <div className="portrait-image-wrapper">
              <img src={portraitImg} alt={`${profileData.name} (${profileData.englishName} / ${profileData.koreanName})`} className="portrait-img" />
            </div>
            <div className="portrait-badge">
              <Sparkles size={14} style={{ color: 'var(--accent-purple)' }} />
              <span>{profileData.englishName} • {profileData.koreanName}</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Publications Highlights Section */}
      <motion.section 
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
      >
        <div className="flex items-center" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
          <div>
            <motion.h2 variants={itemVariants} className="section-title" style={{ marginBottom: '0.5rem' }}>
              <BookOpen size={28} style={{ color: 'var(--accent-primary)' }}/> 
              Highlighted Publications
            </motion.h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Selected peer-reviewed articles and conference contributions
            </p>
          </div>
          <Link to="/publications" className="btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}>
            View All Publications <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="flex" style={{ flexDirection: 'column', gap: '1.25rem' }}>
          {highlightPubs.map((pub, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants} 
              className="glass-panel" 
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}
            >
              <div style={{ flex: '1 1 340px' }}>
                <div className="flex items-center gap-2 mb-2" style={{ flexWrap: 'wrap' }}>
                  <span className="tag">{pub.year}</span>
                  <span className="tag" style={{ background: 'rgba(14, 165, 233, 0.08)', color: 'var(--accent-cyan)', borderColor: 'rgba(14, 165, 233, 0.2)' }}>
                    {pub.type}
                  </span>
                  <span className="tag" style={{ background: 'rgba(124, 58, 237, 0.08)', color: 'var(--accent-purple)', borderColor: 'rgba(124, 58, 237, 0.2)' }}>
                    Featured
                  </span>
                </div>
                <h3 className="mb-2" style={{ fontSize: '1.2rem', lineHeight: 1.4 }}>
                  <a href={pub.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)' }}>
                    {pub.title}
                  </a>
                </h3>
                <div className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                  {pub.authors.map((author, i) => (
                    <React.Fragment key={i}>
                      {author.highlight ? (
                        <strong style={{ color: 'var(--text-primary)', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: '3px', textDecorationColor: 'var(--accent-primary)' }}>
                          {author.name}
                        </strong>
                      ) : (
                        <span>{author.name}</span>
                      )}
                      {i < pub.authors.length - 1 && ', '}
                    </React.Fragment>
                  ))}
                </div>
                <div className="text-sm" style={{ color: 'var(--accent-primary)', fontWeight: 500 }}>{pub.venue}</div>
              </div>
              <div className="flex gap-2">
                <a 
                  href={pub.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary" 
                  style={{ padding: '0.6rem 1.2rem', fontSize: '0.875rem' }}
                >
                  View Paper <ExternalLink size={15} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Experience & Education Brief Overview */}
      <motion.section 
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
      >
        <div className="grid">
          {/* Experience preview */}
          <div>
            <div className="flex items-center" style={{ justifyContent: 'space-between', marginBottom: '2rem' }}>
              <motion.h2 variants={itemVariants} className="section-title" style={{ marginBottom: 0 }}>
                <Briefcase size={26} style={{ color: 'var(--accent-primary)' }}/> 
                Experience
              </motion.h2>
              <Link to="/experience" style={{ fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                Details <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="flex" style={{ flexDirection: 'column', gap: '1rem' }}>
              {experienceData.map((exp) => (
                <motion.div key={exp.id} variants={itemVariants} className="glass-panel" style={{ padding: '1.5rem' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="tag">{exp.period}</span>
                  </div>
                  <h3 className="mb-1" style={{ fontSize: '1.15rem' }}>{exp.role}</h3>
                  <div className="text-sm mb-2" style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{exp.organization}</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education & Honors preview */}
          <div>
            <div className="flex items-center" style={{ justifyContent: 'space-between', marginBottom: '2rem' }}>
              <motion.h2 variants={itemVariants} className="section-title" style={{ marginBottom: 0 }}>
                <GraduationCap size={26} style={{ color: 'var(--accent-primary)' }}/> 
                Education & Awards
              </motion.h2>
              <Link to="/about" style={{ fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                Full Bio <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="flex" style={{ flexDirection: 'column', gap: '1rem' }}>
              {educationData.map((edu) => (
                <motion.div key={edu.id} variants={itemVariants} className="glass-panel" style={{ padding: '1.5rem' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="tag">{edu.period}</span>
                  </div>
                  <h3 className="mb-1" style={{ fontSize: '1.15rem' }}>{edu.degree}</h3>
                  <div className="text-sm mb-2" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{edu.institution}</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{edu.details}</p>
                </motion.div>
              ))}

              {awardsData.slice(0, 1).map((award) => (
                <motion.div key={award.id} variants={itemVariants} className="glass-panel" style={{ padding: '1.5rem' }}>
                  <div className="text-sm mb-1" style={{ color: 'var(--accent-purple)', fontWeight: 600 }}>{award.year}</div>
                  <h3 className="mb-1" style={{ fontSize: '1.15rem' }}>{award.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{award.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
