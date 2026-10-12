import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { credentialsData } from '../data/portfolioData';

export default function CredentialsPage() {
  return (
    <div className="page-content container" style={{ paddingTop: '7.5rem', minHeight: '85vh' }}>
      <div className="mb-6">
        <span className="tag mb-2">Credentials</span>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', marginBottom: '0.75rem' }}>
          Professional <span className="text-gradient">Credentials</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '680px' }}>
          Certificates and credentials that document my professional training and experience.
        </p>
      </div>

      {credentialsData.map((credential) => (
        <motion.div
          key={credential.id}
          id={credential.id}
          className="glass-panel"
          style={{ padding: '2rem', maxWidth: '720px' }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="tag">{credential.year}</span>
            <span className="tag">{credential.issuer}</span>
          </div>

          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={22} style={{ color: 'var(--accent-purple)' }} />
            {credential.title}
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            {credential.description}
          </p>

          <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
            <a className="btn-primary" href={credential.fileUrl} target="_blank" rel="noreferrer">
              <ExternalLink size={16} />
              View Certificate
            </a>
            <a className="btn-secondary" href={credential.fileUrl} download>
              <FileText size={16} />
              Download PDF
            </a>
            <Link className="btn-secondary" to={`/experience#${credential.experienceId}`}>
              View Related Experience
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
