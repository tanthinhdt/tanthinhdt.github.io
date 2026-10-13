import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Trophy } from 'lucide-react';
import { awardsData } from '../data/portfolioData';
import { useLanguage } from '../i18n';

export default function AwardsPage() {
  const { t, content } = useLanguage();
  return (
    <div className="page-content container" style={{ paddingTop: '7.5rem', minHeight: '85vh' }}>
      <div className="mb-6">
        <span className="tag mb-2">{t('awards.tag')}</span>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', marginBottom: '0.75rem' }}>
          {t('awards.title')} <span className="text-gradient">{t('awards.titleAccent')}</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '680px' }}>
          {t('awards.description')}
        </p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
        {awardsData.map((award) => (
          <motion.div 
            key={award.id} 
            id={award.id}
            className="glass-panel" 
            style={{ padding: '1.5rem' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="award-card-layout" style={{ display: 'grid', gridTemplateColumns: award.imageUrl ? 'minmax(0, 1fr) minmax(180px, 260px)' : '1fr', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <div className="flex items-center gap-2 mb-3" style={{ flexWrap: 'wrap' }}>
                  <span className="tag" style={{ background: 'rgba(5, 150, 105, 0.08)', color: 'var(--accent-purple)', borderColor: 'rgba(5, 150, 105, 0.2)' }}>
                    {award.year}
                  </span>
                  <span className="tag">{award.organization}</span>
                </div>

                <h2 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <Trophy size={20} style={{ color: 'var(--accent-purple)', flexShrink: 0, marginTop: '0.15rem' }} />
                  <span>{content(award.id, 'title', award.title)}</span>
                </h2>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {content(award.id, 'description', award.description)}
                </p>

                {award.sourceUrl && (
                  <a
                    className="btn-secondary"
                    href={award.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ marginTop: '1.25rem' }}
                  >
                    <ExternalLink size={16} />
                    {t('awards.source')}
                  </a>
                )}
              </div>

              {award.imageUrl && (
                <div style={{ padding: '0.5rem', borderRadius: '14px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
                  <img
                    src={award.imageUrl}
                    alt={`${award.title} certificate and commemorative plaque`}
                    style={{ display: 'block', width: '100%', height: '150px', objectFit: 'cover', borderRadius: '9px' }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
