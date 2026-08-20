import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import DiagnosticForm from '../components/DiagnosticForm';

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'Gastronomía', 'Turismo', 'Bienestar / Salud'];

  const allProjects = Object.values(projectsData);
  const filteredProjects = selectedCategory === 'Todos'
    ? allProjects
    : allProjects.filter((p) => p.category === selectedCategory);

  return (
    <main
      style={{
        background: '#000000',
        minHeight: '100vh',
        paddingTop: '7rem',
        paddingBottom: '8rem',
        position: 'relative',
        overflow: 'hidden'
      }}
      aria-label="Casos de Estudio Crimson Studio"
    >
      {/* Top Floating Rocks Layer */}
      <img
        src="/assets/rocas/Rocas flotando.png"
        alt="Rocas flotando"
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '600px',
          objectFit: 'contain',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.85
        }}
      />

      {/* Top Banner Header */}
      <div
        style={{
          width: '100%',
          background: 'url(/assets/dragones/Banner.svg) center/cover no-repeat, #0a0a0c',
          padding: '3rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '4rem',
          position: 'relative',
          zIndex: 2
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
          <img
            src="/assets/dragones/CrimsonDragonNav.png"
            alt="Crimson Dragon Logo"
            style={{ height: '32px', width: 'auto' }}
          />
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
            color: '#ffffff',
            lineHeight: '0.9',
            textTransform: 'uppercase',
            marginBottom: '1rem'
          }}
        >
          CASOS<br />
          <span style={{ color: 'var(--crimson-magenta)' }}>CRIMSON</span> STUDIO
        </h1>

        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', maxWidth: '520px', margin: '0 auto' }}>
          Arquitectura estratégica, contenido de alto impacto y sistemas de adquisición aplicados a marcas referentes.
        </p>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Category Filters */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.85rem',
            marginBottom: '4.5rem',
            flexWrap: 'wrap'
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                background: selectedCategory === cat ? 'var(--crimson-magenta)' : 'rgba(255, 255, 255, 0.05)',
                border: selectedCategory === cat ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                padding: '0.65rem 1.75rem',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid Showcase */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            marginBottom: '8rem'
          }}
        >
          {filteredProjects.map((project) => (
            <Link
              key={project.slug}
              to={`/proyectos/${project.slug}`}
              className="crimson-card"
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '2.5rem 2rem',
                minHeight: '380px'
              }}
            >
              <div>
                {/* Header Logo & Category Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <div
                    style={{
                      width: '65px',
                      height: '65px',
                      background: '#000000',
                      border: '1px solid var(--border-light)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0.6rem'
                    }}
                  >
                    <img
                      src={project.logo}
                      alt={project.name}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                    />
                  </div>

                  <span
                    style={{
                      background: 'rgba(229, 10, 83, 0.15)',
                      border: '1px solid var(--crimson-magenta)',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '9999px',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase'
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Project Title */}
                <h2
                  style={{
                    fontFamily: 'var(--font-title)',
                    fontSize: '1.75rem',
                    color: '#ffffff',
                    marginBottom: '1rem',
                    lineHeight: '1.1'
                  }}
                >
                  {project.name}
                </h2>

                {/* Tagline */}
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.95rem',
                    lineHeight: '1.5',
                    marginBottom: '1.75rem'
                  }}
                >
                  {project.tagline}
                </p>

                {/* Service Badges */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                  {project.servicesBadges.map((badge, bIdx) => (
                    <span
                      key={bIdx}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '4px',
                        letterSpacing: '0.04em'
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Case Action */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--crimson-magenta)', fontWeight: '600', fontSize: '0.9rem' }}>
                <span>Ver Caso Completo</span>
                <span style={{ fontSize: '1.1rem', transition: 'transform 0.2s ease' }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Diagnostic Form */}
      <DiagnosticForm />
    </main>
  );
}
