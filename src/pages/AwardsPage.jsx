import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Star } from 'lucide-react';
import { awardsData } from '../data/portfolioData';

export default function AwardsPage() {
  return (
    <div className="page-content container" style={{ paddingTop: '7.5rem', minHeight: '85vh' }}>
      <div className="mb-6">
        <span className="tag mb-2">Honors & Competitions</span>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', marginBottom: '0.75rem' }}>
          Awards & <span className="text-gradient">Honors</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '680px' }}>
          Recognition of academic excellence, competitive coding challenges, and hackathons.
        </p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
        {awardsData.map((award) => (
          <motion.div 
            key={award.id} 
            className="glass-panel" 
            style={{ padding: '2rem' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="tag" style={{ background: 'rgba(5, 150, 105, 0.08)', color: 'var(--accent-purple)', borderColor: 'rgba(5, 150, 105, 0.2)' }}>
                {award.year}
              </span>
              <span className="tag">{award.organization}</span>
            </div>

            <h2 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Trophy size={20} style={{ color: 'var(--accent-purple)' }} />
              {award.title}
            </h2>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {award.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
