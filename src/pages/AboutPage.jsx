import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Globe, Cpu, Code, BookOpen, Sparkles, Mail } from 'lucide-react';
import portraitImg from '../assets/portrait.png';
import { profileData, educationData } from '../data/portfolioData';

export default function AboutPage() {
  return (
    <div className="page-content container" style={{ paddingTop: '7.5rem', minHeight: '85vh' }}>
      <div className="mb-6">
        <span className="tag mb-2">Profile & Biography</span>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', marginBottom: '0.75rem' }}>
          About <span className="text-gradient">{profileData.name}</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '680px' }}>
          Software engineer, AI researcher, and lifelong learner based in Vietnam.
        </p>
      </div>

      <div className="grid mb-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'start' }}>
        {/* Left card with portrait and personal identity */}
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ position: 'relative', width: '200px', margin: '0 auto 1.5rem' }}>
            <div className="portrait-glow" style={{ inset: '-6px' }}></div>
            <img 
              src={portraitImg} 
              alt={profileData.name} 
              style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '20px', position: 'relative', zIndex: 1, border: '1px solid var(--glass-border)' }} 
            />
          </div>

          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{profileData.name}</h2>
          <div className="text-sm mb-3" style={{ color: 'var(--accent-purple)', fontWeight: 600 }}>{profileData.nativeName}</div>

          <div className="flex gap-2 mb-4" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
            <span className="alias-chip">English: <strong>{profileData.englishName}</strong></span>
            <span className="alias-chip">Korean: <strong>{profileData.koreanName}</strong></span>
            <span className="alias-chip"><Globe size={13} /> {profileData.origin}</span>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, textAlign: 'left', marginBottom: '1.5rem' }}>
            {profileData.bio}
          </p>

          <a href={`mailto:${profileData.email}`} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            <Mail size={16} /> Contact Me
          </a>
        </div>

        {/* Right card: Education & Research Focus */}
        <div className="flex" style={{ flexDirection: 'column', gap: '2rem' }}>
          {/* Education */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
              <GraduationCap size={24} style={{ color: 'var(--accent-primary)' }} />
              Education
            </h2>
            <div className="flex" style={{ flexDirection: 'column', gap: '1.25rem' }}>
              {educationData.map(edu => (
                <div key={edu.id}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="tag">{edu.period}</span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{edu.degree}</h3>
                  <div className="text-sm mb-2" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{edu.institution}</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{edu.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Research Interests */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
              <Cpu size={24} style={{ color: 'var(--accent-purple)' }} />
              Research Interests
            </h2>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div className="alias-chip" style={{ padding: '0.75rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Sparkles size={16} style={{ color: 'var(--accent-primary)' }} />
                <span>Vision Transformers (ViT) & BEiT</span>
              </div>
              <div className="alias-chip" style={{ padding: '0.75rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Sparkles size={16} style={{ color: 'var(--accent-primary)' }} />
                <span>Audio-Visual Speech Recognition (AVSR)</span>
              </div>
              <div className="alias-chip" style={{ padding: '0.75rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Sparkles size={16} style={{ color: 'var(--accent-primary)' }} />
                <span>Multimodal Deep Learning</span>
              </div>
              <div className="alias-chip" style={{ padding: '0.75rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Sparkles size={16} style={{ color: 'var(--accent-primary)' }} />
                <span>Scalable Full-Stack Web Systems</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
