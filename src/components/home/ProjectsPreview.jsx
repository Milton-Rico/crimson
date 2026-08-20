import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function ProjectsPreview() {
  const { i18n } = useTranslation();
  const isEn = (i18n.language || 'es').startsWith('en');
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  const baseLogos = [
    { src: '/assets/logos/Recurso 10.svg', alt: 'Client Logo' },
    { src: '/assets/logos/Recurso 9.svg', alt: 'El de las Carnes' },
    { src: '/assets/logos/Birdtur.svg', alt: 'Birdtur' },
    { src: '/assets/logos/Recurso 7.svg', alt: 'Client Logo' },
    { src: '/assets/logos/Recurso 6.svg', alt: 'Client Logo' },
    { src: '/assets/logos/Recurso 5.svg', alt: 'Client Logo' },
    { src: '/assets/logos/Recurso 4.svg', alt: 'Client Logo' },
    { src: '/assets/logos/Recurso 3.svg', alt: 'Client Logo' },
    { src: '/assets/logos/Berrinche.svg', alt: 'Berrinche' },
    { src: '/assets/logos/Boticasol.svg', alt: 'Boticasol' },
    { src: '/assets/logos/Alma.svg', alt: 'Alma' },
    { src: '/assets/logos/Ozzies.png', alt: 'Ozzies' }
  ];

  // Duplicate logos array to make a seamless infinite marquee
  const logos = [...baseLogos, ...baseLogos];

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    // Linear infinite smooth marquee loop at constant velocity
    const totalWidth = track.scrollWidth / 2;
    const tween = gsap.to(track, {
      x: -totalWidth,
      duration: 32,
      ease: 'none',
      repeat: -1
    });
    tweenRef.current = tween;
  }, { scope: containerRef });

  return (
    <section
      id="projects-preview"
      ref={containerRef}
      style={{
        background: '#000000',
        padding: '8rem 0 7rem 0',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center'
      }}
      aria-label="Casos de Éxito Crimson Studio"
    >
      {/* Single Large Floating Rocks Asset Layer - 100% Opacity and full resolution */}
      <img
        src="/assets/rocas/Rocas flotando.png"
        alt="Rocas flotando"
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 1
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Tower Emblem */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <img
            src="/assets/dragones/Torre.svg"
            alt="Torre"
            style={{ width: '44px', height: '44px', filter: 'brightness(0) invert(1)', opacity: 0.9 }}
          />
        </div>

        {/* Title: CASOS CRIMSON STUDIO with CRIMSON in crimson color */}
        <h2
          style={{
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(3.2rem, 6.5vw, 5.8rem)',
            lineHeight: '0.88',
            color: '#ffffff',
            textTransform: 'uppercase',
            marginBottom: '2.5rem'
          }}
        >
          CASOS<br />
          <span style={{ color: 'var(--crimson-magenta)' }}>CRIMSON</span><br />
          STUDIO
        </h2>

        {/* Solid Red CTA Button */}
        <div style={{ marginBottom: '5.5rem' }}>
          <Link
            to="/proyectos"
            className="btn-solid-crimson"
            style={{
              padding: '0.75rem 2.25rem',
              fontSize: '1rem',
              fontWeight: '600',
              letterSpacing: '0.04em'
            }}
          >
            {isEn ? 'Explore Case Studies' : 'Conocer Casos'}
          </Link>
        </div>
      </div>

      {/* Horizontal GSAP Marquee Track with pause on hover */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 2,
          padding: '1rem 0'
        }}
        onMouseEnter={() => tweenRef.current && tweenRef.current.pause()}
        onMouseLeave={() => tweenRef.current && tweenRef.current.play()}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '1.5rem',
            width: 'max-content',
            willChange: 'transform'
          }}
        >
          {logos.map((logo, idx) => (
            <Link
              key={idx}
              to="/proyectos"
              style={{
                width: '90px',
                height: '90px',
                background: '#000000',
                border: '1px solid var(--border-light)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.85rem',
                flexShrink: 0,
                transition: 'border-color 0.2s ease, transform 0.2s ease',
                cursor: 'pointer'
              }}
              className="logo-card-hover"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)'
                }}
              />
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .logo-card-hover:hover {
          border-color: var(--crimson-magenta) !important;
          transform: translateY(-3px);
        }
      `}</style>
    </section>
  );
}
