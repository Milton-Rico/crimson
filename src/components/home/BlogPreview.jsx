import React from 'react';
import { useTranslation } from 'react-i18next';

export default function BlogPreview() {
  const { i18n } = useTranslation();
  const isEn = (i18n.language || 'es').startsWith('en');

  return (
    <section
      id="blog"
      style={{
        background: '#000000',
        padding: '7rem 0 8rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}
      aria-label="Pensamiento Estratégico Crimson Studio"
    >
      <div className="container" style={{ maxWidth: '1100px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '4fr 6fr',
            alignItems: 'center',
            gap: '3.5rem'
          }}
          className="blog-grid"
        >
          {/* Left Title & Flor (40%) */}
          <div>
            <img
              src="/assets/dragones/Flor.svg"
              alt="Flor"
              style={{ width: '48px', height: '48px', marginBottom: '1.5rem', filter: 'brightness(0) invert(1)', opacity: 0.45 }}
            />

            <h2
              style={{
                fontFamily: 'var(--font-title)',
                fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
                lineHeight: '0.88',
                color: '#ffffff',
                letterSpacing: '0.01em'
              }}
            >
              {isEn ? (
                <>
                  Strategic<br />
                  Thinking<br />
                  & Growth
                </>
              ) : (
                <>
                  Pensamiento<br />
                  Estratégico<br />
                  & Growth
                </>
              )}
            </h2>
          </div>

          {/* Right Fan Image Container (60%) - Image fits edge-to-edge in the framed border */}
          <div
            style={{
              border: '1px solid var(--border-light)',
              borderRadius: '2px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#000000',
              overflow: 'hidden',
              padding: '0'
            }}
          >
            <img
              src="/assets/blog/BlogAbanico.png"
              alt="Pensamiento estratégico aplicado"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'cover'
              }}
            />

            {/* Overlaid Crown & Caption */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: '#ffffff',
                pointerEvents: 'none'
              }}
            >
              <img
                src="/assets/dragones/corona.svg"
                alt="Crown"
                style={{ width: '22px', height: '22px', marginBottom: '0.4rem', filter: 'brightness(0) invert(1)' }}
              />
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1rem, 1.8vw, 1.35rem)',
                  lineHeight: '1.15',
                  fontWeight: '500',
                  textShadow: '0 2px 12px rgba(0,0,0,0.95)'
                }}
              >
                {isEn ? (
                  <>
                    Applied<br />
                    strategic<br />
                    thinking
                  </>
                ) : (
                  <>
                    Pensamiento<br />
                    estratégico<br />
                    aplicado
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .blog-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
