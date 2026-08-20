import React, { useState } from 'react';

export default function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState(null);

  const questions = [
    { q: '¿Qué hace exactamente Crimson Studio?', a: 'Construimos sistemas integrados de crecimiento que conectan estrategia, producción de contenido, desarrollo de activos digitales y operaciones de performance para escalar la rentabilidad de tu marca.' },
    { q: '¿Son una agencia de marketing digital?', a: 'No somos una agencia tradicional de entregables aislados. Operamos como tu socio estratégico y motor de crecimiento construyendo sistemas a largo plazo.' },
    { q: '¿Con qué tipo de clientes trabajan?', a: 'Trabajamos con marcas y negocios validados, empresas en aceleración y líderes de categoría que buscan estructura y escala.' },
    { q: '¿Trabajan con empresas pequeñas?', a: 'Trabajamos con empresas que cuentan con una oferta validada y tracción real, listas para invertir en una infraestructura escalable.' },
    { q: '¿Qué diferencia a Crimson Studio de otras?', a: 'La integración absoluta entre negocio, estética de élite y ejecución técnica implacable sin fragmentar el proceso.' },
    { q: '¿Qué es un diagnóstico estratégico?', a: 'Es una sesión de análisis profundo donde evaluamos tu cuello de botella actual, viabilidad de escala y diseñamos tu hoja de ruta.' },
    { q: '¿Necesito tener una marca definida para trabajar con ustedes?', a: 'No necesariamente; si tu oferta está validada, en la fase de Estrategia construimos o refinamos tu arquitectura de marca.' },
    { q: '¿También desarrollan sitios web?', a: 'Sí, diseñamos y programamos plataformas digitales y landing pages de alta conversión optimizadas para velocidad y ventas.' },
    { q: '¿Gestionan campañas publicitarias?', a: 'Sí, como parte de nuestro pilar de Growth Operations, gestionamos pauta en Paid Media orientada a resultados medibles.' },
    { q: '¿Cómo es el proceso de trabajo?', a: 'Operamos en 4 etapas: Estrategia, Producción de Contenido, Desarrollo de Activos y Operaciones de Escala.' },
    { q: '¿Crean contenido para redes sociales?', a: 'Desarrollamos sistemas de contenido con autoridad visual, guiones y producción audiovisual de alto impacto.' },
    { q: '¿Trabajan por proyectos o por mensualidades?', a: 'Estructuramos acuerdos según la etapa del cliente, desde implementaciones de infraestructura hasta alianzas de crecimiento continuo.' },
    { q: '¿Cuánto cuesta trabajar con Crimson Studio?', a: 'Nuestras propuestas se personalizan en función del diagnóstico y los objetivos de facturación de cada empresa.' },
    { q: '¿Trabajan únicamente en Colombia?', a: 'Atendemos clientes en Colombia, Estados Unidos, Latinoamérica y Europa de forma remota y presencial.' },
    { q: '¿Qué necesitan para comenzar?', a: 'Completar el formulario de diagnóstico para revisar tu caso y agendar una llamada estratégica.' },
    { q: '¿Cómo sé si Crimson Studio es el partner adecuado para mi empresa?', a: 'Si buscas un equipo que piense en tu negocio con visión de largo plazo y no solo en "hacer piezas", somos el partner indicado.' }
  ];

  return (
    <section
      style={{
        background: '#000000',
        padding: '7rem 0 8rem 0',
        position: 'relative'
      }}
    >
      <div className="container" style={{ maxWidth: '820px' }}>
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-title)',
              fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)',
              lineHeight: '0.9',
              color: '#ffffff',
              textTransform: 'uppercase'
            }}
          >
            PREGUNTAS<br />FRECUENTES
          </h2>
        </div>

        {/* List of 16 Smooth Accordions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '4rem' }}>
          {questions.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`faq-item ${isOpen ? 'active' : ''}`}
                style={{
                  background: isOpen ? 'rgba(229, 10, 83, 0.04)' : '#000000',
                  border: isOpen ? '1px solid var(--crimson-magenta)' : '1px solid var(--border-light)',
                  borderRadius: isOpen ? '22px' : '9999px',
                  boxShadow: isOpen
                    ? '0 0 25px rgba(229, 10, 83, 0.2), inset 0 0 15px rgba(229, 10, 83, 0.06)'
                    : 'none',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  overflow: 'hidden'
                }}
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    padding: '1.15rem 1.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1.25rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    outline: 'none'
                  }}
                  aria-expanded={isOpen}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: isOpen ? '#ffffff' : 'rgba(255, 255, 255, 0.88)',
                      fontSize: '1rem',
                      fontWeight: isOpen ? '600' : '400',
                      letterSpacing: '-0.01em',
                      transition: 'color 0.25s ease, font-weight 0.25s ease',
                      textShadow: isOpen ? '0 0 12px rgba(229, 10, 83, 0.3)' : 'none'
                    }}
                  >
                    {item.q}
                  </span>

                  {/* Icon with smooth rotate and crimson glow */}
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isOpen ? 'rgba(229, 10, 83, 0.15)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.35s ease'
                    }}
                  >
                    <img
                      src="/assets/dragones/Recurso 2.svg"
                      alt="Icon"
                      className="faq-icon"
                      style={{
                        width: '18px',
                        height: '18px',
                        filter: isOpen
                          ? 'brightness(0) saturate(100%) invert(18%) sepia(88%) saturate(5453%) hue-rotate(334deg) brightness(94%) contrast(97%) drop-shadow(0 0 6px rgba(229, 10, 83, 0.8))'
                          : 'invert(16%) sepia(96%) saturate(6000%) hue-rotate(330deg) brightness(95%) contrast(105%)',
                        transform: isOpen ? 'rotate(180deg) scale(1.1)' : 'rotate(0deg)',
                        transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease'
                      }}
                    />
                  </div>
                </button>

                {/* Animated Answer Body (Grid Row 0fr -> 1fr) */}
                <div
                  className="faq-content-wrapper"
                  style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <div
                    className="faq-content-inner"
                    style={{
                      overflow: 'hidden',
                      minHeight: 0,
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? 'translateY(0)' : 'translateY(-8px)',
                      transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    <div
                      style={{
                        padding: '0.25rem 1.85rem 1.45rem 1.85rem',
                        borderTop: '1px solid rgba(229, 10, 83, 0.15)',
                        marginTop: '0.25rem',
                        paddingTop: '1rem',
                        color: 'rgba(255, 255, 255, 0.82)',
                        fontSize: '0.94rem',
                        lineHeight: '1.65'
                      }}
                    >
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA text */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#ffffff', fontSize: '1.05rem', lineHeight: '1.4' }}>
            Agenda un diagnóstico y descubre las<br />
            oportunidades de crecimiento de tu marca.
          </p>
        </div>
      </div>
    </section>
  );
}
