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

        {/* List of 16 Pill Accordions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '4rem' }}>
          {questions.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  className="faq-pill"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                >
                  <span style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: '400' }}>
                    {item.q}
                  </span>

                  {/* Pink Goblet Icon */}
                  <img
                    src="/assets/dragones/Recurso 2.svg"
                    alt="Cup Icon"
                    style={{
                      width: '18px',
                      height: '18px',
                      filter: 'invert(16%) sepia(96%) saturate(6000%) hue-rotate(330deg) brightness(95%) contrast(105%)',
                      transform: isOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease',
                      flexShrink: 0
                    }}
                  />
                </div>

                {isOpen && (
                  <div
                    style={{
                      padding: '1rem 1.75rem',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--border-light)',
                      borderTop: 'none',
                      borderRadius: '0 0 16px 16px',
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '0.92rem',
                      lineHeight: '1.6'
                    }}
                  >
                    {item.a}
                  </div>
                )}
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
