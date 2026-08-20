import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function HeaderNav() {
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const toggleLanguage = () => {
    const next = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(next);
  };

  const links = [
    { path: '/', label: 'Home' },
    { path: '/metodologia', label: 'Services' },
    { path: '/proyectos', label: 'Proyectos' },
    { path: '/manifiesto', label: 'Manifiesto' }
  ];

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
      <div className="nav-pill-container">
        
        {/* Left Navigation Links */}
        <nav className="nav-links desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
                style={{
                  fontSize: '0.85rem',
                  fontWeight: '500',
                  color: isActive ? 'var(--crimson-magenta)' : '#fff',
                  textDecoration: 'none'
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Center Dragon Logo (Positioned in the exact center of the navbar) */}
        <Link
          to="/"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src="/assets/dragones/CrimsonDragonNav.png"
            alt="Crimson Dragon"
            style={{
              height: '28px',
              width: 'auto',
              display: 'block'
            }}
          />
        </Link>

        {/* Right Actions: Contacto & Language Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <button
            onClick={() => {
              const target = document.getElementById('diagnostico');
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/#diagnostico';
              }
            }}
            className="btn-contacto"
          >
            Contacto
          </button>

          <button onClick={toggleLanguage} className="btn-lang">
            {i18n.language ? i18n.language.toUpperCase() : 'ES'}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-only"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              display: 'none',
              padding: '0.2rem'
            }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '5%',
            width: '90%',
            background: 'rgba(10, 10, 10, 0.95)',
            border: '1px solid var(--border-light)',
            borderRadius: '16px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            backdropFilter: 'blur(20px)'
          }}
        >
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: '1.1rem',
                color: location.pathname === link.path ? 'var(--crimson-magenta)' : '#fff',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: block !important; }
        }
      `}</style>
    </header>
  );
}
