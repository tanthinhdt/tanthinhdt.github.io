import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { experienceData } from '../data/portfolioData';
import { useLanguage } from '../useLanguage';

export default function ExperiencePage() {
  const { t, content, formatPeriod } = useLanguage();
  return (
    <div className="page-content container" style={{ paddingTop: '7.5rem', minHeight: '85vh' }}>
      <div className="mb-6">
        <span className="tag mb-2">{t('experience.tag')}</span>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', marginBottom: '0.75rem' }}>
          {t('experience.title')} <span className="text-gradient">{t('experience.titleAccent')}</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '680px' }}>
          {t('experience.description')}
        </p>
      </div>

      <div className="flex" style={{ flexDirection: 'column', gap: '2rem' }}>
        {experienceData.map((exp) => (
          <motion.div 
            key={exp.id} 
            id={exp.id}
            className="glass-panel anchor-target" 
            style={{ padding: '2.25rem' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="tag">{formatPeriod(exp.period)}</span>
            </div>
            
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.25rem' }}>{content(exp.id, 'role', exp.role)}</h2>
            <div className="text-sm mb-3" style={{ fontWeight: 600, color: 'var(--accent-primary)', fontSize: '1rem' }}>
              {exp.organization}
            </div>
            {(exp.employmentType || exp.location) && (
              <div className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
                {[exp.employmentType && t(`labels.${exp.employmentType}`), exp.location === 'Remote' ? t('labels.Remote') : exp.location].filter(Boolean).join(' · ')}
              </div>
            )}

            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {content(exp.id, 'description', exp.description)}
            </p>

            <h3 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              {t('experience.contributions')}
            </h3>

            <div className="flex" style={{ flexDirection: 'column', gap: '0.6rem' }}>
              {exp.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2" style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
                  <span>{content(exp.id, 'highlights', exp.highlights)[i]}</span>
                </div>
              ))}
            </div>

            {exp.credentialId && (
              <Link
                className="btn-secondary"
                to={`/credentials#${exp.credentialId}`}
                style={{ marginTop: '1.5rem' }}
              >
                {t('experience.credential')}
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
