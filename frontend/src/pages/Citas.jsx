// src/pages/Citas.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaPhone, FaEnvelope, FaStethoscope, FaClock, FaCheckCircle, FaExclamationCircle, FaIdCard, FaSearch, FaTimesCircle } from 'react-icons/fa';
import { citasService, especialidadesService, doctoresService } from '../services/api';
import './Citas.css';

const Citas = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('agendar');

  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    email: '',
    telefono: '',
    especialidad: '',
    doctor: '',
    fecha: '',
    hora: '',
    motivo: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [especialidades, setEspecialidades] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [doctoresFiltrados, setDoctoresFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Estados para consulta de citas del paciente
  const [cedulaBusqueda, setCedulaBusqueda] = useState('');
  const [citasConsultadas, setCitasConsultadas] = useState([]);
  const [buscandoCitas, setBuscandoCitas] = useState(false);
  const [mensajeConsulta, setMensajeConsulta] = useState('');

  // Efecto para activar pestaña de consulta desde la URL (?tab=consultar)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'consultar') {
      setActiveTab('consultar');
    } else {
      setActiveTab('agendar');
    }
  }, [location]);

  // Cargar especialidades y doctores
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        const [especData, docData] = await Promise.all([
          especialidadesService.getAll(),
          doctoresService.getAll()
        ]);
        setEspecialidades(especData);
        setDoctores(docData);
      } catch (err) {
        console.error('Error al cargar datos:', err);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  // Filtrar doctores cuando cambia la especialidad
  useEffect(() => {
    if (formData.especialidad) {
      const filtrados = doctores.filter(
        doc => doc.especialidad === parseInt(formData.especialidad)
      );
      setDoctoresFiltrados(filtrados);
    } else {
      setDoctoresFiltrados([]);
    }
  }, [formData.especialidad, doctores]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.trim().length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!formData.cedula.trim()) {
      newErrors.cedula = 'La cédula es requerida';
    } else if (!/^\d{5,15}$/.test(formData.cedula.replace(/\s/g, ''))) {
      newErrors.cedula = 'Ingresa una cédula válida (5-15 dígitos)';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un email válido';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (!/^\d{7,15}$/.test(formData.telefono.replace(/\s/g, ''))) {
      newErrors.telefono = 'Ingresa un teléfono válido (7-15 dígitos)';
    }

    if (!formData.especialidad) {
      newErrors.especialidad = 'Selecciona una especialidad';
    }

    if (!formData.doctor) {
      newErrors.doctor = 'Selecciona un doctor';
    }

    if (!formData.fecha) {
      newErrors.fecha = 'Selecciona una fecha';
    } else {
      const fechaSeleccionada = new Date(formData.fecha);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      if (fechaSeleccionada < hoy) {
        newErrors.fecha = 'La fecha no puede ser anterior a hoy';
      }
    }

    if (!formData.hora) {
      newErrors.hora = 'Selecciona una hora';
    }

    if (!formData.motivo.trim()) {
      newErrors.motivo = 'El motivo de la consulta es requerido';
    } else if (formData.motivo.trim().length < 10) {
      newErrors.motivo = 'Describe el motivo con al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setLoading(true);

    try {
      const datosEnvio = {
        ...formData,
        especialidad: parseInt(formData.especialidad),
        doctor: parseInt(formData.doctor)
      };
      
      await citasService.create(datosEnvio);
      
      setLoading(false);
      setSubmitted(true);
      setFormData({
        nombre: '',
        cedula: '',
        email: '',
        telefono: '',
        especialidad: '',
        doctor: '',
        fecha: '',
        hora: '',
        motivo: ''
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error al guardar cita:', err);
      setErrors({ general: 'Error al guardar la cita. Intenta nuevamente.' });
      setLoading(false);
    }
  };

  // Función para consultar citas por cédula (paciente)
  const handleConsultar = async (e) => {
    e.preventDefault();
    if (!cedulaBusqueda.trim()) {
      setMensajeConsulta('Por favor ingresa tu número de cédula.');
      return;
    }
    setBuscandoCitas(true);
    setMensajeConsulta('');
    try {
      const data = await citasService.getByCedula(cedulaBusqueda);
      setCitasConsultadas(data);
      if (data.length === 0) {
        setMensajeConsulta('No se encontraron citas registradas con esta cédula.');
      }
    } catch (err) {
      console.error(err);
      setMensajeConsulta('Ocurrió un error al buscar tus citas. Inténtalo de nuevo.');
    } finally {
      setBuscandoCitas(false);
    }
  };

  // Función para cancelar la cita (paciente)
  const handleCancelarCita = async (citaId) => {
    if (window.confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
      try {
        await citasService.patch(citaId, { estado: 'cancelada' });
        // Recargar citas
        const data = await citasService.getByCedula(cedulaBusqueda);
        setCitasConsultadas(data);
        alert('Cita cancelada con éxito.');
      } catch (err) {
        console.error(err);
        alert('No se pudo cancelar la cita. Inténtalo de nuevo.');
      }
    }
  };

  if (submitted) {
    return (
      <div className="citas-page">
        <div className="container">
          <motion.div 
            className="success-message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaCheckCircle className="success-icon" />
            <h2>¡Cita Agendada Exitosamente!</h2>
            <p>Hemos recibido tu solicitud. Te enviaremos un correo de confirmación en breve.</p>
            <button className="btn-nueva-cita" onClick={() => setSubmitted(false)}>
              Agendar Otra Cita
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="citas-page">
      <section className="hero-citas">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {activeTab === 'agendar' ? 'Agenda tu Cita' : 'Consulta tus Citas'}
          </motion.h1>
          <p>
            {activeTab === 'agendar' 
              ? 'Reserva tu espacio en línea de forma rápida y segura' 
              : 'Revisa y gestiona tus citas médicas programadas'}
          </p>
        </div>
      </section>

      {/* Selector de pestañas */}
      <section className="tabs-section">
        <div className="container">
          <div className="tabs-container">
            <button 
              className={`tab-btn ${activeTab === 'agendar' ? 'active' : ''}`}
              onClick={() => setActiveTab('agendar')}
            >
              <FaCalendarAlt /> Agendar Cita
            </button>
            <button 
              className={`tab-btn ${activeTab === 'consultar' ? 'active' : ''}`}
              onClick={() => setActiveTab('consultar')}
            >
              <FaSearch /> Consultar Mis Citas
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {activeTab === 'agendar' ? (
            <div className="citas-form-container">
              <form onSubmit={handleSubmit} className="citas-form">
                <div className="form-header">
                  <h2>Información del Paciente</h2>
                  <p>Completa todos los campos para agendar tu cita</p>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label><FaUser /> Nombre Completo *</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className={`form-control ${errors.nombre ? 'error' : ''}`}
                      placeholder="Ej: Juan Pérez"
                    />
                    {errors.nombre && <span className="error-message"><FaExclamationCircle /> {errors.nombre}</span>}
                  </div>

                  <div className="form-group">
                    <label><FaIdCard /> Cédula de Ciudadanía *</label>
                    <input
                      type="text"
                      name="cedula"
                      value={formData.cedula}
                      onChange={handleChange}
                      className={`form-control ${errors.cedula ? 'error' : ''}`}
                      placeholder="Ej: 10203040"
                    />
                    {errors.cedula && <span className="error-message"><FaExclamationCircle /> {errors.cedula}</span>}
                  </div>

                  <div className="form-group">
                    <label><FaEnvelope /> Correo Electrónico *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-control ${errors.email ? 'error' : ''}`}
                      placeholder="ejemplo@correo.com"
                    />
                    {errors.email && <span className="error-message"><FaExclamationCircle /> {errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label><FaPhone /> Teléfono *</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className={`form-control ${errors.telefono ? 'error' : ''}`}
                      placeholder="Ej: 5551234567"
                    />
                    {errors.telefono && <span className="error-message"><FaExclamationCircle /> {errors.telefono}</span>}
                  </div>

                  <div className="form-group">
                    <label><FaStethoscope /> Especialidad *</label>
                    <select
                      name="especialidad"
                      value={formData.especialidad}
                      onChange={handleChange}
                      className={`form-control ${errors.especialidad ? 'error' : ''}`}
                    >
                      <option value="">Selecciona una especialidad</option>
                      {especialidades.map((esp) => (
                        <option key={esp.id} value={esp.id}>{esp.nombre}</option>
                      ))}
                    </select>
                    {errors.especialidad && <span className="error-message"><FaExclamationCircle /> {errors.especialidad}</span>}
                  </div>

                  <div className="form-group">
                    <label><FaUser /> Doctor *</label>
                    <select
                      name="doctor"
                      value={formData.doctor}
                      onChange={handleChange}
                      className={`form-control ${errors.doctor ? 'error' : ''}`}
                      disabled={!formData.especialidad}
                    >
                      <option value="">Selecciona un doctor</option>
                      {doctoresFiltrados.map((doc) => (
                        <option key={doc.id} value={doc.id}>{doc.nombre}</option>
                      ))}
                    </select>
                    {errors.doctor && <span className="error-message"><FaExclamationCircle /> {errors.doctor}</span>}
                  </div>

                  <div className="form-group">
                    <label><FaCalendarAlt /> Fecha *</label>
                    <input
                      type="date"
                      name="fecha"
                      value={formData.fecha}
                      onChange={handleChange}
                      className={`form-control ${errors.fecha ? 'error' : ''}`}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    {errors.fecha && <span className="error-message"><FaExclamationCircle /> {errors.fecha}</span>}
                  </div>

                  <div className="form-group">
                    <label><FaClock /> Hora *</label>
                    <select
                      name="hora"
                      value={formData.hora}
                      onChange={handleChange}
                      className={`form-control ${errors.hora ? 'error' : ''}`}
                    >
                      <option value="">Selecciona una hora</option>
                      {['08:00', '09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00'].map((hora, index) => (
                        <option key={index} value={hora}>{hora}</option>
                      ))}
                    </select>
                    {errors.hora && <span className="error-message"><FaExclamationCircle /> {errors.hora}</span>}
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>Motivo de la Consulta *</label>
                  <textarea
                    name="motivo"
                    value={formData.motivo}
                    onChange={handleChange}
                    className={`form-control ${errors.motivo ? 'error' : ''}`}
                    rows="4"
                    placeholder="Describe brevemente los síntomas o motivo de tu consulta..."
                  />
                  {errors.motivo && <span className="error-message"><FaExclamationCircle /> {errors.motivo}</span>}
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-submit" disabled={loading}>
                    {loading ? 'Procesando...' : 'Confirmar Cita'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="citas-form-container">
              <div className="form-header">
                <h2>Consulta tus Citas Registradas</h2>
                <p>Ingresa tu número de cédula para ver y gestionar tus citas</p>
              </div>

              <form onSubmit={handleConsultar} className="consulta-form">
                <div className="search-group-container">
                  <div className="form-group search-input-group">
                    <label><FaIdCard /> Número de Cédula</label>
                    <div className="search-input-wrapper">
                      <input
                        type="text"
                        value={cedulaBusqueda}
                        onChange={(e) => setCedulaBusqueda(e.target.value)}
                        className="form-control"
                        placeholder="Ej: 10203040"
                      />
                      <button type="submit" className="btn-search" disabled={buscandoCitas}>
                        {buscandoCitas ? 'Buscando...' : <><FaSearch /> Buscar</>}
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {mensajeConsulta && <p className="mensaje-consulta">{mensajeConsulta}</p>}

              {citasConsultadas.length > 0 && (
                <div className="citas-list-section">
                  <h3 className="citas-list-title">Tus Citas Encontradas ({citasConsultadas.length})</h3>
                  <div className="citas-paciente-grid">
                    {citasConsultadas.map((cita) => (
                      <motion.div 
                        key={cita.id} 
                        className={`cita-paciente-card ${cita.estado}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="cita-card-header">
                          <span className={`status-badge ${cita.estado}`}>
                            {cita.estado.toUpperCase()}
                          </span>
                          <span className="cita-fecha-hora">
                            <FaCalendarAlt /> {cita.fecha} &nbsp;&nbsp; <FaClock /> {cita.hora}
                          </span>
                        </div>
                        <div className="cita-card-body">
                          <p><strong>Paciente:</strong> {cita.nombre}</p>
                          <p><strong>Cédula:</strong> {cita.cedula}</p>
                          <p><strong>Doctor:</strong> {cita.doctor_nombre || 'No asignado'}</p>
                          <p><strong>Especialidad:</strong> {cita.especialidad_nombre || 'No asignada'}</p>
                          <p className="cita-motivo"><strong>Motivo:</strong> {cita.motivo}</p>
                        </div>
                        {cita.estado !== 'cancelada' && cita.estado !== 'completada' && (
                          <div className="cita-card-actions">
                            <button 
                              className="btn-cancel-appointment"
                              onClick={() => handleCancelarCita(cita.id)}
                            >
                              <FaTimesCircle /> Cancelar Cita
                            </button>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Citas;