import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, Search, Copy, Check, FileCode, Tag, Quote } from 'lucide-react';
import { publicationsData } from '../data/portfolioData';

export default function PublicationsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [expandedBibtex, setExpandedBibtex] = useState({});

  const handleCopyBibtex = (id, bibtex) => {
    navigator.clipboard.writeText(bibtex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleBibtex = (id) => {
    setExpandedBibtex(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredPubs = publicationsData.filter(pub => {
    const matchesFilter = 
      activeFilter === 'all' || 
      pub.category === activeFilter ||
      (activeFilter === 'highlight' && pub.isHighlight);

    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      pub.title.toLowerCase().includes(query) ||
      pub.venue.toLowerCase().includes(query) ||
      pub.year.includes(query) ||
      pub.keywords.some(k => k.toLowerCase().includes(query)) ||
      pub.authors.some(a => a.name.toLowerCase().includes(query));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="page-content container" style={{ paddingTop: '7.5rem', minHeight: '85vh' }}>
      {/* Page Header */}
      <div className="mb-6">
        <span className="tag mb-2">Research & Scholarship</span>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', marginBottom: '0.75rem' }}>
          Publications & <span className="text-gradient">Research</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '680px' }}>
          Peer-reviewed articles, international conference proceedings, and academic contributions in Artificial Intelligence, Computer Vision, and Speech Processing.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel mb-6" style={{ padding: '1.25rem 1.5rem' }}>
        <div className="flex items-center" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Filter Pills */}
          <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Publications ({publicationsData.length})
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'conference' ? 'active' : ''}`}
              onClick={() => setActiveFilter('conference')}
            >
              Conferences (IEEE)
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'journal' ? 'active' : ''}`}
              onClick={() => setActiveFilter('journal')}
            >
              Journals (Elsevier)
            </button>
          </div>

          {/* Search Box */}
          <div className="search-box-wrapper" style={{ position: 'relative', minWidth: '260px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search by title, author, topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      {/* Publications List */}
      <div className="flex" style={{ flexDirection: 'column', gap: '1.75rem' }}>
        {filteredPubs.length === 0 ? (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: 'var(--text-secondary)' }}>No publications match your search criteria.</p>
          </div>
        ) : (
          filteredPubs.map((pub) => (
            <motion.div 
              key={pub.id} 
              className="glass-panel" 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{ padding: '2rem' }}
            >
              <div className="flex items-center gap-2 mb-3" style={{ flexWrap: 'wrap' }}>
                <span className="tag">{pub.year}</span>
                <span className="tag" style={{ background: 'rgba(20, 184, 166, 0.08)', color: 'var(--accent-cyan)', borderColor: 'rgba(20, 184, 166, 0.2)' }}>
                  {pub.type}
                </span>
                <span className="tag" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'transparent' }}>
                  DOI: {pub.doi}
                </span>
                <span className="citation-badge">
                  <Quote size={13} />
                  {pub.citationCount} {pub.citationCount === 1 ? 'citation' : 'citations'}
                </span>
              </div>

              <h2 style={{ fontSize: '1.35rem', lineHeight: 1.35, marginBottom: '0.75rem' }}>
                <a href={pub.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)' }}>
                  {pub.title}
                </a>
              </h2>

              {/* Bold Author List */}
              <div className="text-sm mb-2" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
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

              {/* Venue */}
              <div className="mb-3" style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.95rem' }}>
                {pub.venue}
              </div>
              <p className="citation-note">
                {pub.citationSource} citation snapshot · checked {pub.citationChecked} · not live
              </p>

              {/* Abstract */}
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                {pub.abstract}
              </p>

              {/* Keywords */}
              <div className="flex gap-2 mb-4" style={{ flexWrap: 'wrap' }}>
                {pub.keywords.map((kw, i) => (
                  <span key={i} className="alias-chip" style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}>
                    <Tag size={11} style={{ marginRight: 3, opacity: 0.7 }} />
                    {kw}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 items-center" style={{ flexWrap: 'wrap', borderTop: '1px solid var(--glass-border)', paddingTop: '1.25rem' }}>
                <a 
                  href={pub.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary" 
                  style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem' }}
                >
                  Read Paper <ExternalLink size={15} />
                </a>

                {pub.certificateUrl && (
                  <a
                    href={pub.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem' }}
                  >
                    View Conference Certificate <ExternalLink size={15} />
                  </a>
                )}

                <button 
                  onClick={() => handleCopyBibtex(pub.id, pub.bibtex)}
                  className="icon-btn" 
                  style={{ width: 'auto', padding: '0.6rem 1rem', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 500 }}
                  title="Copy BibTeX Citation"
                >
                  {copiedId === pub.id ? (
                    <>
                      <Check size={16} style={{ color: '#10b981' }} />
                      <span style={{ color: '#10b981' }}>BibTeX Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span>Copy BibTeX</span>
                    </>
                  )}
                </button>

                <button 
                  onClick={() => toggleBibtex(pub.id)}
                  className="icon-btn" 
                  style={{ width: 'auto', padding: '0.6rem 1rem', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 500 }}
                >
                  <FileCode size={16} />
                  <span>{expandedBibtex[pub.id] ? 'Hide BibTeX' : 'Show BibTeX'}</span>
                </button>
              </div>

              {/* Expandable BibTeX preview */}
              {expandedBibtex[pub.id] && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4"
                  style={{ 
                    background: 'rgba(15, 23, 42, 0.04)', 
                    border: '1px solid var(--glass-border)', 
                    borderRadius: '12px', 
                    padding: '1rem', 
                    fontFamily: 'monospace', 
                    fontSize: '0.825rem',
                    overflowX: 'auto',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {pub.bibtex}
                </motion.div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
