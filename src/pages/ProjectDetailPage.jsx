import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { projectsData } from '../data/projectsData';
import DiagnosticForm from '../components/DiagnosticForm';

export default function ProjectDetailPage() {
  const { i18n } = useTranslation();
  const isEn = (i18n.language || 'es').startsWith('en');

  const { slug } = useParams();
  const current = projectsData[slug];

  if (!current) {
    return <Navigate to="/proyectos" replace />;
  }

  return (
    <main
      style={{
        background: '#000000',
        minHeight: '100vh',
        paddingTop: '6.5rem',
        paddingBottom: '8rem',
        position: 'relative',
        overflow: 'hidden'
      }}
      aria-label={`Caso de Estudio ${current.name}`}
    >
      {/* Top Banner: CASOS CRIMSON STUDIO */}
      <div
        style={{
          width: '100%',
          background: 'url(/assets/dragones/Banner.svg) center/cover no-repeat, #0a0a0c',
          padding: '2.5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '3rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
          <img
            src="/assets/dragones/CrimsonDragonNav.png"
            alt="Crimson Dragon Logo"
            style={{ height: '30px', width: 'auto' }}
          />
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            color: '#ffffff',
            lineHeight: '0.9',
            textTransform: 'uppercase'
          }}
        >
          {isEn ? (
            <>
              CASE STUDIES<br />
              <span style={{ color: 'var(--crimson-magenta)' }}>CRIMSON</span> STUDIO
            </>
          ) : (
            <>
              CASOS<br />
              <span style={{ color: 'var(--crimson-magenta)' }}>CRIMSON</span> STUDIO
            </>
          )}
        </h1>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Back Link & Breadcrumb */}
        <div style={{ marginBottom: '2.5rem' }}>
          <Link
            to="/proyectos"
            style={{
              color: 'rgba(255, 255, 255, 0.75)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'color 0.2s ease'
            }}
            className="hover-crimson"
          >
            <span>←</span>
            <span>{isEn ? 'Back to all case studies' : 'Volver a todos los proyectos'}</span>
          </Link>
        </div>

        {/* Hero Visual Media */}
        <div
          style={{
            width: '100%',
            maxWidth: '1000px',
            margin: '0 auto 6rem auto',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid var(--border-light)',
            background: '#0a0a0c'
          }}
        >
          {current.video ? (
            <video
              key={current.video}
              src={current.video}
              autoPlay
              muted
              loop
              playsInline
              controls
              style={{ width: '100%', maxHeight: '520px', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <div style={{ position: 'relative' }}>
              <img
                src={current.heroImage}
                alt={current.name}
                style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          )}
        </div>

        {/* =========================================================================
            SERVICIOS INVOLUCRADOS
           ========================================================================= */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            alignItems: 'center',
            gap: '4rem',
            marginBottom: '10rem'
          }}
          className="projects-grid"
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-title)',
                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                lineHeight: '0.9',
                color: '#ffffff',
                marginBottom: '2rem',
                textTransform: 'uppercase'
              }}
            >
              {isEn ? (
                <>
                  SERVICES<br />INVOLVED
                </>
              ) : (
                <>
                  SERVICIOS<br />INVOLUCRADOS
                </>
              )}
            </h2>

            <p style={{ color: '#ffffff', fontSize: '1.15rem', lineHeight: '1.5', maxWidth: '520px', opacity: 0.9 }}>
              {isEn ? (current.servicesDescEn || current.servicesDesc) : current.servicesDesc}
            </p>
          </div>

          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-end' }}>
            {/* Dragon Graphic Behind Badges */}
            <img
              src="/assets/dragones/BenefitsDragon.svg"
              alt="Dragon"
              style={{
                position: 'absolute',
                top: '-40px',
                right: '-20px',
                width: '320px',
                opacity: 0.45,
                pointerEvents: 'none'
              }}
            />

            {(isEn ? (current.servicesBadgesEn || current.servicesBadges) : current.servicesBadges).map((badge, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(0, 0, 0, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '12px',
                  padding: '1.25rem 2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                <img
                  src="/assets/dragones/ala.svg"
                  alt="Ala"
                  style={{ width: '18px', height: '18px', filter: 'brightness(0) saturate(100%) invert(18%) sepia(88%) saturate(5453%) hue-rotate(334deg) brightness(94%) contrast(97%)' }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-title)',
                    fontSize: '1.15rem',
                    color: '#ffffff',
                    letterSpacing: '0.05em'
                  }}
                >
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            RESULTADO ESTRATEGICO
           ========================================================================= */}
        <div style={{ position: 'relative', textAlign: 'center', marginBottom: '8rem' }}>
          
          {/* Moss Rock Left */}
          <img
            src="/assets/rocas/RocaIzq.png"
            alt="Moss Rock Left"
            style={{
              position: 'absolute',
              top: '50%',
              left: '-80px',
              transform: 'translateY(-50%)',
              width: '300px',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />

          {/* Moss Rock Right */}
          <img
            src="/assets/rocas/RocaDer.png"
            alt="Moss Rock Right"
            style={{
              position: 'absolute',
              top: '50%',
              right: '-80px',
              transform: 'translateY(-50%)',
              width: '340px',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />

          <div style={{ maxWidth: '780px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <h2
              style={{
                fontFamily: 'var(--font-title)',
                fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)',
                lineHeight: '0.9',
                color: '#ffffff',
                marginBottom: '2.5rem',
                textTransform: 'uppercase'
              }}
            >
              {isEn ? (
                <>
                  STRATEGIC<br />OUTCOMES
                </>
              ) : (
                <>
                  RESULTADO<br />ESTRATEGICO
                </>
              )}
            </h2>

            <p style={{ color: '#ffffff', fontSize: '1.15rem', lineHeight: '1.6', opacity: 0.9 }}>
              {isEn ? (current.resultsTextEn || current.resultsText) : current.resultsText}
            </p>
          </div>
        </div>

        {/* =========================================================================
            CARDS ROW (Optimización, Validación, Segmentación)
           ========================================================================= */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '10rem'
          }}
        >
          {(isEn ? (current.cardsEn || current.cards) : current.cards).map((card, idx) => (
            <div
              key={idx}
              className="crimson-card"
              style={{
                padding: '2.5rem 1.75rem',
                minHeight: '260px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <img
                src="/assets/dragones/corona.svg"
                alt="Crown"
                style={{ width: '24px', height: '24px', marginBottom: '1.25rem', filter: 'brightness(0) invert(1)' }}
              />

              <h3
                style={{
                  fontFamily: 'var(--font-title)',
                  fontSize: '1.2rem',
                  color: '#ffffff',
                  marginBottom: '1.25rem',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}
              >
                {card.title}
              </h3>

              <div style={{ color: '#ffffff', fontSize: '0.92rem', lineHeight: '1.6', opacity: 0.9 }}>
                {card.desc}
              </div>
            </div>
          ))}
        </div>

        {/* =========================================================================
            BOTTOM BRAND DESCRIPTION WITH EMBLEM & MOSS ROCKS
           ========================================================================= */}
        <div style={{ position: 'relative', padding: '4rem 0', marginBottom: '4rem' }}>
          
          {/* Bottom Left Moss Rock */}
          <img
            src="/assets/rocas/RocaIzq.png"
            alt="Moss Rock Bottom Left"
            style={{
              position: 'absolute',
              bottom: '-40px',
              left: '-80px',
              width: '280px',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />

          {/* Bottom Right Moss Rock */}
          <img
            src="/assets/rocas/RocaDer.png"
            alt="Moss Rock Bottom Right"
            style={{
              position: 'absolute',
              bottom: '-40px',
              right: '-80px',
              width: '300px',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />

          <div
            style={{
              maxWidth: '820px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              gap: '3rem',
              position: 'relative',
              zIndex: 2
            }}
            className="brand-desc-row"
          >
            <div style={{ flexShrink: 0 }}>
              <img
                src={current.logo}
                alt={current.name}
                style={{ width: '90px', height: '90px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
              />
            </div>

            <div>
              <p style={{ color: '#ffffff', fontSize: '1.1rem', lineHeight: '1.6', fontWeight: '500' }}>
                {current.bottomDesc}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Diagnostic Form */}
      <DiagnosticForm />

      <style>{`
        .hover-crimson:hover {
          color: var(--crimson-magenta) !important;
        }
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
          }
          .brand-desc-row {
            flex-direction: column !important;
            text-align: center !important;
          }
        }
      `}</style>
    </main>
  );
}
