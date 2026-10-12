import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ChevronRight, BookOpen, Briefcase, Award, GraduationCap, MapPin, Globe, Cpu, Sparkles, ExternalLink, ArrowRight, Quote } from 'lucide-react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import worldMap from 'world-atlas/countries-110m.json';
import portraitImg from '../assets/portrait.png';
import { GithubIcon, LinkedinIcon, OrcidIcon } from '../components/Icons';
import { profileData, publicationsData, experienceData, educationData, awardsData, visitorCountriesData } from '../data/portfolioData';

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
  const visitorCountryNames = {
    Vietnam: ['Vietnam'],
    'South Korea': ['South Korea', 'Korea'],
    'United States': ['United States', 'United States of America'],
    Japan: ['Japan']
  };
  const visitorLocations = {
    Vietnam: [108, 16],
    'South Korea': [128, 36],
    'United States': [-100, 38],
    Japan: [138, 36]
  };
  const visitorCounts = Object.fromEntries(
    visitorCountriesData.map((entry) => [entry.country, entry.visitors])
  );
  const maxVisitors = Math.max(...visitorCountriesData.map((entry) => entry.visitors), 1);

  const getCountryVisitors = (countryName) => {
    const entry = Object.entries(visitorCountryNames).find(([, aliases]) => aliases.includes(countryName));
    return entry ? visitorCounts[entry[0]] ?? 0 : 0;
  };

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

            <motion.div variants={itemVariants} style={{ marginBottom: '2rem' }}>
              <h2 className="flex items-center gap-2" style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                <Cpu size={20} style={{ color: 'var(--accent-purple)' }} />
                Research Interests
              </h2>
              <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
                <span className="alias-chip">
                  <Sparkles size={14} style={{ color: 'var(--accent-primary)' }} />
                  Anticancer Peptides
                </span>
                <span className="alias-chip">
                  <Sparkles size={14} style={{ color: 'var(--accent-primary)' }} />
                  Audio-Visual Speech Recognition (AVSR)
                </span>
                <span className="alias-chip">
                  <Sparkles size={14} style={{ color: 'var(--accent-primary)' }} />
                  Multimodal Deep Learning
                </span>
                <span className="alias-chip">
                  <Sparkles size={14} style={{ color: 'var(--accent-primary)' }} />
                  Medical Imaging
                </span>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex gap-3 items-center" style={{ flexWrap: 'wrap' }}>
              <a href={`mailto:${profileData.personalEmail}`} className="btn-primary">
                <Mail size={18} />
                Personal Email
              </a>
              <a href={`mailto:${profileData.affiliationEmail}`} className="btn-secondary">
                <Mail size={18} />
                Affiliation Email
              </a>
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

      {/* Education Section */}
      <motion.section
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
      >
        <div className="container">
          <motion.h2 variants={itemVariants} className="section-title" style={{ marginBottom: '2rem' }}>
            <GraduationCap size={28} style={{ color: 'var(--accent-primary)' }} />
            Education
          </motion.h2>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {educationData.map((edu) => (
              <motion.div key={edu.id} variants={itemVariants} className="glass-panel" style={{ padding: '1.5rem' }}>
                <div className="flex gap-3">
                  {edu.logo && (
                    <div style={{ width: '92px', height: '81px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <img
                        src={edu.logo}
                        alt={`${edu.institution} logo`}
                        style={{ width: '81px', height: 'auto', display: 'block' }}
                      />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="tag">{edu.period}</span>
                    </div>
                    <h3 className="mb-1" style={{ fontSize: '1.15rem' }}>{edu.degree}</h3>
                    <div className="text-sm mb-2" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{edu.institution}</div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{edu.details}</p>
                    {edu.grade && <p className="text-sm" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Grade: {edu.grade}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
        <div className="container">
          <div className="flex items-center" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <motion.h2 variants={itemVariants} className="section-title" style={{ marginBottom: '0.5rem' }}>
                <BookOpen size={28} style={{ color: 'var(--accent-primary)' }}/>
                Highlighted Publications
              </motion.h2>
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
                    <span className="tag" style={{ background: 'rgba(20, 184, 166, 0.08)', color: 'var(--accent-cyan)', borderColor: 'rgba(20, 184, 166, 0.2)' }}>
                      {pub.type}
                    </span>
                    <span className="tag" style={{ background: 'rgba(5, 150, 105, 0.08)', color: 'var(--accent-purple)', borderColor: 'rgba(5, 150, 105, 0.2)' }}>
                      Featured
                    </span>
                    <span className="citation-badge">
                      <Quote size={13} />
                      {pub.citationCount} {pub.citationCount === 1 ? 'citation' : 'citations'}
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
        </div>
      </motion.section>

      {/* Experience & Awards Brief Overview */}
      <motion.section 
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
      >
        <div className="container grid">
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
                <Link key={exp.id} to={`/experience#${exp.id}`} style={{ color: 'inherit', display: 'block' }}>
                  <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="tag">{exp.period}</span>
                    </div>
                    <h3 className="mb-1" style={{ fontSize: '1.15rem' }}>{exp.role}</h3>
                    <div className="text-sm mb-2" style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{exp.organization}</div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{exp.description}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* Awards preview */}
          <div>
            <div className="flex items-center" style={{ justifyContent: 'space-between', marginBottom: '2rem' }}>
              <motion.h2 variants={itemVariants} className="section-title" style={{ marginBottom: 0 }}>
                <Award size={26} style={{ color: 'var(--accent-primary)' }}/> 
                Awards
              </motion.h2>
              <Link to="/awards" style={{ fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                Details <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="flex" style={{ flexDirection: 'column', gap: '1rem' }}>
              {awardsData.slice(0, 1).map((award) => (
                <Link key={award.id} to={`/awards#${award.id}`} style={{ color: 'inherit', display: 'block' }}>
                  <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="tag">{award.year}</span>
                    </div>
                    <h3 className="mb-1" style={{ fontSize: '1.15rem' }}>{award.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{award.description}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Visitor Countries Section */}
      <motion.section
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
      >
        <div className="container">
          <div className="visitor-heading">
            <div>
              <motion.h2 variants={itemVariants} className="section-title" style={{ marginBottom: '0.5rem' }}>
                <Globe size={28} style={{ color: 'var(--accent-primary)' }} />
                Visitors around the world
              </motion.h2>
            </div>
          </div>

          <motion.div variants={itemVariants} className="glass-panel visitor-countries-panel">
            <div className="visitor-map-layout">
              <div className="visitor-map" aria-label="World map showing visitor countries">
                <ComposableMap projectionConfig={{ scale: 145 }} width={800} height={390}>
                  <Geographies geography={worldMap}>
                    {({ geographies }) => geographies.map((geo) => {
                      const visitors = getCountryVisitors(geo.properties.name);
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          className={visitors > 0 ? 'visitor-map-country is-visited' : 'visitor-map-country'}
                          style={{
                            default: { fill: visitors > 0 ? `color-mix(in srgb, var(--accent-primary) ${35 + Math.round((visitors / maxVisitors) * 50)}%, var(--glass-bg))` : 'var(--glass-border)', outline: 'none' },
                            hover: { fill: 'var(--accent-cyan)', outline: 'none' },
                            pressed: { fill: 'var(--accent-primary)', outline: 'none' }
                          }}
                          tabIndex={visitors > 0 ? 0 : -1}
                          aria-label={visitors > 0 ? `${geo.properties.name}: ${visitors} visitors` : geo.properties.name}
                        />
                      );
                    })}
                  </Geographies>
                  {Object.entries(visitorLocations).map(([country, coordinates]) => (
                    <Marker key={country} coordinates={coordinates}>
                      <circle r={5 + ((visitorCounts[country] ?? 0) / maxVisitors) * 6} className="visitor-map-marker" />
                      <circle r="3" className="visitor-map-marker-core" />
                    </Marker>
                  ))}
                </ComposableMap>
              </div>
              <div className="visitor-country-list" aria-label="Visitor countries ranked by visitors">
                {visitorCountriesData.map((entry) => (
                  <div className="visitor-country" key={entry.country}>
                    <div className="visitor-country-name">
                      <span className="visitor-flag" aria-hidden="true">{entry.flag}</span>
                      <span>{entry.country}</span>
                    </div>
                    <strong>{entry.visitors}</strong>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
