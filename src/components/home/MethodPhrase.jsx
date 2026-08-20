import React from 'react';

export default function MethodPhrase() {
  return (
    <section
      id="metodo-frase"
      style={{
        background: '#000000',
        padding: '9rem 0',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center'
      }}
      aria-label="Frase Método Crimson"
    >
      <div className="container" style={{ maxWidth: '840px', position: 'relative', zIndex: 2 }}>
        
        {/* Double Wings Stylized as Quotation Marks (Upright, without rotation) */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginBottom: '2.5rem' }}>
          <img
            src="/assets/dragones/ala.svg"
            alt="Quote left"
            style={{ width: '28px', height: '28px', filter: 'brightness(0) invert(1)' }}
          />
          <img
            src="/assets/dragones/ala.svg"
            alt="Quote right"
            style={{ width: '28px', height: '28px', filter: 'brightness(0) invert(1)' }}
          />
        </div>

        {/* Headline Quote */}
        <h2
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.4rem, 2.5vw, 2.05rem)',
            lineHeight: '1.4',
            color: '#ffffff',
            fontWeight: '400',
            letterSpacing: '-0.01em'
          }}
        >
          La mayoría de las marcas hoy publican, invierten en pauta o hacen cambios aislados... pero no tienen una base clara que conecte todo eso con resultados.— <span style={{ fontWeight: '600' }}>Método Crimson</span>
        </h2>
      </div>
    </section>
  );
}
