import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
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

    const line = lineRef.current;
    const items = itemsRef.current.filter(Boolean);
    if (!line) return;

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

    // ScrollTrigger Timeline - triggers naturally on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    // Animate line drawing down
    tl.to(line, {
      scaleY: 1,
      duration: 1,
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
          duration: 0.3,
          ease: 'power1.out'
        },
        idx * 0.18
      );

      tl.to(
        icon,
        {
          filter: 'brightness(0) saturate(100%) invert(18%) sepia(88%) saturate(5453%) hue-rotate(334deg) brightness(94%) contrast(97%)',
          scale: 1,
          duration: 0.3,
          ease: 'back.out(1.5)'
        },
        idx * 0.18
      );

      tl.to(
        text,
        {
          color: '#ffffff',
          duration: 0.3,
          ease: 'power1.out'
        },
        idx * 0.18
      );
    });
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
                justifyContent: isRight ? 'flex-end' : 'flex-start',
                flexDirection: isRight ? 'row' : 'row'
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
  const { i18n } = useTranslation();
  const isEn = (i18n.language || 'es').startsWith('en');

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

  const features = isEn
    ? [
        {
          title: 'CLARITY',
          desc: 'Without clarity, everything dilutes. We define the strategic core of your brand.'
        },
        {
          title: 'PRESENCE',
          desc: 'Your brand does not just compete on price; it competes on perception. We build presence that inspires trust.'
        },
        {
          title: 'CONVERSION',
          desc: 'Attention without structure is worthless. We engineer high-converting digital assets.'
        },
        {
          title: 'GROWTH',
          desc: 'Scaling is not luck; it is continuous iteration. We measure, optimize, and scale.'
        }
      ]
    : [
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

  const strategySteps = isEn
    ? [
        { title: 'Brand & Market Audit', icon: '/assets/metodologia/Recurso 13.svg' },
        { title: 'Irresistible Offer Architecture', icon: '/assets/metodologia/Recurso 14.svg' },
        { title: 'Category Positioning', icon: '/assets/metodologia/Recurso 15.svg' },
        { title: 'Conversion Funnel Mapping', icon: '/assets/metodologia/Recurso 16.svg' },
        { title: 'Quarterly Execution Blueprint', icon: '/assets/metodologia/Recurso 17.svg' }
      ]
    : [
        { title: 'Auditoría de marca y mercado', icon: '/assets/metodologia/Recurso 13.svg' },
        { title: 'Arquitectura de oferta irresistible', icon: '/assets/metodologia/Recurso 14.svg' },
        { title: 'Posicionamiento de categoría', icon: '/assets/metodologia/Recurso 15.svg' },
        { title: 'Mapa de conversión y audiencia', icon: '/assets/metodologia/Recurso 16.svg' },
        { title: 'Plan de ejecución trimestral', icon: '/assets/metodologia/Recurso 17.svg' }
      ];

  const contentSteps = isEn
    ? [
        { title: 'Creative Direction & Narrative', icon: '/assets/metodologia/Recurso 18.svg' },
        { title: 'High-Impact Audiovisual Production', icon: '/assets/metodologia/Recurso 19.svg' },
        { title: 'Strategic Conversion Copywriting', icon: '/assets/metodologia/Recurso 20.svg' },
        { title: 'Multi-Channel Distribution Systems', icon: '/assets/metodologia/Recurso 21.svg' },
        { title: 'Audience Retention Optimization', icon: '/assets/metodologia/Recurso 22.svg' }
      ]
    : [
        { title: 'Dirección creativa y narrativa', icon: '/assets/metodologia/Recurso 18.svg' },
        { title: 'Producción audiovisual de alto impacto', icon: '/assets/metodologia/Recurso 19.svg' },
        { title: 'Copywriting estratégico de conversión', icon: '/assets/metodologia/Recurso 20.svg' },
        { title: 'Sistemas de distribución multicanal', icon: '/assets/metodologia/Recurso 21.svg' },
        { title: 'Optimización de retención de audiencia', icon: '/assets/metodologia/Recurso 22.svg' }
      ];

  const assetsSteps = isEn
    ? [
        { title: 'Vanguard UI/UX Digital Design', icon: '/assets/metodologia/Recurso 13.svg' },
        { title: 'High-Performance Web Engineering', icon: '/assets/metodologia/Recurso 14.svg' },
        { title: 'High-Converting Sales Landing Pages', icon: '/assets/metodologia/Recurso 15.svg' },
        { title: 'Cohesive Brand Design Systems', icon: '/assets/metodologia/Recurso 16.svg' },
        { title: 'End-to-End Tracking & Analytics', icon: '/assets/metodologia/Recurso 17.svg' }
      ]
    : [
        { title: 'Diseño UI/UX de vanguardia', icon: '/assets/metodologia/Recurso 13.svg' },
        { title: 'Desarrollo web de alta velocidad', icon: '/assets/metodologia/Recurso 14.svg' },
        { title: 'Landing pages de alta conversión', icon: '/assets/metodologia/Recurso 15.svg' },
        { title: 'Sistemas de identidad y diseño', icon: '/assets/metodologia/Recurso 16.svg' },
        { title: 'Integración completa de analítica', icon: '/assets/metodologia/Recurso 17.svg' }
      ];

  const operationsSteps = isEn
    ? [
        { title: 'Paid Media & High-Intent Traffic', icon: '/assets/metodologia/Recurso 18.svg' },
        { title: 'Automated CRM & Lead Workflows', icon: '/assets/metodologia/Recurso 19.svg' },
        { title: 'Real-Time Executive KPI Dashboard', icon: '/assets/metodologia/Recurso 20.svg' },
        { title: 'Continuous Funnel CRO Testing', icon: '/assets/metodologia/Recurso 21.svg' },
        { title: 'Sustainable Long-Term Revenue Scaling', icon: '/assets/metodologia/Recurso 22.svg' }
      ]
    : [
        { title: 'Paid Media y tráfico calificado', icon: '/assets/metodologia/Recurso 18.svg' },
        { title: 'Automatización de flujos y CRM', icon: '/assets/metodologia/Recurso 19.svg' },
        { title: 'Monitoreo de KPIs ejecutivos en vivo', icon: '/assets/metodologia/Recurso 20.svg' },
        { title: 'Iteración continua y CRO de embudos', icon: '/assets/metodologia/Recurso 21.svg' },
        { title: 'Escala sostenible de rentabilidad', icon: '/assets/metodologia/Recurso 22.svg' }
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
              {isEn ? 'SCHEDULE A DIAGNOSTIC' : 'AGENDA UN DIAGNÓSTICO'}
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
            {isEn ? (
              <>
                We do not execute random tasks.<br />
                We engineer growth architectures.
              </>
            ) : (
              <>
                No ejecutamos tareas. Construimos<br />
                arquitectura de crecimiento.
              </>
            )}
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
                {isEn ? 'We define the foundation of everything.' : 'Definimos la base de todo.'}
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
                  {isEn
                    ? 'The Growth Blueprint. In-depth strategic audit and category power narrative.'
                    : 'El Roadmap. Diagnóstico profundo y narrativa de poder.'}
                </p>
              </div>

              <AnimatedTimeline
                align="right"
                steps={strategySteps}
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
                {isEn ? 'We build presence, status, and authority.' : 'Construimos presencia y autoridad.'}
              </p>

              <AnimatedTimeline
                align="left"
                steps={contentSteps}
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
                  {isEn
                    ? 'Visual authority. High-retention narrative content that educates and elevates brand status.'
                    : 'Autoridad visual. Contenido que educa y eleva el estatus de la marca.'}
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
                {isEn ? 'We engineer scalable digital infrastructure.' : 'Creamos la infraestructura digital.'}
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
                  {isEn
                    ? 'Conversion infrastructure. Engineering modern digital ecosystems built to turn traffic into revenue.'
                    : 'Infraestructura de conversión. Desarrollo de ecosistemas digitales que venden.'}
                </p>
              </div>

              <AnimatedTimeline
                align="right"
                steps={assetsSteps}
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
                {isEn ? 'We activate, optimize, and scale the engine.' : 'Activamos y optimizamos el sistema.'}
              </p>

              <AnimatedTimeline
                align="left"
                steps={operationsSteps}
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
                  {isEn
                    ? 'The scaling engine. High-ROI paid media management and continuous conversion rate optimization.'
                    : 'El motor de escala. Gestión de pauta y optimización constante del embudo.'}
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
