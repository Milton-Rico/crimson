import React from 'react';

export default function Footer() {
  return (
    <footer
      id="footer-section"
      style={{
        background: '#000000',
        paddingTop: '11rem',
        paddingBottom: '8rem',
        position: 'relative',
        overflow: 'hidden'
      }}
      aria-label="Footer Crimson Studio"
    >
      {/* Centered Giant Dragon Background - Head and horns fully visible with black breathing room on top */}
      <div
        style={{
          position: 'absolute',
          top: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(460px, 46vw, 680px)',
          height: 'auto',
          opacity: 0.38,
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        <img
          src="/assets/dragones/FooterDragon.svg"
          alt="Dragon Outline"
          style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr 1.2fr',
            gap: '3rem',
            alignItems: 'center'
          }}
          className="footer-grid"
        >
          {/* Left Column: CRIMSON STUDIO + Dragon Logo */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-title)',
                fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
                lineHeight: '0.85',
                color: '#ffffff',
                textTransform: 'uppercase'
              }}
            >
              CRIMSON<br />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
                STUDIO
                <img
                  src="/assets/dragones/CrimsonDragonWhite.png"
                  alt="Crimson Dragon Logo"
                  style={{ height: '36px', width: 'auto', display: 'block' }}
                />
              </span>
            </div>
          </div>

          {/* Middle Column: Colombia & EEUU */}
          <div style={{ fontSize: '0.95rem', color: '#ffffff', lineHeight: '1.6' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontWeight: '600', marginBottom: '0.2rem' }}>Colombia</div>
              <div style={{ opacity: 0.85 }}>Armenia - Quindio</div>
              <div style={{ opacity: 0.85 }}>Medellin - Antioquia</div>
            </div>

            <div>
              <div style={{ fontWeight: '600', marginBottom: '0.2rem' }}>EEUU</div>
              <div style={{ opacity: 0.85 }}>Miami FL</div>
            </div>
          </div>

          {/* Right Column: Copyright, Credits & Contacts */}
          <div style={{ justifySelf: 'end', textAlign: 'right' }} className="footer-right">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#ffffff', fontSize: '0.95rem', marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '1.2rem', lineHeight: '1' }}>©</span>
              <span>2026 Copyright</span>
            </div>

            <div style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              Desarrollado por Crimson Studio
            </div>

            <div style={{ color: '#ffffff', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
              Contacts
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <a
                href="mailto:thecrimsonstudio.intro@gmail.com"
                style={{
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  textDecoration: 'underline',
                  wordBreak: 'break-all'
                }}
              >
                thecrimsonstudio.intro@gmail.com
              </a>
            </div>

            {/* Social Icons inside rounded rectangles */}
            <div style={{ display: 'inline-flex', gap: '0.6rem' }}>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '42px',
                  height: '32px',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent'
                }}
              >
                <img src="/assets/dragones/Linkedin logo.svg" alt="LinkedIn" style={{ width: '16px', height: '16px', filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
              </a>

              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '42px',
                  height: '32px',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent'
                }}
              >
                <img src="/assets/dragones/whatsapplogo.svg" alt="WhatsApp" style={{ width: '16px', height: '16px', filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '42px',
                  height: '32px',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent'
                }}
              >
                <img src="/assets/dragones/Instagramlogo.svg" alt="Instagram" style={{ width: '16px', height: '16px', filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .footer-right {
            justify-self: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </footer>
  );
}
