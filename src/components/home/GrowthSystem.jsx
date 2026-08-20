import React from 'react';
import { useTranslation } from 'react-i18next';

export default function GrowthSystem() {
  const { i18n } = useTranslation();
  const isEn = (i18n.language || 'es').startsWith('en');

  return (
    <section
      id="growth-system"
      style={{
        background: '#000000',
        padding: '9rem 0 11rem 0',
        position: 'relative',
        overflow: 'visible'
      }}
      aria-label="Growth System Crimson"
    >
      {/* Top Left Moss Rock - Roca2Izq.png (Uncropped) */}
      <img
        src="/assets/rocas/Roca2Izq.png"
        alt="Moss Rock Top Left"
        style={{
          position: 'absolute',
          top: '-140px',
          left: '-80px',
          width: '380px',
          maxWidth: 'none',
          pointerEvents: 'none',
          zIndex: 3
        }}
      />

      {/* Bottom Right Moss Rock - Roca2Der.png (Uncropped) */}
      <img
        src="/assets/rocas/Roca2Der.png"
        alt="Moss Rock Bottom Right"
        style={{
          position: 'absolute',
          bottom: '-140px',
          right: '-80px',
          width: '400px',
          maxWidth: 'none',
          pointerEvents: 'none',
          zIndex: 3
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            alignItems: 'center',
            gap: '3rem'
          }}
          className="growth-grid"
        >
          {/* Left: Giant Dragon inside Grid for Desktop */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="growth-dragon-wrapper">
            <img
              src="/assets/dragones/GrowthSystemDragon.svg"
              alt="Growth System Dragon"
              style={{
                width: '100%',
                maxWidth: '520px',
                height: 'auto',
                objectFit: 'contain',
                pointerEvents: 'none',
                opacity: 0.45
              }}
            />
          </div>

          {/* Right: Text & Title */}
          <div>
            <div
              style={{
                color: 'var(--crimson-magenta)',
                fontSize: '0.95rem',
                fontWeight: '600',
                letterSpacing: '0.12em',
                marginBottom: '0.25rem',
                textTransform: 'uppercase'
              }}
            >
              CRIMSONSTUDIO
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-title)',
                fontSize: 'clamp(3.5rem, 6.5vw, 6.2rem)',
                lineHeight: '0.85',
                color: 'var(--crimson-magenta)',
                marginBottom: '2.5rem',
                textTransform: 'uppercase'
              }}
            >
              Growth<br />SYSTEM
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                color: '#ffffff',
                fontSize: '1.2rem',
                lineHeight: '1.45',
                marginBottom: '1.5rem',
                maxWidth: '480px'
              }}
            >
              {isEn
                ? 'Most strategies fail because they work isolated channels, not complete systems.'
                : 'La mayoría de estrategias fallan porque trabajan canales, no sistemas.'}
            </p>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                color: '#ffffff',
                fontSize: '1.2rem',
                lineHeight: '1.45',
                marginBottom: '2.5rem',
                maxWidth: '480px'
              }}
            >
              {isEn ? (
                <>
                  Our <span className="highlight-badge">framework</span> connects every part of the process to generate predictable results.
                </>
              ) : (
                <>
                  Nuestro <span className="highlight-badge">enfoque</span> conecta cada parte del proceso para generar resultados reales.
                </>
              )}
            </p>

            <div>
              <button
                onClick={() => {
                  const target = document.getElementById('diagnostico');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn-outline"
                style={{ padding: '0.75rem 2rem' }}
              >
                CRIMSONSTUDIO
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .growth-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .growth-dragon-wrapper {
            position: absolute !important;
            top: 50% !important;
            left: 0 !important;
            transform: translateY(-50%) !important;
            opacity: 0.3 !important;
            z-index: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
