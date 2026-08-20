import React, { useState } from 'react';
import { useForm } from '@formspree/react';
import { CheckCircle2, Loader2 } from 'lucide-react';

export default function DiagnosticForm() {
  const formId = import.meta.env.VITE_FORMSPREE_FORM_ID || 'xvgpzyob';
  const [state, handleSubmit] = useForm(formId);

  const [form, setForm] = useState({
    nombre: '',
    empresa: '',
    ticket: '',
    cuelloDeBotella: '',
    inversionPlazo: '',
    correo: '',
    codigoPais: '+57',
    telefono: ''
  });

  const countryCodes = [
    { code: '+57', flag: '🇨🇴', label: '+57 (CO)' },
    { code: '+1', flag: '🇺🇸', label: '+1 (US)' },
    { code: '+34', flag: '🇪🇸', label: '+34 (ES)' },
    { code: '+52', flag: '🇲🇽', label: '+52 (MX)' },
    { code: '+507', flag: '🇵🇦', label: '+507 (PA)' },
    { code: '+56', flag: '🇨🇱', label: '+56 (CL)' },
    { code: '+54', flag: '🇦🇷', label: '+54 (AR)' },
    { code: '+51', flag: '🇵🇪', label: '+51 (PE)' },
    { code: '+593', flag: '🇪🇨', label: '+593 (EC)' }
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="diagnostico"
      style={{
        background: '#000000',
        paddingBottom: '8rem',
        position: 'relative',
        overflow: 'hidden'
      }}
      aria-label="Formulario de Diagnóstico Crimson Studio"
    >
      {/* Top Wave Fluid Magenta Banner */}
      <div
        style={{
          width: '100%',
          background: 'url(/assets/dragones/Banner.svg) center/cover no-repeat, var(--crimson-magenta)',
          padding: '2.5rem 1.5rem',
          textAlign: 'center',
          marginBottom: '6rem'
        }}
      >
        <img
          src="/assets/dragones/corona.svg"
          alt="Corona"
          style={{ width: '32px', height: '32px', filter: 'brightness(0) invert(1)', marginBottom: '0.5rem' }}
        />
        <h2
          style={{
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            color: '#ffffff',
            lineHeight: '0.9',
            letterSpacing: '0.04em',
            textTransform: 'uppercase'
          }}
        >
          DIAGNOSTICO
        </h2>
        <div
          style={{
            color: '#ffffff',
            fontSize: '1.25rem',
            fontFamily: 'var(--font-body)',
            fontWeight: '400',
            marginTop: '0.25rem'
          }}
        >
          Operations
        </div>
      </div>

      {/* Left Moss Rock */}
      <img
        src="/assets/rocas/RocaIzq.png"
        alt="Moss Rock Left"
        style={{
          position: 'absolute',
          top: '25%',
          left: '-80px',
          width: '320px',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Right Moss Rock */}
      <img
        src="/assets/rocas/RocaDer.png"
        alt="Moss Rock Right"
        style={{
          position: 'absolute',
          top: '40%',
          right: '-80px',
          width: '340px',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      <div className="container" style={{ maxWidth: '760px', position: 'relative', zIndex: 2 }}>
        
        {/* Centered Cup Emblem */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <img
            src="/assets/dragones/Recurso 2.svg"
            alt="Cup"
            style={{ width: '28px', height: '28px', filter: 'brightness(0) invert(1)' }}
          />
        </div>

        {/* Headline in Classic Quality with standardized line-height */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-title)',
              fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
              lineHeight: '0.92',
              color: '#ffffff'
            }}
          >
            Entendamos donde<br />
            estas y proyectemos<br />
            hacia donde puedes<br />
            llegar.
          </h2>
        </div>

        {/* Subtitle */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem auto' }}>
          <p style={{ color: '#ffffff', fontSize: '1.05rem', lineHeight: '1.45', opacity: 0.85 }}>
            Antes de hablar de ejecución, necesitamos entender la viabilidad de tu crecimiento. No somos para todos, y eso es lo que nos permite dar resultados extraordinarios.
          </p>
        </div>

        {/* Form Body */}
        {state.succeeded ? (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              border: '1px solid var(--border-light)',
              borderRadius: '16px',
              background: '#000000'
            }}
          >
            <CheckCircle2 size={56} style={{ color: 'var(--crimson-magenta)', margin: '0 auto 1.5rem auto' }} />
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '2rem', color: '#fff', marginBottom: '1rem' }}>
              ¡Diagnóstico Solicitado!
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', maxWidth: '480px', margin: '0 auto' }}>
              Gracias por tu información. Nuestro equipo evaluará tu caso y te contactará a la brevedad.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Row 1: Nombre & Empresa */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
              <div>
                <input
                  type="text"
                  name="nombre"
                  required
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Nombre completo *"
                  className="crimson-input"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="empresa"
                  required
                  value={form.empresa}
                  onChange={handleChange}
                  placeholder="Empresa / Marca *"
                  className="crimson-input"
                />
              </div>
            </div>

            {/* Field 2: Ticket promedio con contador */}
            <div style={{ position: 'relative' }}>
              <textarea
                name="ticket"
                rows={3}
                required
                maxLength={250}
                value={form.ticket}
                onChange={handleChange}
                placeholder="¿Qué vendes y a qué precio (Ticket promedio)? *"
                className="crimson-input"
                style={{ resize: 'vertical', paddingBottom: '1.5rem' }}
              />
              <span style={{ position: 'absolute', right: '12px', bottom: '8px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                {form.ticket.length}/250
              </span>
            </div>

            {/* Field 3: Cuello de botella con contador */}
            <div style={{ position: 'relative' }}>
              <textarea
                name="cuelloDeBotella"
                rows={3}
                required
                maxLength={250}
                value={form.cuelloDeBotella}
                onChange={handleChange}
                placeholder="¿Cuál es el cuello de botella que frena tu crecimiento hoy? *"
                className="crimson-input"
                style={{ resize: 'vertical', paddingBottom: '1.5rem' }}
              />
              <span style={{ position: 'absolute', right: '12px', bottom: '8px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                {form.cuelloDeBotella.length}/250
              </span>
            </div>

            {/* Field 4: Inversion a largo plazo con contador */}
            <div style={{ position: 'relative' }}>
              <textarea
                name="inversionPlazo"
                rows={3}
                required
                maxLength={250}
                value={form.inversionPlazo}
                onChange={handleChange}
                placeholder="¿Estás listo para invertir en una estructura a largo plazo? *"
                className="crimson-input"
                style={{ resize: 'vertical', paddingBottom: '1.5rem' }}
              />
              <span style={{ position: 'absolute', right: '12px', bottom: '8px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                {form.inversionPlazo.length}/250
              </span>
            </div>

            {/* Row 5: Correo & Numero de contacto con Código de País */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
              <div>
                <input
                  type="email"
                  name="correo"
                  required
                  value={form.correo}
                  onChange={handleChange}
                  placeholder="Correo electrónico *"
                  className="crimson-input"
                />
              </div>

              {/* Teléfono con selector de país */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <select
                  name="codigoPais"
                  value={form.codigoPais}
                  onChange={handleChange}
                  style={{
                    background: '#000000',
                    border: '1px solid var(--border-light)',
                    borderRadius: '10px',
                    color: '#ffffff',
                    padding: '0 0.6rem',
                    fontSize: '0.85rem',
                    outline: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    minWidth: '100px'
                  }}
                >
                  {countryCodes.map((c) => (
                    <option key={c.code} value={c.code} style={{ background: '#111', color: '#fff' }}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>

                <input
                  type="tel"
                  name="telefono"
                  required
                  value={form.telefono}
                  onChange={handleChange}
                  placeholder="Número de contacto *"
                  className="crimson-input"
                  style={{ flex: 1 }}
                />
              </div>
            </div>

            {/* Hidden field for full phone */}
            <input type="hidden" name="telefono_completo" value={`${form.codigoPais} ${form.telefono}`} />

            {/* Submit Button */}
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <button
                type="submit"
                disabled={state.submitting}
                className="btn-solid-crimson"
                style={{ width: 'auto', minWidth: '320px' }}
              >
                {state.submitting ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Loader2 size={18} className="animate-spin" />
                    Enviando...
                  </span>
                ) : (
                  'Solicitar Diagnóstico de Crecimiento.'
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
