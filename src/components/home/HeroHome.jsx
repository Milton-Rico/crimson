import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function HeroHome() {
  const heroRef = useRef(null);
  const rockRef = useRef(null);
  const floatingRocksRef = useRef(null);

  useGSAP(() => {
    // Gentle floating physics on main rock, preserving the left displacement
    if (rockRef.current) {
      gsap.to(rockRef.current, {
        y: -12,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    // Subtle breathing/floating on the floating rocks overlay
    if (floatingRocksRef.current) {
      gsap.to(floatingRocksRef.current, {
        y: -8,
        x: 4,
        duration: 5.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }, { scope: heroRef });

  const scrollToDiagnosis = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const target = document.getElementById('diagnostico');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        minHeight: '100vh',
        background: '#000000',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '14.5rem',
        paddingBottom: '8rem',
        overflow: 'hidden'
      }}
      aria-label="Crimson Studio Hero"
    >
      {/* Single Large Floating Rocks Asset Layer - 100% Opacity and full resolution */}
      <img
        ref={floatingRocksRef}
        src="/assets/rocas/Rocas flotando.png"
        alt="Rocas flotando en el espacio de Crimson Studio"
        style={{
          position: 'absolute',
          top: '2%',
          left: '0',
          width: '100%',
          height: '96%',
          objectFit: 'contain',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 1
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        
        {/* Top Grid: CRIMSON STUDIO Title & Right Text/CTA with high z-index */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
            gap: '1.25rem',
            marginBottom: '0',
            position: 'relative',
            zIndex: 20
          }}
          className="hero-grid"
        >
          {/* Left Title: CRIMSON STUDIO */}
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-title)',
                fontSize: 'clamp(3.6rem, 6.8vw, 6.8rem)',
                lineHeight: '0.88',
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.01em'
              }}
            >
              CRIMSON<br />STUDIO
            </h1>
          </div>

          {/* Right Text & Button - Aligned to the left of its container */}
          <div style={{ maxWidth: '540px', justifySelf: 'start', textAlign: 'left', position: 'relative', zIndex: 25 }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1.25rem, 2vw, 1.65rem)',
                lineHeight: '1.2',
                color: '#ffffff',
                marginBottom: '1.75rem',
                fontWeight: '400',
                letterSpacing: '-0.01em'
              }}
            >
              Integramos estrategia, contenido, activos digitales y performance para convertir tu presencia en resultados.
            </p>

            <button
              onClick={scrollToDiagnosis}
              className="btn-outline"
              style={{ position: 'relative', zIndex: 30, cursor: 'pointer' }}
            >
              AGENDA UN DIAGNÓSTICO
            </button>
          </div>
        </div>

        {/* Central Main Moss Rock (Roca2.png) - Attached closely right under the H1 title with pointerEvents: none */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 2,
            marginTop: '-4.5rem',
            pointerEvents: 'none'
          }}
        >
          <img
            ref={rockRef}
            src="/assets/rocas/Roca2.png"
            alt="Roca con musgo principal de Crimson Studio"
            style={{
              width: '100%',
              maxWidth: '960px',
              height: 'auto',
              objectFit: 'contain',
              transform: 'translateX(-45px)',
              filter: 'drop-shadow(0 25px 60px rgba(0, 0, 0, 0.98))',
              pointerEvents: 'none'
            }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            gap: 2rem !important;
          }
          .hero-grid div {
            justify-self: center !important;
            text-align: center !important;
          }
          .hero-grid img, [ref="rockRef"] {
            transform: translateX(0) !important;
            margin-top: -1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
