import React from 'react';

export default function MarqueeBanner() {
  return (
    <section
      style={{
        background: '#000000',
        padding: '5.5rem 0',
        position: 'relative',
        overflow: 'visible'
      }}
      aria-label="Crimson Banner"
    >
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', minHeight: '160px', overflow: 'visible' }}>
        
        {/* Left Moss Rock - Large, Uncropped, and naturally overlapping */}
        <img
          src="/assets/rocas/RocaIzq.png"
          alt="Roca con musgo izquierda"
          style={{
            position: 'absolute',
            left: '-60px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '440px',
            maxWidth: 'none',
            zIndex: 15,
            pointerEvents: 'none',
            filter: 'drop-shadow(0 6px 15px rgba(0, 0, 0, 0.45))'
          }}
        />

        {/* Magenta Fluid Wave Banner Bar */}
        <div
          style={{
            width: '100%',
            background: 'url(/assets/dragones/Banner.svg) center/cover no-repeat, var(--crimson-magenta)',
            padding: '2.75rem 2rem 2.75rem 280px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 5
          }}
          className="banner-bar"
        >
          <div
            style={{
              maxWidth: '920px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2.5rem'
            }}
            className="banner-inner"
          >
            {/* Left Serif Text */}
            <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
              <div
                style={{
                  fontFamily: 'var(--font-title)',
                  fontSize: 'clamp(1.85rem, 3.2vw, 2.7rem)',
                  lineHeight: '0.95',
                  color: '#ffffff'
                }}
              >
                No ejecutamos<br />Marketing.
              </div>
            </div>

            {/* Vertical White Divider */}
            <div
              style={{
                width: '1.5px',
                height: '60px',
                background: '#ffffff',
                opacity: 0.8
              }}
              className="banner-divider"
            />

            {/* Right Body Text */}
            <div style={{ maxWidth: '440px' }}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  color: '#ffffff',
                  fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
                  lineHeight: '1.3',
                  fontWeight: '400'
                }}
              >
                Construimos un sistema que conecta tu marca, tu comunicación y tu peración digital con resultados reales.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .banner-bar {
            padding: 2rem 1.5rem !important;
          }
          .banner-inner {
            flex-direction: column !important;
            text-align: center !important;
            gap: 1rem !important;
          }
          .banner-divider {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
