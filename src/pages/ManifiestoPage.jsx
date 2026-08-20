import React from 'react';

export default function ManifiestoPage() {
  return (
    <main
      style={{
        background: '#000000',
        minHeight: '100vh',
        paddingTop: '9rem',
        paddingBottom: '8rem',
        position: 'relative'
      }}
    >
      <div className="container" style={{ maxWidth: '880px', textAlign: 'center' }}>
        
        {/* Title */}
        <h1
          style={{
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(3.5rem, 6.5vw, 6rem)',
            lineHeight: '0.9',
            color: '#ffffff',
            marginBottom: '4.5rem',
            textTransform: 'none'
          }}
        >
          Crimson<br />Manifiesto
        </h1>

        {/* Manifesto Paragraph */}
        <div style={{ maxWidth: '640px', margin: '0 auto 8rem auto' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
              lineHeight: '1.35',
              color: '#ffffff',
              fontWeight: '400',
              letterSpacing: '-0.01em'
            }}
          >
            Estamos aqui para organizar somos eficientes, puntuales y en mejora constante creamos sistemas y marcas capaces de enfrentarse a un sistema digital agresivo y en constante crecimiento, creamos sistemas en constante optimizacion nos gustan los retos y nos sentimos completamente preparados para tomarlos crimson es el sistema que parte no solo del orden si no desde la eficiencia y la optimizacion de procesos para que todo trabaje para ti y no en tu contra
          </p>
        </div>

        {/* Aliados Estrategicos Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr 1fr',
            alignItems: 'center',
            gap: '2rem',
            textAlign: 'left',
            paddingTop: '3rem'
          }}
          className="aliados-grid"
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-title)',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                lineHeight: '0.92',
                color: '#ffffff',
                textTransform: 'uppercase'
              }}
            >
              ALIADOS<br />ESTRATEGICOS
            </h2>
          </div>

          <div
            style={{
              color: '#ffffff',
              fontFamily: 'var(--font-body)',
              fontSize: '1.15rem',
              fontWeight: '600',
              letterSpacing: '0.05em'
            }}
          >
            WEBSITES
          </div>

          <div
            style={{
              color: '#ffffff',
              fontFamily: 'var(--font-body)',
              fontSize: '1.15rem',
              fontWeight: '600',
              letterSpacing: '0.05em'
            }}
          >
            MIAMI PRINT<br />AND SING
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .aliados-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
          }
        }
      `}</style>
    </main>
  );
}
