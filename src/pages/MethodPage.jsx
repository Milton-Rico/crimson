import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DiagnosticForm from '../components/DiagnosticForm';

gsap.registerPlugin(ScrollTrigger);

// Animated Timeline Component with sequential GSAP ScrollTrigger illumination
function AnimatedTimeline({ steps, align = 'right' }) {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const itemsRef = useRef([]);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Timeout ensures window.scrollTo(0,0) and ScrollTrigger.refresh() finished
    const timeout = setTimeout(() => {
      const line = lineRef.current;
      const items = itemsRef.current.filter(Boolean);
      if (!line || !container) return;

      // Initial state: line is scaleY 0, items are grey/dim
      gsap.set(line, { scaleY: 0, transformOrigin: 'top center' });
      items.forEach((item) => {
        const diamond = item.querySelector('.timeline-diamond');
        const text = item.querySelector('.timeline-text');
        const icon = item.querySelector('.timeline-icon');

        gsap.set(diamond, {
          borderColor: 'rgba(255, 255, 255, 0.22)',
          backgroundColor: '#050505',
          boxShadow: 'none'
        });
        gsap.set(text, { color: 'rgba(255, 255, 255, 0.45)' });
        gsap.set(icon, {
          filter: 'grayscale(1) brightness(0.4) opacity(0.5)',
          scale: 0.9
        });
      });

      // ScrollTrigger Timeline - triggers only when scrolling into view
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true
        }
      });

      // Animate line drawing down
      tl.to(line, {
        scaleY: 1,
        duration: 1.2,
        ease: 'power2.out'
      }, 0);

      // Stagger illuminate each diamond and text to crimson sequentially
      items.forEach((item, idx) => {
        const diamond = item.querySelector('.timeline-diamond');
        const text = item.querySelector('.timeline-text');
        const icon = item.querySelector('.timeline-icon');

        tl.to(
          diamond,
          {
            borderColor: '#e50a53',
            backgroundColor: '#000000',
            boxShadow: '0 0 16px rgba(229, 10, 83, 0.5), inset 0 0 8px rgba(229, 10, 83, 0.25)',
            duration: 0.35,
            ease: 'power1.out'
          },
          idx * 0.22
        );

        tl.to(
          icon,
          {
            filter: 'brightness(0) saturate(100%) invert(18%) sepia(88%) saturate(5453%) hue-rotate(334deg) brightness(94%) contrast(97%)',
            scale: 1,
            duration: 0.35,
            ease: 'back.out(1.5)'
          },
          idx * 0.22
        );

        tl.to(
          text,
          {
            color: '#ffffff',
            duration: 0.35,
            ease: 'power1.out'
          },
          idx * 0.22
        );
      });
    }, 70);

    return () => clearTimeout(timeout);
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: 'max-content',
        margin: align === 'right' ? '0 0 0 auto' : '0'
      }}
    >
      {/* Background Grey Guide Line */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          bottom: '20px',
          [align === 'right' ? 'right' : 'left']: '19px',
          width: '2px',
          background: 'rgba(255, 255, 255, 0.12)',
          zIndex: 1
        }}
      />

      {/* Animated Foreground Crimson Line */}
      <div
        ref={lineRef}
        style={{
          position: 'absolute',
          top: '20px',
          bottom: '20px',
          [align === 'right' ? 'right' : 'left']: '19px',
          width: '2px',
          background: 'var(--crimson-magenta)',
          zIndex: 2,
          boxShadow: '0 0 8px rgba(229, 10, 83, 0.6)'
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.1rem', position: 'relative', zIndex: 3 }}>
        {steps.map((step, idx) => {
          const isRight = align === 'right';
          return (
            <div
              key={idx}
              ref={(el) => (itemsRef.current[idx] = el)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.75rem',
                justifyContent: isRight ? 'flex-end' : 'flex-start'
              }}
            >
              {/* If aligned right: Text comes first on left, diamond on right */}
              {isRight && (
                <span
                  className="timeline-text"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'rgba(255, 255, 255, 0.45)',
                    fontSize: '1.15rem',
                    fontWeight: '400',
                    letterSpacing: '-0.01em',
                    whiteSpace: 'nowrap',
                    textAlign: 'right',
                    transition: 'color 0.3s ease'
                  }}
                >
                  {step.title}
                </span>
              )}

              {/* Diamond container (Always strictly aligned) */}
              <div
                className="timeline-diamond"
                style={{
                  width: '40px',
                  height: '40px',
                  border: '1.5px solid rgba(255, 255, 255, 0.22)',
                  transform: 'rotate(45deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#050505',
                  flexShrink: 0,
                  transition: 'all 0.3s ease'
                }}
              >
                <img
                  src={step.icon}
                  alt={step.title}
                  className="timeline-icon"
                  style={{
                    width: '18px',
                    height: '18px',
                    transform: 'rotate(-45deg)',
                    filter: 'grayscale(1) brightness(0.4)',
                    transition: 'all 0.3s ease'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              {/* If aligned left: Text comes second on right */}
              {!isRight && (
                <span
                  className="timeline-text"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'rgba(255, 255, 255, 0.45)',
                    fontSize: '1.15rem',
                    fontWeight: '400',
                    letterSpacing: '-0.01em',
                    whiteSpace: 'nowrap',
                    textAlign: 'left',
                    transition: 'color 0.3s ease'
                  }}
                >
                  {step.title}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function MethodPage() {
  const heroRef = useRef(null);
  const floatingRocksRef = useRef(null);

  useGSAP(() => {
    // Subtle breathing float on floating rocks in hero
    if (floatingRocksRef.current) {
      gsap.to(floatingRocksRef.current, {
        y: -10,
        x: 4,
        duration: 6,
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

  const features = [
    {
      title: 'CLARIDAD',
      desc: 'Sin claridad, todo se diluye. Definimos el núcleo estratégico de tu marca.'
    },
    {
      title: 'PRESENCIA',
      desc: 'Tu marca no compite solo con precio, compite con percepción. Construimos una presencia que genere confianza.'
    },
    {
      title: 'CONVERSION',
      desc: 'La atención sin estructura no sirve. Diseñamos activos que convierten.'
    },
    {
      title: 'CRECIMIENTO',
      desc: 'El crecimiento no es suerte, es iteración. Medimos, optimizamos y escalamos.'
    }
  ];

  return (
    <main
      style={{
        background: '#000000',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}
      aria-label="Metodología Crimson Studio"
    >
      {/* =========================================================================
          HERO SECTION (100% VH MATCHING 1. HERO.JPG)
         ========================================================================= */}
      <section
        id="method-hero"
        ref={heroRef}
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          paddingTop: '7rem',
          paddingBottom: '5rem',
          textAlign: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Full High-Resolution Floating Rocks Layer - 100% Opacity */}
        <img
          ref={floatingRocksRef}
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

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          
          {/* Authentic Crimson Dragon Icon */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <img
              src="/assets/dragones/CrimsonDragonNav.png"
              alt="Crimson Dragon Logo"
              style={{ height: '36px', width: 'auto', display: 'block' }}
            />
          </div>

          {/* Headline in Classic Quality */}
          <h1
            style={{
              fontFamily: 'var(--font-title)',
              fontSize: 'clamp(3.8rem, 7.5vw, 7.2rem)',
              lineHeight: '0.88',
              color: '#ffffff',
              marginBottom: '2.5rem',
              textTransform: 'none'
            }}
          >
            Crimson<br />Method
          </h1>

          {/* Outline CTA Button */}
          <div style={{ marginBottom: '3.5rem' }}>
            <button onClick={scrollToDiagnosis} className="btn-outline">
              AGENDA UN DIAGNÓSTICO
            </button>
          </div>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: '#ffffff',
              fontSize: 'clamp(1.15rem, 2vw, 1.4rem)',
              lineHeight: '1.35',
              maxWidth: '560px',
              margin: '0 auto'
            }}
          >
            No ejecutamos tareas. Construimos<br />
            arquitectura de crecimiento.
          </p>
        </div>
      </section>

      {/* =========================================================================
          2. FEATURES SECTION (MATCHING 2. FEATURES.JPG)
         ========================================================================= */}
      <section
        style={{
          padding: '7rem 0 11rem 0',
          position: 'relative',
          overflow: 'visible'
        }}
      >
        {/* Moss Rock Top Right */}
        <img
          src="/assets/rocas/RocaDer.png"
          alt="Moss Rock Top Right"
          style={{
            position: 'absolute',
            top: '-70px',
            right: '-40px',
            width: '280px',
            pointerEvents: 'none',
            zIndex: 3
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {features.map((item, idx) => (
              <div
                key={idx}
                className="crimson-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '3rem 1.75rem',
                  minHeight: '270px'
                }}
              >
                <img
                  src="/assets/dragones/corona.svg"
                  alt="Corona"
                  style={{ width: '28px', height: '28px', marginBottom: '1.5rem', filter: 'brightness(0) invert(1)' }}
                />

                <h3
                  style={{
                    fontFamily: 'var(--font-title)',
                    fontSize: '1.3rem',
                    color: '#ffffff',
                    marginBottom: '1.25rem',
                    letterSpacing: '0.04em',
                    lineHeight: '1.1'
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: '#ffffff',
                    fontSize: '0.98rem',
                    lineHeight: '1.45',
                    opacity: 0.9
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. PHASE 1: Growth STRATEGY (MATCHING 3. STRATEGY.JPG - NO ROCK)
         ========================================================================= */}
      <section
        style={{
          padding: '4rem 0 11rem 0',
          position: 'relative',
          overflow: 'visible'
        }}
      >
        <div className="container" style={{ maxWidth: '1080px', position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 1fr',
              gap: '3.5rem',
              alignItems: 'center'
            }}
            className="method-grid"
          >
            {/* Left: Title & Dragon */}
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-title)',
                  fontSize: 'clamp(3rem, 5.8vw, 5.2rem)',
                  lineHeight: '0.86',
                  color: '#ffffff',
                  marginBottom: '0.75rem'
                }}
              >
                Growth<br />STRATEGY
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  color: '#ffffff',
                  fontSize: '1.15rem',
                  fontStyle: 'italic',
                  marginBottom: '2.5rem',
                  opacity: 0.9
                }}
              >
                Definimos la base de todo.
              </p>

              <img
                src="/assets/dragones/BenefitsDragon.svg"
                alt="Strategy Dragon"
                style={{ width: '100%', maxWidth: '460px', height: 'auto', objectFit: 'contain', opacity: 0.4 }}
              />
            </div>

            {/* Right: Explanation & Animated Connected Diamond Timeline */}
            <div>
              <div style={{ marginBottom: '3.5rem', maxWidth: '380px', marginLeft: 'auto' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: '#ffffff',
                    fontSize: '1.3rem',
                    lineHeight: '1.3'
                  }}
                >
                  El Roadmap. Diagnóstico profundo y narrativa de poder.
                </p>
              </div>

              <AnimatedTimeline
                align="right"
                steps={[
                  { title: 'Diagnóstico', icon: '/assets/metodologia/Recurso 2.svg' },
                  { title: 'Posicionamiento', icon: '/assets/metodologia/Recurso 3.svg' },
                  { title: 'Propuesta de valor', icon: '/assets/metodologia/Recurso 4.svg' },
                  { title: 'Narrativa', icon: '/assets/metodologia/Recurso 5.svg' },
                  { title: 'Roadmap', icon: '/assets/metodologia/Recurso 6.svg' }
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. PHASE 2: Growth CONTENT (MATCHING 4. CONTENT.JPG)
         ========================================================================= */}
      <section
        style={{
          padding: '4rem 0 11rem 0',
          position: 'relative',
          overflow: 'visible'
        }}
      >
        {/* Moss Rock Right */}
        <img
          src="/assets/rocas/RocaDer.png"
          alt="Moss Rock Right"
          style={{
            position: 'absolute',
            top: '80px',
            right: '-60px',
            width: '320px',
            pointerEvents: 'none',
            zIndex: 3
          }}
        />

        <div className="container" style={{ maxWidth: '1080px', position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.1fr',
              gap: '3.5rem',
              alignItems: 'center'
            }}
            className="method-grid"
          >
            {/* Left: Title & Connected Diamond Timeline */}
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-title)',
                  fontSize: 'clamp(3rem, 5.8vw, 5.2rem)',
                  lineHeight: '0.86',
                  color: '#ffffff',
                  marginBottom: '0.75rem'
                }}
              >
                Growth<br />CONTENT
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  color: '#ffffff',
                  fontSize: '1.15rem',
                  fontStyle: 'italic',
                  marginBottom: '3rem',
                  opacity: 0.9
                }}
              >
                Construimos presencia y autoridad.
              </p>

              <AnimatedTimeline
                align="left"
                steps={[
                  { title: 'Producción de contenido', icon: '/assets/metodologia/Recurso 7.svg' },
                  { title: 'Grabación', icon: '/assets/metodologia/Recurso 8.svg' },
                  { title: 'Fotografía', icon: '/assets/metodologia/Recurso 9.svg' },
                  { title: 'Dirección creativa', icon: '/assets/metodologia/Recurso 10.svg' },
                  { title: 'Creativos', icon: '/assets/metodologia/Recurso 11.svg' }
                ]}
              />
            </div>

            {/* Right: Description & Dragon */}
            <div style={{ textAlign: 'right' }}>
              <div style={{ marginBottom: '3.5rem', maxWidth: '380px', marginLeft: 'auto' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: '#ffffff',
                    fontSize: '1.3rem',
                    lineHeight: '1.3'
                  }}
                >
                  Autoridad visual. Contenido que educa y eleva el estatus de la marca.
                </p>
              </div>

              <img
                src="/assets/dragones/GrowthSystemDragon.svg"
                alt="Content Dragon"
                style={{ width: '100%', maxWidth: '460px', height: 'auto', objectFit: 'contain', opacity: 0.4 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. PHASE 3: Growth ASSETS (MATCHING 5. ASSETS.JPG)
         ========================================================================= */}
      <section
        style={{
          padding: '4rem 0 11rem 0',
          position: 'relative',
          overflow: 'visible'
        }}
      >
        {/* Moss Rock Left */}
        <img
          src="/assets/rocas/RocaIzq.png"
          alt="Moss Rock Left"
          style={{
            position: 'absolute',
            top: '80px',
            left: '-70px',
            width: '320px',
            pointerEvents: 'none',
            zIndex: 3
          }}
        />

        <div className="container" style={{ maxWidth: '1080px', position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 1fr',
              gap: '3.5rem',
              alignItems: 'center'
            }}
            className="method-grid"
          >
            {/* Left: Title & Dragon */}
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-title)',
                  fontSize: 'clamp(3rem, 5.8vw, 5.2rem)',
                  lineHeight: '0.86',
                  color: '#ffffff',
                  marginBottom: '0.75rem'
                }}
              >
                Growth<br />ASSETS
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  color: '#ffffff',
                  fontSize: '1.15rem',
                  fontStyle: 'italic',
                  marginBottom: '2.5rem',
                  opacity: 0.9
                }}
              >
                Creamos la infraestructura digital.
              </p>

              <img
                src="/assets/dragones/BenefitsDragon.svg"
                alt="Assets Dragon"
                style={{ width: '100%', maxWidth: '460px', height: 'auto', objectFit: 'contain', opacity: 0.4 }}
              />
            </div>

            {/* Right: Explanation & Timeline */}
            <div>
              <div style={{ marginBottom: '3.5rem', maxWidth: '380px', marginLeft: 'auto' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: '#ffffff',
                    fontSize: '1.3rem',
                    lineHeight: '1.3'
                  }}
                >
                  Infraestructura de conversión. Desarrollo de ecosistemas digitales que venden.
                </p>
              </div>

              <AnimatedTimeline
                align="right"
                steps={[
                  { title: 'Desarrollo web', icon: '/assets/metodologia/Recurso 12.svg' },
                  { title: 'Landing pages', icon: '/assets/metodologia/Recurso 13.svg' },
                  { title: 'Copy', icon: '/assets/metodologia/Recurso 14.svg' },
                  { title: 'SEO base', icon: '/assets/metodologia/Recurso 15.svg' },
                  { title: 'Estructura de conversión', icon: '/assets/metodologia/Recurso 16.svg' }
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. PHASE 4: Growth OPERATIONS (MATCHING 6. OPERATIONS.JPG)
         ========================================================================= */}
      <section
        style={{
          padding: '4rem 0 11rem 0',
          position: 'relative',
          overflow: 'visible'
        }}
      >
        {/* Moss Rock Right */}
        <img
          src="/assets/rocas/RocaDer.png"
          alt="Moss Rock Right"
          style={{
            position: 'absolute',
            top: '80px',
            right: '-60px',
            width: '320px',
            pointerEvents: 'none',
            zIndex: 3
          }}
        />

        <div className="container" style={{ maxWidth: '1080px', position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.1fr',
              gap: '3.5rem',
              alignItems: 'center'
            }}
            className="method-grid"
          >
            {/* Left: Title & Connected Diamond Timeline */}
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-title)',
                  fontSize: 'clamp(3rem, 5.8vw, 5.2rem)',
                  lineHeight: '0.86',
                  color: '#ffffff',
                  marginBottom: '0.75rem'
                }}
              >
                Growth<br />OPERATIONS
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  color: '#ffffff',
                  fontSize: '1.15rem',
                  fontStyle: 'italic',
                  marginBottom: '3rem',
                  opacity: 0.9
                }}
              >
                Activamos y optimizamos el sistema.
              </p>

              <AnimatedTimeline
                align="left"
                steps={[
                  { title: 'Campañas', icon: '/assets/metodologia/Recurso 17.svg' },
                  { title: 'Pauta', icon: '/assets/metodologia/Recurso 18.svg' },
                  { title: 'Análisis', icon: '/assets/metodologia/Recurso 19.svg' },
                  { title: 'Optimización', icon: '/assets/metodologia/Recurso 20.svg' },
                  { title: 'Seguimiento', icon: '/assets/metodologia/Recurso 2.svg' }
                ]}
              />
            </div>

            {/* Right: Description & Dragon */}
            <div style={{ textAlign: 'right' }}>
              <div style={{ marginBottom: '3.5rem', maxWidth: '380px', marginLeft: 'auto' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: '#ffffff',
                    fontSize: '1.3rem',
                    lineHeight: '1.3'
                  }}
                >
                  El motor de escala. Gestión de pauta y optimización constante del embudo.
                </p>
              </div>

              <img
                src="/assets/dragones/FooterDragon.svg"
                alt="Operations Dragon"
                style={{ width: '100%', maxWidth: '460px', height: 'auto', objectFit: 'contain', opacity: 0.4 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          DIAGNOSTIC FORM
         ========================================================================= */}
      <DiagnosticForm />

      <style>{`
        @media (max-width: 900px) {
          .method-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            gap: 3rem !important;
          }
          .method-grid div {
            justify-content: center !important;
            text-align: center !important;
            margin: 0 auto !important;
          }
        }
      `}</style>
    </main>
  );
}
