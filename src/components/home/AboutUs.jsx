import React from 'react';
import { useTranslation } from 'react-i18next';

export default function AboutUs() {
  const { i18n } = useTranslation();
  const isEn = (i18n.language || 'es').startsWith('en');

  return (
    <section
      id="about"
      style={{
        background: '#000000',
        padding: '7rem 0 9rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}
      aria-label="Sobre Crimson Studio"
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Main Editorial Headline with lineHeight 0.8 */}
        <div style={{ textAlign: 'center', marginBottom: '5.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-title)',
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
              lineHeight: '0.8',
              color: '#ffffff',
              letterSpacing: '0.01em'
            }}
          >
            {isEn ? (
              <>
                <span className="text-magenta">We work</span> with brands<br />
                seeking <span className="text-magenta">structure,</span><br />
                not just <span className="text-magenta">visibility.</span>
              </>
            ) : (
              <>
                <span className="text-magenta">Trabajamos</span> con marcas<br />
                que buscan <span className="text-magenta">estructura,</span><br />
                no solo <span className="text-magenta">visibilidad.</span>
              </>
            )}
          </h2>
        </div>

        {/* 3 Pillars / Columns with large icons, fontSize 1.5rem and lineHeight 1 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3.5rem',
            maxWidth: '1140px',
            margin: '0 auto',
            textAlign: 'center'
          }}
        >
          {/* Column 1: Corona */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <img
              src="/assets/dragones/corona.svg"
              alt="Corona"
              style={{ width: '44px', height: '44px', filter: 'brightness(0) invert(1)' }}
            />
            <p
              style={{
                fontFamily: 'var(--font-body)',
                color: '#ffffff',
                fontSize: '1.5rem',
                lineHeight: '1',
                fontWeight: '400',
                maxWidth: '340px'
              }}
            >
              {isEn
                ? 'You have a validated business that does not look as professional as it truly is.'
                : 'Tienes un negocio validado que no se ve tan profesional como realmente es.'}
            </p>
          </div>

          {/* Column 2: Copa */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <img
              src="/assets/dragones/Recurso 2.svg"
              alt="Copa"
              style={{ width: '38px', height: '38px', filter: 'brightness(0) invert(1)' }}
            />
            <p
              style={{
                fontFamily: 'var(--font-body)',
                color: '#ffffff',
                fontSize: '1.5rem',
                lineHeight: '1',
                fontWeight: '400',
                maxWidth: '340px'
              }}
            >
              {isEn
                ? 'You are a personal brand that needs a system that works without depending on your time 24/7.'
                : 'Eres una marca personal que necesita un sistema que trabaje sin depender de tu tiempo 24/7.'}
            </p>
          </div>

          {/* Column 3: Ala */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <img
              src="/assets/dragones/ala.svg"
              alt="Ala"
              style={{ width: '40px', height: '40px', filter: 'brightness(0) invert(1)' }}
            />
            <p
              style={{
                fontFamily: 'var(--font-body)',
                color: '#ffffff',
                fontSize: '1.5rem',
                lineHeight: '1',
                fontWeight: '400',
                maxWidth: '340px'
              }}
            >
              {isEn
                ? 'You seek a team that thinks about your business, not just about "making content pieces".'
                : 'Buscas un equipo que piense en tu negocio, no solo en "hacer piezas".'}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
