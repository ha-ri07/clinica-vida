// src/pages/Contacto.jsx
import React, { useState } from 'react';
import {
  FaPhoneAlt, FaWhatsapp, FaClock, FaMapMarkerAlt, FaEnvelope,
  FaChevronDown, FaPaperPlane, FaPhoneVolume
} from 'react-icons/fa';
import './Contacto.css';

const Contacto = () => {
  const [openSection, setOpenSection] = useState('telefonos');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  });

  const toggle = (section) => {
    setOpenSection(prev => (prev === section ? null : section));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);
      setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
    }, 1500);
  };

  return (
    <div className="ct-page">
      {/* Banner */}
      <section className="ct-hero">
        <div className="ct-hero-inner">
          <h1>Contáctanos</h1>
          <p>Estamos aquí para escucharte y ayudarte. Elige el medio de tu preferencia.</p>
        </div>
      </section>

      <section className="ct-section">
        <div className="ct-container">

          {/* Columna Izquierda: Canales */}
          <div className="ct-info-col">
            <h2>Canales Directos de Atención</h2>
            <p className="ct-col-desc">
              Despliega las opciones a continuación para encontrar los números de teléfono,
              WhatsApp o correos específicos según tu requerimiento.
            </p>

            <div className="ct-accordion">

              {/* Teléfonos */}
              <div className="ct-acc-item">
                <button
                  className={`ct-acc-btn ${openSection === 'telefonos' ? 'ct-acc-btn--open' : ''}`}
                  onClick={() => toggle('telefonos')}
                >
                  <span className="ct-acc-label">
                    <FaPhoneVolume className="ct-icon ct-icon--tel" />
                    Líneas Telefónicas Directas
                  </span>
                  <FaChevronDown className={`ct-chevron ${openSection === 'telefonos' ? 'ct-chevron--up' : ''}`} />
                </button>
                <div className={`ct-acc-panel ${openSection === 'telefonos' ? 'ct-acc-panel--open' : ''}`}>
                  <div className="ct-panel-inner">
                    <div className="ct-contact-card">
                      <h5>Central de Citas Generales</h5>
                      <p>Para agendar, cancelar o modificar consultas médicas generales y especialistas.</p>
                      <a href="tel:+576018765432" className="ct-btn ct-btn--tel">
                        <FaPhoneAlt /> Llamar: +57 (601) 876-5432
                      </a>
                    </div>
                    <div className="ct-contact-card ct-contact-card--urgent">
                      <h5>Línea de Urgencias (24 Horas)</h5>
                      <p>Atención directa para emergencias médicas y traslados en ambulancia.</p>
                      <a href="tel:+576019991111" className="ct-btn ct-btn--urgent">
                        <FaPhoneAlt /> Llamar Urgencias: +57 (601) 999-1111
                      </a>
                    </div>
                    <div className="ct-contact-card">
                      <h5>Línea Gratuita Nacional</h5>
                      <p>Llamadas sin costo desde cualquier lugar de Colombia.</p>
                      <a href="tel:018000123456" className="ct-btn ct-btn--tel">
                        <FaPhoneAlt /> Llamar Gratis: 01-8000-123-456
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="ct-acc-item">
                <button
                  className={`ct-acc-btn ${openSection === 'whatsapp' ? 'ct-acc-btn--open' : ''}`}
                  onClick={() => toggle('whatsapp')}
                >
                  <span className="ct-acc-label">
                    <FaWhatsapp className="ct-icon ct-icon--wa" />
                    Canales de Chat por WhatsApp
                  </span>
                  <FaChevronDown className={`ct-chevron ${openSection === 'whatsapp' ? 'ct-chevron--up' : ''}`} />
                </button>
                <div className={`ct-acc-panel ${openSection === 'whatsapp' ? 'ct-acc-panel--open' : ''}`}>
                  <div className="ct-panel-inner">
                    <div className="ct-contact-card">
                      <h5>WhatsApp de Citas Médicas</h5>
                      <p>Agendamiento rápido interactuando con nuestros asesores de servicio.</p>
                      <a
                        href="https://wa.me/573159876543?text=Hola,%20necesito%20agendar%20una%20cita%20m%C3%A9dica."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ct-btn ct-btn--wa"
                      >
                        <FaWhatsapp /> Chatear para Citas
                      </a>
                    </div>
                    <div className="ct-contact-card">
                      <h5>WhatsApp Facturación y Seguros</h5>
                      <p>Para trámites de autorizaciones, convenios y cotizaciones de servicios.</p>
                      <a
                        href="https://wa.me/573221234567?text=Hola,%20tengo%20una%20consulta%20sobre%20facturaci%C3%B3n."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ct-btn ct-btn--wa"
                      >
                        <FaWhatsapp /> Chatear Facturación
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Correos */}
              <div className="ct-acc-item">
                <button
                  className={`ct-acc-btn ${openSection === 'correos' ? 'ct-acc-btn--open' : ''}`}
                  onClick={() => toggle('correos')}
                >
                  <span className="ct-acc-label">
                    <FaEnvelope className="ct-icon ct-icon--email" />
                    Correos Electrónicos Oficiales
                  </span>
                  <FaChevronDown className={`ct-chevron ${openSection === 'correos' ? 'ct-chevron--up' : ''}`} />
                </button>
                <div className={`ct-acc-panel ${openSection === 'correos' ? 'ct-acc-panel--open' : ''}`}>
                  <div className="ct-panel-inner">
                    <div className="ct-contact-card">
                      <h5>Atención General al Paciente</h5>
                      <p>Para peticiones, quejas, reclamos, felicitaciones o información institucional general.</p>
                      <a href="mailto:contacto@clinicavida.com" className="ct-btn ct-btn--email">
                        <FaEnvelope /> contacto@clinicavida.com
                      </a>
                    </div>
                    <div className="ct-contact-card">
                      <h5>Facturación, Cuentas Médicas y Convenios</h5>
                      <p>Para el envío de soportes de pago, autorizaciones y convenios corporativos.</p>
                      <a href="mailto:facturacion@clinicavida.com" className="ct-btn ct-btn--email">
                        <FaEnvelope /> facturacion@clinicavida.com
                      </a>
                    </div>
                    <div className="ct-contact-card">
                      <h5>Talento Humano</h5>
                      <p>Si deseas postularte a ofertas laborales o enviar tu hoja de vida.</p>
                      <a href="mailto:talento@clinicavida.com" className="ct-btn ct-btn--email">
                        <FaEnvelope /> talento@clinicavida.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Datos fijos */}
            <div className="ct-fixed-info">
              <div className="ct-info-item">
                <FaMapMarkerAlt className="ct-info-icon" />
                <div>
                  <h5>Dirección</h5>
                  <p>Calle Principal de la Salud #45-67, Bogotá, Colombia</p>
                </div>
              </div>
              <div className="ct-info-item">
                <FaClock className="ct-info-icon" />
                <div>
                  <h5>Horario General de Atención</h5>
                  <p>Lunes a Viernes: 7:00 AM – 7:00 PM <br />Sábados: 8:00 AM – 1:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario */}
          <div className="ct-form-col">
            <div className="ct-form-box">
              <h3>Envíanos un Mensaje</h3>
              <p>Si tienes alguna queja, reclamo, sugerencia o consulta general, llena este formulario.</p>

              {formSubmitted ? (
                <div className="ct-success">
                  <FaPaperPlane className="ct-success-icon" />
                  <h4>¡Mensaje Enviado con Éxito!</h4>
                  <p>Hemos recibido tus comentarios. Te responderemos en un plazo máximo de 24 horas hábiles.</p>
                  <button className="ct-btn-reset" onClick={() => setFormSubmitted(false)}>
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="ct-form">
                  <div className="ct-form-group">
                    <label>Nombre Completo *</label>
                    <input
                      type="text"
                      name="nombre"
                      required
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Ej: Juan Pérez"
                    />
                  </div>
                  <div className="ct-form-group">
                    <label>Correo Electrónico *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ejemplo@correo.com"
                    />
                  </div>
                  <div className="ct-form-group">
                    <label>Asunto *</label>
                    <input
                      type="text"
                      name="asunto"
                      required
                      value={formData.asunto}
                      onChange={handleChange}
                      placeholder="Ej: Felicitación / Queja / Consulta"
                    />
                  </div>
                  <div className="ct-form-group">
                    <label>Mensaje *</label>
                    <textarea
                      name="mensaje"
                      required
                      rows="5"
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder="Escribe detalladamente tu mensaje aquí..."
                    />
                  </div>
                  <button type="submit" className="ct-btn-send" disabled={formLoading}>
                    {formLoading ? 'Enviando...' : <><FaPaperPlane /> Enviar Mensaje</>}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contacto;
