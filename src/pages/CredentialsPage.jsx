import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { credentialsData } from '../data/portfolioData';
import { useLanguage } from '../useLanguage';

export default function CredentialsPage() {
  const { t, content, formatPeriod } = useLanguage();
  return (
    <div className="page-content container" style={{ paddingTop: '7.5rem', minHeight: '85vh' }}>
      <div className="mb-6">
        <span className="tag mb-2">{t('credentials.tag')}</span>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', marginBottom: '0.75rem' }}>
          {t('credentials.title')} <span className="text-gradient">{t('credentials.titleAccent')}</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '680px' }}>
          {t('credentials.description')}
        </p>
      </div>

      <div className="credentials-list">
        {credentialsData.map((credential) => (
          <motion.div
            key={credential.id}
            id={credential.id}
            className="glass-panel anchor-target"
            style={{ padding: '2rem', maxWidth: '720px' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="tag">{formatPeriod(credential.year)}</span>
              <span className="tag">{content(credential.id, 'issuer', credential.issuer)}</span>
            </div>

            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={22} style={{ color: 'var(--accent-purple)' }} />
              {content(credential.id, 'title', credential.title)}
            </h2>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {content(credential.id, 'description', credential.description)}
            </p>

            {credential.scores && (
              <div className="flex gap-2 mb-4" style={{ flexWrap: 'wrap' }}>
                {credential.scores.map(({ skill, score }) => (
                  <span key={skill} className="tag">{skill}: {score}</span>
                ))}
              </div>
            )}

            {(credential.fileUrl || credential.experienceId) && (
              <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
                {credential.fileUrl && (
                  <>
                    <a className="btn-primary" href={credential.fileUrl} target="_blank" rel="noreferrer">
                      <ExternalLink size={16} />
                      {t('credentials.certificate')}
                    </a>
                    <a className="btn-secondary" href={credential.fileUrl} download>
                      <FileText size={16} />
                      {t('credentials.download')}
                    </a>
                  </>
                )}
                {credential.experienceId && (
                  <Link className="btn-secondary" to={`/experience#${credential.experienceId}`}>
                    {t('credentials.experience')}
                  </Link>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
