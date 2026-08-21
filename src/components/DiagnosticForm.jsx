import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function DiagnosticForm() {
  const { i18n } = useTranslation();
  const isEn = (i18n.language || 'es').startsWith('en');

  const accessKey = import.meta.env.VITE_STATICFORMS_KEY || 'sf_34d8660db02b91fb8be842f7';

  const [form, setForm] = useState({
    nombre: '',
    empresa: '',
    ticket: '',
    cuelloDeBotella: '',
    inversionPlazo: '',
    correo: '',
    codigoPais: '+57',
    telefono: '',
    honeypot: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSucceeded, setIsSucceeded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  // Restricciones por tipo de campo
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'nombre') {
      // Solo letras, espacios, acentos y guiones (sin números ni caracteres especiales extraños)
      const sanitized = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]/g, '');
      setForm((prev) => ({ ...prev, [name]: sanitized }));
    } else if (name === 'telefono') {
      // Estrictamente números (dígitos 0-9), máximo 15 dígitos
      const numeric = value.replace(/\D/g, '').slice(0, 15);
      setForm((prev) => ({ ...prev, [name]: numeric }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    // Validación básica de teléfono
    if (form.telefono.length < 7) {
      setErrorMessage(
        isEn
          ? 'Please enter a valid phone number (at least 7 digits).'
          : 'Por favor ingresa un número de teléfono válido (mínimo 7 dígitos).'
      );
      setIsSubmitting(false);
      return;
    }

    const payload = {
      accessKey: accessKey,
      name: form.nombre.trim(),
      email: form.correo.trim(),
      phone: `${form.codigoPais} ${form.telefono}`.trim(),
      subject: `Diagnóstico Crimson Studio: ${form.empresa} (${form.nombre})`,
      message: `
--- NUEVA SOLICITUD DE DIAGNÓSTICO ESTRATÉGICO ---
Nombre del Contacto: ${form.nombre.trim()}
Empresa / Marca: ${form.empresa.trim()}
Correo: ${form.correo.trim()}
Teléfono / WhatsApp: ${form.codigoPais} ${form.telefono.trim()}

1. ¿Qué vendes y a qué precio (Ticket promedio)?:
${form.ticket.trim()}

2. ¿Cuál es el cuello de botella que frena tu crecimiento hoy?:
${form.cuelloDeBotella.trim()}

3. ¿Estás listo para invertir en una estructura a largo plazo?:
${form.inversionPlazo.trim()}
      `.trim(),
      honeypot: form.honeypot
    };

    try {
      const response = await fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.success) {
        setIsSucceeded(true);
      } else {
        setErrorMessage(
          result.message ||
            (isEn
              ? 'Could not send the form. Please check your details and try again.'
              : 'No se pudo enviar el formulario. Por favor verifica tus datos e inténtalo nuevamente.')
        );
      }
    } catch (err) {
      console.error('Error submitting to StaticForms:', err);
      setErrorMessage(
        isEn
          ? 'Network error. Please try again or reach out to us directly.'
          : 'Error de conexión. Por favor intenta de nuevo o escríbenos directamente.'
      );
    } finally {
      setIsSubmitting(false);
    }
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
          {isEn ? 'DIAGNOSTIC' : 'DIAGNOSTICO'}
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
            {isEn ? (
              <>
                Let's understand where<br />
                you stand and project<br />
                how far you can<br />
                scale.
              </>
            ) : (
              <>
                Entendamos donde<br />
                estas y proyectemos<br />
                hacia donde puedes<br />
                llegar.
              </>
            )}
          </h2>
        </div>

        {/* Subtitle */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem auto' }}>
          <p style={{ color: '#ffffff', fontSize: '1.05rem', lineHeight: '1.45', opacity: 0.85 }}>
            {isEn
              ? 'Before talking about execution, we need to assess the real viability of your scaling. We are not for everyone, and that is precisely what allows us to deliver extraordinary results.'
              : 'Antes de hablar de ejecución, necesitamos entender la viabilidad de tu crecimiento. No somos para todos, y eso es lo que nos permite dar resultados extraordinarios.'}
          </p>
        </div>

        {/* Form Body */}
        {isSucceeded ? (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              border: '1px solid var(--crimson-magenta)',
              borderRadius: '16px',
              background: '#0a0a0c',
              boxShadow: '0 10px 40px rgba(184, 18, 92, 0.15)'
            }}
          >
            <CheckCircle2 size={56} style={{ color: 'var(--crimson-magenta)', margin: '0 auto 1.5rem auto' }} />
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '2rem', color: '#fff', marginBottom: '1rem' }}>
              {isEn ? 'Diagnostic Requested!' : '¡Diagnóstico Solicitado!'}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', maxWidth: '520px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
              {isEn
                ? 'Thank you for your submission. Our strategic team will review your business metrics and get in touch within 24 hours.'
                : 'Gracias por tu información. Nuestro equipo evaluará los datos de tu empresa y se pondrá en contacto contigo en menos de 24 horas.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSucceeded(false);
                setForm({
                  nombre: '',
                  empresa: '',
                  ticket: '',
                  cuelloDeBotella: '',
                  inversionPlazo: '',
                  correo: '',
                  codigoPais: '+57',
                  telefono: '',
                  honeypot: ''
                });
              }}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#ffffff',
                padding: '0.75rem 1.75rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {isEn ? 'Send another request' : 'Enviar otra solicitud'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Honeypot field for anti-spam */}
            <input
              type="text"
              name="honeypot"
              style={{ display: 'none' }}
              tabIndex="-1"
              autoComplete="off"
              value={form.honeypot}
              onChange={handleChange}
            />

            {/* Error banner if submission fails */}
            {errorMessage && (
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid #ef4444',
                  borderRadius: '10px',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: '#fca5a5',
                  fontSize: '0.95rem'
                }}
              >
                <AlertCircle size={20} style={{ flexShrink: 0, color: '#ef4444' }} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Row 1: Nombre & Empresa */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
              <div>
                <input
                  type="text"
                  name="nombre"
                  required
                  maxLength={70}
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder={isEn ? 'Full name (Letters only) *' : 'Nombre completo (Solo letras) *'}
                  className="crimson-input"
                  autoComplete="name"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="empresa"
                  required
                  maxLength={70}
                  value={form.empresa}
                  onChange={handleChange}
                  placeholder={isEn ? 'Company / Brand *' : 'Empresa / Marca *'}
                  className="crimson-input"
                  autoComplete="organization"
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
                placeholder={
                  isEn
                    ? 'What do you sell and at what price (Average ticket / order value)? *'
                    : '¿Qué vendes y a qué precio (Ticket promedio)? *'
                }
                className="crimson-input"
                style={{ resize: 'vertical', paddingBottom: '1.5rem' }}
              />
              <span
                style={{
                  position: 'absolute',
                  right: '12px',
                  bottom: '8px',
                  fontSize: '0.75rem',
                  color: form.ticket.length >= 240 ? 'var(--crimson-magenta)' : 'rgba(255,255,255,0.4)'
                }}
              >
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
                placeholder={
                  isEn
                    ? 'What is the primary bottleneck halting your revenue growth today? *'
                    : '¿Cuál es el cuello de botella que frena tu crecimiento hoy? *'
                }
                className="crimson-input"
                style={{ resize: 'vertical', paddingBottom: '1.5rem' }}
              />
              <span
                style={{
                  position: 'absolute',
                  right: '12px',
                  bottom: '8px',
                  fontSize: '0.75rem',
                  color: form.cuelloDeBotella.length >= 240 ? 'var(--crimson-magenta)' : 'rgba(255,255,255,0.4)'
                }}
              >
                {form.cuelloDeBotella.length}/250
              </span>
            </div>

            {/* Field 4: Inversión a largo plazo con contador */}
            <div style={{ position: 'relative' }}>
              <textarea
                name="inversionPlazo"
                rows={3}
                required
                maxLength={250}
                value={form.inversionPlazo}
                onChange={handleChange}
                placeholder={
                  isEn
                    ? 'Are you ready to invest in a long-term growth infrastructure? *'
                    : '¿Estás listo para invertir en una estructura a largo plazo? *'
                }
                className="crimson-input"
                style={{ resize: 'vertical', paddingBottom: '1.5rem' }}
              />
              <span
                style={{
                  position: 'absolute',
                  right: '12px',
                  bottom: '8px',
                  fontSize: '0.75rem',
                  color: form.inversionPlazo.length >= 240 ? 'var(--crimson-magenta)' : 'rgba(255,255,255,0.4)'
                }}
              >
                {form.inversionPlazo.length}/250
              </span>
            </div>

            {/* Row 5: Correo & Número de contacto con Código de País */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
              <div>
                <input
                  type="email"
                  name="correo"
                  required
                  maxLength={100}
                  value={form.correo}
                  onChange={handleChange}
                  placeholder={isEn ? 'Email address *' : 'Correo electrónico *'}
                  className="crimson-input"
                  autoComplete="email"
                />
              </div>

              {/* Teléfono con selector de país y restricción numérica */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <select
                  name="codigoPais"
                  value={form.codigoPais}
                  onChange={handleChange}
                  aria-label={isEn ? 'Country Code' : 'Código de País'}
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
                    <option key={c.code} value={c.code} style={{ background: '#0a0a0c', color: '#fff' }}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>

                <input
                  type="tel"
                  name="telefono"
                  required
                  inputMode="numeric"
                  pattern="[0-9]*"
                  minLength={7}
                  maxLength={15}
                  value={form.telefono}
                  onChange={handleChange}
                  placeholder={isEn ? 'Phone (Digits only) *' : 'Teléfono (Solo números) *'}
                  className="crimson-input"
                  style={{ flex: 1 }}
                  autoComplete="tel"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-solid-crimson"
                style={{
                  width: '100%',
                  maxWidth: '380px',
                  padding: '1.05rem 2rem',
                  fontSize: '1.05rem',
                  fontWeight: '600',
                  letterSpacing: '0.04em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>{isEn ? 'SENDING DIAGNOSTIC...' : 'ENVIANDO DIAGNÓSTICO...'}</span>
                  </>
                ) : (
                  <span>{isEn ? 'SCHEDULE DIAGNOSTIC' : 'AGENDA UN DIAGNÓSTICO'}</span>
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
