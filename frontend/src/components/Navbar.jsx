// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHeartbeat, FaBars, FaTimes, FaPhone, FaWhatsapp } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Efecto de sombra al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="top-bar">
        <div className="container top-bar-container">
          <div className="top-bar-contact">
            <a href="tel:+576018765432" className="contact-item">
              <FaPhone /> <span>Línea Directa: +57 (601) 876-5432</span>
            </a>
            <a href="https://wa.me/573159876543?text=Hola,%20me%20gustar%C3%ADa%20obtener%20informaci%C3%B3n%20sobre%20las%20citas." target="_blank" rel="noopener noreferrer" className="contact-item whatsapp-item">
              <FaWhatsapp className="whatsapp-icon" /> <span>WhatsApp: +57 315 987-6543</span>
            </a>
          </div>
          <div className="top-bar-info">
            <span>Atención: Lun - Vie 7:00 AM - 7:00 PM</span>
          </div>
        </div>
      </div>
      <nav className="navbar container">
        <Link to="/" className="logo" onClick={() => setIsOpen(false)}>
          <FaHeartbeat />
          <span>Clínica <span style={{color: 'var(--secondary)'}}>Vida</span></span>
        </Link>
        
        <button 
          className="menu-toggle" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li>
            <Link 
              to="/" 
              className={isActive('/') ? 'active' : ''}
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link 
              to="/quienes-somos" 
              className={isActive('/quienes-somos') ? 'active' : ''}
              onClick={() => setIsOpen(false)}
            >
              Quiénes Somos
            </Link>
          </li>
          <li>
            <Link 
              to="/especialidades" 
              className={isActive('/especialidades') ? 'active' : ''}
              onClick={() => setIsOpen(false)}
            >
              Especialidades
            </Link>
          </li>
          <li>
            <Link 
              to="/doctores" 
              className={isActive('/doctores') ? 'active' : ''}
              onClick={() => setIsOpen(false)}
            >
              Doctores
            </Link>
          </li>
          <li>
            <Link 
              to="/citas?tab=consultar" 
              className={location.pathname === '/citas' && location.search.includes('tab=consultar') ? 'active' : ''}
              onClick={() => setIsOpen(false)}
            >
              Mis Citas
            </Link>
          </li>
          <li>
            <Link 
              to="/contacto" 
              className={isActive('/contacto') ? 'active' : ''}
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </Link>
          </li>
          <li>
            <Link 
              to="/admin-citas" 
              className={isActive('/admin-citas') ? 'active' : ''}
              onClick={() => setIsOpen(false)}
            >
              Admin Citas
            </Link>
          </li>
        </ul>

        <Link 
          to="/citas" 
          className="btn-cta"
          onClick={() => setIsOpen(false)}
        >
          Agendar Cita
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;