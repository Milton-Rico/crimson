import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Benefits() {
  const { i18n } = useTranslation();
  const isEn = (i18n.language || 'es').startsWith('en');

  const cards = isEn
    ? [
        {
          title: 'ELITE PERCEPTION',
          desc: 'Your brand shifts from being just an option to becoming the category reference.'
        },
        {
          title: 'SALES ASSETS',
          desc: 'Your website and content qualify and persuade prospects before the first call.'
        },
        {
          title: 'QUALIFIED LEADS',
          desc: 'Less volume noise, dramatically higher purchase intent and deal size.'
        },
        {
          title: 'OPERATIONAL CLARITY',
          desc: 'You know exactly what you are measuring, optimizing, and why.'
        }
      ]
    : [
        {
          title: 'PERCEPCION DE ELITE',
          desc: 'Tu marca pasa de ser una opción a ser la referencia.'
        },
        {
          title: 'ACTIVOS DE VENTA',
          desc: 'Tu web y contenido filtran y convencen antes de la primera llamada.'
        },
        {
          title: 'LEADS CALIFICADOS',
          desc: 'Menos cantidad, mayor intención de compra.'
        },
        {
          title: 'CLARIDAD OPERATIVA',
          desc: 'Sabes exactamente qué estás midiendo y por qué.'
        }
      ];

  return (
    <section
      id="benefits"
      style={{
        background: '#000000',
        padding: '7rem 0 10rem 0',
        position: 'relative',
        overflow: 'visible'
      }}
      aria-label="Beneficios Crimson Studio"
    >
      {/* Top Right Moss Rock */}
      <img
        src="/assets/rocas/RocaDer.png"
        alt="Moss Rock Top Right"
        style={{
          position: 'absolute',
          top: '-80px',
          right: '0',
          width: '300px',
          maxWidth: 'none',
          pointerEvents: 'none',
          zIndex: 3
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Top Grid: Title with Large Flowers on Left, Dragon inside Grid on Right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.05fr 1.15fr',
            alignItems: 'center',
            gap: '2.5rem',
            marginBottom: '8.5rem',
            position: 'relative'
          }}
          className="benefits-top-grid"
        >
          {/* Left: Title with Large Floating Flowers (Lowered Opacity) */}
          <div style={{ position: 'relative' }}>
            
            {/* Top Large Floating Flower */}
            <img
              src="/assets/dragones/Flor.svg"
              alt="Flor decorativa"
              style={{
                position: 'absolute',
                top: '-75px',
                left: '10px',
                width: '95px',
                height: '95px',
                opacity: 0.45,
                pointerEvents: 'none'
              }}
            />

            {/* Title in natural mixed-case */}
            <h2
              style={{
                fontFamily: 'var(--font-title)',
                fontSize: 'clamp(2.8rem, 5.2vw, 4.5rem)',
                lineHeight: '0.94',
                color: '#ffffff',
                letterSpacing: '0.01em',
                fontWeight: 'normal'
              }}
            >
              {isEn ? (
                <>
                  We stop<br />
                  chasing<br />
                  algorithms<br />
                  to dominate<br />
                  categories.
                </>
              ) : (
                <>
                  Dejamos de<br />
                  perseguir<br />
                  algoritmos<br />
                  para dominar<br />
                  categorias.
                </>
              )}
            </h2>

            {/* Bottom Large Floating Flower */}
            <img
              src="/assets/dragones/Flor.svg"
              alt="Flor decorativa"
              style={{
                position: 'absolute',
                bottom: '-70px',
                left: '230px',
                width: '80px',
                height: '80px',
                opacity: 0.4,
                pointerEvents: 'none'
              }}
            />
          </div>

          {/* Right: Dragon contained within Grid on Desktop with lowered subtle opacity */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="benefits-dragon-wrapper">
            <img
              src="/assets/dragones/BenefitsDragon.svg"
              alt="Benefits Dragon"
              style={{
                width: '100%',
                maxWidth: '480px',
                height: 'auto',
                objectFit: 'contain',
                pointerEvents: 'none',
                opacity: 0.45
              }}
            />
          </div>
        </div>

        {/* Bottom 4 Cards Row - With Corona (Crown) Emblem */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            position: 'relative',
            zIndex: 2
          }}
        >
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="crimson-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '3rem 1.75rem',
                minHeight: '270px',
                justifyContent: 'flex-start'
              }}
            >
              {/* Corona (Crown) Emblem */}
              <img
                src="/assets/dragones/corona.svg"
                alt="Corona"
                style={{ width: '30px', height: '30px', marginBottom: '1.5rem', filter: 'brightness(0) invert(1)' }}
              />

              <h3
                style={{
                  fontFamily: 'var(--font-title)',
                  fontSize: '1.3rem',
                  color: '#ffffff',
                  marginBottom: '1rem',
                  lineHeight: '1.1',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}
              >
                {card.title}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  color: '#ffffff',
                  fontSize: '0.98rem',
                  lineHeight: '1.4',
                  opacity: 0.9
                }}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .benefits-top-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            margin-bottom: 5rem !important;
          }
          .benefits-dragon-wrapper {
            position: absolute !important;
            top: 50% !important;
            right: 0 !important;
            transform: translateY(-50%) !important;
            opacity: 0.25 !important;
            z-index: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
