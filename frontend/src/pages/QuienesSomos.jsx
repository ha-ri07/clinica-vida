// src/pages/QuienesSomos.jsx
import React, { useState } from 'react';
import { FaHeartbeat, FaHistory, FaEye, FaBullseye, FaAward, FaCalendarAlt, FaChevronDown } from 'react-icons/fa';
import './QuienesSomos.css';

const hitos = [
  {
    año: '1998',
    titulo: 'Fundación de la Clínica',
    descripcion: 'Clínica Vida abre sus puertas con el sueño de ofrecer atención médica de primer nivel, calidad humana y accesibilidad para toda la comunidad.',
  },
  {
    año: '2006',
    titulo: 'Ampliación de Especialidades',
    descripcion: 'Inauguramos los departamentos de Cardiología y Neurología, equipándonos con moderna tecnología médica de diagnóstico.',
  },
  {
    año: '2014',
    titulo: 'Nueva Sede Principal',
    descripcion: 'Nos trasladamos a un complejo hospitalario propio de 6 plantas, ampliando nuestra capacidad a más de 50 camas y nuevas salas de urgencias.',
  },
  {
    año: '2021',
    titulo: 'Transformación Digital',
    descripcion: 'Digitalizamos la totalidad de nuestro sistema de historias clínicas e implementamos servicios de consulta médica en línea y telemedicina.',
  },
  {
    año: '2026',
    titulo: 'Clínica de Referencia',
    descripcion: 'Hoy nos consolidamos como la clínica de mayor confianza de la región, destacando por especialidades complejas y atención al paciente.',
  },
];

const QuienesSomos = () => {
  const [openSection, setOpenSection] = useState('historia');

  const toggle = (section) => {
    setOpenSection(prev => (prev === section ? null : section));
  };

  return (
    <div className="qs-page">
      {/* Banner */}
      <section className="qs-hero">
        <div className="qs-hero-inner">
          <h1>Quiénes Somos</h1>
          <p>Comprometidos con el cuidado, bienestar y salud de tu familia desde hace más de 25 años</p>
        </div>
      </section>

      {/* Acordeones */}
      <section className="qs-section">
        <div className="qs-container">

          {/* Acordeón: Historia */}
          <div className="qs-card">
            <button
              className={`qs-btn ${openSection === 'historia' ? 'qs-btn--open' : ''}`}
              onClick={() => toggle('historia')}
            >
              <span className="qs-btn-label">
                <FaHistory className="qs-icon qs-icon--historia" />
                Historia de Clínica Vida
              </span>
              <FaChevronDown className={`qs-chevron ${openSection === 'historia' ? 'qs-chevron--up' : ''}`} />
            </button>

            <div className={`qs-panel ${openSection === 'historia' ? 'qs-panel--open' : ''}`}>
              <div className="qs-panel-inner">
                {/* Intro */}
                <div className="qs-intro-grid">
                  <div className="qs-intro-text">
                    <span className="qs-tag"><FaHeartbeat /> Nuestra Esencia</span>
                    <h2>Líderes en medicina humanizada y de vanguardia</h2>
                    <p>
                      En la <strong>Clínica Vida</strong> entendemos que la salud es lo más valioso que posee una persona.
                      Por ello, trabajamos incansablemente bajo una filosofía donde el paciente es el centro de todo lo que hacemos.
                    </p>
                    <p>
                      Con un equipo multidisciplinario de doctores altamente calificados, personal de enfermería dedicado y
                      tecnología diagnóstica avanzada, brindamos una atención médica integral, oportuna e innovadora.
                    </p>
                  </div>
                  <div className="qs-intro-img-wrap">
                    <img
                      src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                      alt="Instalaciones Clínica Vida"
                      className="qs-intro-img"
                    />
                    <div className="qs-badge">
                      <span className="qs-badge-num">+25</span>
                      <span className="qs-badge-txt">Años de Excelencia</span>
                    </div>
                  </div>
                </div>

                {/* Línea de tiempo */}
                <div className="qs-timeline-wrap">
                  <div className="qs-section-title">
                    <span>Trayectoria</span>
                    <h3>Línea de Tiempo del Cuidado Médico</h3>
                  </div>
                  <div className="qs-timeline">
                    {hitos.map((hito, i) => (
                      <div key={i} className={`qs-tl-item ${i % 2 === 0 ? 'qs-tl-item--left' : 'qs-tl-item--right'}`}>
                        <div className="qs-tl-dot"><FaCalendarAlt /></div>
                        <div className="qs-tl-box">
                          <span className="qs-tl-year">{hito.año}</span>
                          <h4>{hito.titulo}</h4>
                          <p>{hito.descripcion}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Acordeón: Visión */}
          <div className="qs-card">
            <button
              className={`qs-btn ${openSection === 'vision' ? 'qs-btn--open' : ''}`}
              onClick={() => toggle('vision')}
            >
              <span className="qs-btn-label">
                <FaEye className="qs-icon qs-icon--vision" />
                Nuestra Visión y Valores
              </span>
              <FaChevronDown className={`qs-chevron ${openSection === 'vision' ? 'qs-chevron--up' : ''}`} />
            </button>

            <div className={`qs-panel ${openSection === 'vision' ? 'qs-panel--open' : ''}`}>
              <div className="qs-panel-inner">
                <div className="qs-mv-grid">
                  <div className="qs-mv-card">
                    <div className="qs-mv-icon"><FaBullseye /></div>
                    <h3>Nuestra Misión</h3>
                    <p>
                      Proporcionar servicios de salud integrales y especializados con la más alta calidad
                      científica, ética y humana, contribuyendo a restablecer y mantener la salud de nuestros
                      pacientes y aportando al desarrollo social de la comunidad.
                    </p>
                  </div>
                  <div className="qs-mv-card">
                    <div className="qs-mv-icon"><FaEye /></div>
                    <h3>Nuestra Visión</h3>
                    <p>
                      Ser reconocidos para el año 2030 como la institución hospitalaria líder en la región en
                      la prestación de servicios médicos integrales, distinguidos por nuestra innovación
                      tecnológica, seguridad en la atención y un trato excepcionalmente humanizado.
                    </p>
                  </div>
                  <div className="qs-mv-card">
                    <div className="qs-mv-icon"><FaAward /></div>
                    <h3>Valores Fundamentales</h3>
                    <ul>
                      <li><strong>Empatía:</strong> Escuchamos y entendemos a nuestros pacientes y familias.</li>
                      <li><strong>Excelencia:</strong> Nos esforzamos por alcanzar los mayores estándares médicos.</li>
                      <li><strong>Ética:</strong> Actuamos con total honestidad, respeto y confidencialidad.</li>
                      <li><strong>Innovación:</strong> Implementamos avances científicos y tecnológicos constantes.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default QuienesSomos;
