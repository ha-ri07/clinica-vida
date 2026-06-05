// src/pages/AdminCitas.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarCheck, FaHourglassHalf, FaCheckDouble, FaBan, FaCalendarAlt, 
  FaUser, FaEnvelope, FaPhone, FaIdCard, FaSearch, FaFilter, FaSync, 
  FaTrashAlt, FaCheck, FaTimes, FaBriefcaseMedical 
} from 'react-icons/fa';
import { citasService, especialidadesService, doctoresService } from '../services/api';
import './AdminCitas.css';

const AdminCitas = () => {
  const [citas, setCitas] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados de filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEspecialidad, setFilterEspecialidad] = useState('');
  const [filterDoctor, setFilterDoctor] = useState('');
  const [filterEstado, setFilterEstado] = useState('');

  // Cargar datos al montar
  const cargarDatos = async () => {
    try {
      setLoading(true);
      setError(null);
      const [citasData, especData, docData] = await Promise.all([
        citasService.getAll(),
        especialidadesService.getAll(),
        doctoresService.getAll()
      ]);
      setCitas(citasData);
      setEspecialidades(especData);
      setDoctores(docData);
    } catch (err) {
      console.error('Error al cargar datos de administración:', err);
      setError('Ocurrió un error al cargar la información. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // Actualizar estado de cita
  const handleCambiarEstado = async (id, nuevoEstado) => {
    try {
      await citasService.patch(id, { estado: nuevoEstado });
      // Actualizar localmente el estado de la cita modificada
      setCitas(prevCitas => 
        prevCitas.map(cita => 
          cita.id === id ? { ...cita, estado: nuevoEstado } : cita
        )
      );
    } catch (err) {
      console.error(`Error al cambiar estado a ${nuevoEstado}:`, err);
      alert('No se pudo actualizar el estado de la cita.');
    }
  };

  // Eliminar cita
  const handleEliminarCita = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar permanentemente esta cita de la base de datos?')) {
      try {
        await citasService.delete(id);
        setCitas(prevCitas => prevCitas.filter(cita => cita.id !== id));
      } catch (err) {
        console.error('Error al eliminar cita:', err);
        alert('No se pudo eliminar la cita.');
      }
    }
  };

  // Lógica de filtrado
  const citasFiltradas = citas.filter(cita => {
    const matchesSearch = 
      (cita.nombre?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (cita.email?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (cita.cedula?.includes(searchTerm));
      
    const matchesEspecialidad = filterEspecialidad === '' || cita.especialidad === parseInt(filterEspecialidad);
    const matchesDoctor = filterDoctor === '' || cita.doctor === parseInt(filterDoctor);
    const matchesEstado = filterEstado === '' || cita.estado === filterEstado;

    return matchesSearch && matchesEspecialidad && matchesDoctor && matchesEstado;
  });

  // Métricas rápidas
  const totalCitas = citas.length;
  const pendientes = citas.filter(c => c.estado === 'pendiente').length;
  const confirmadas = citas.filter(c => c.estado === 'confirmada').length;
  const canceladas = citas.filter(c => c.estado === 'cancelada').length;

  return (
    <div className="admin-citas-page">
      <section className="hero-admin">
        <div className="container">
          <div className="hero-admin-content">
            <h1>Administración de Citas</h1>
            <p>Monitorea y gestiona las solicitudes de citas de todos los pacientes en tiempo real</p>
            <button className="btn-sync" onClick={cargarDatos} title="Sincronizar datos">
              <FaSync className={loading ? 'spin' : ''} /> Actualizar
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {error && <div className="admin-error-message">{error}</div>}

          {/* Tarjetas de Métricas */}
          <div className="metrics-grid">
            <motion.div 
              className="metric-card total"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="metric-icon"><FaCalendarCheck /></div>
              <div className="metric-info">
                <h3>Total Registradas</h3>
                <span className="metric-number">{totalCitas}</span>
              </div>
            </motion.div>

            <motion.div 
              className="metric-card pendiente"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="metric-icon"><FaHourglassHalf /></div>
              <div className="metric-info">
                <h3>Pendientes</h3>
                <span className="metric-number">{pendientes}</span>
              </div>
            </motion.div>

            <motion.div 
              className="metric-card confirmada"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="metric-icon"><FaCheckDouble /></div>
              <div className="metric-info">
                <h3>Confirmadas</h3>
                <span className="metric-number">{confirmadas}</span>
              </div>
            </motion.div>

            <motion.div 
              className="metric-card cancelada"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="metric-icon"><FaBan /></div>
              <div className="metric-info">
                <h3>Canceladas</h3>
                <span className="metric-number">{canceladas}</span>
              </div>
            </motion.div>
          </div>

          {/* Filtros y Buscador */}
          <div className="filters-container">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Buscar por paciente, cédula o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filters-grid">
              <div className="filter-group">
                <label><FaFilter /> Especialidad</label>
                <select 
                  value={filterEspecialidad} 
                  onChange={(e) => setFilterEspecialidad(e.target.value)}
                >
                  <option value="">Todas</option>
                  {especialidades.map(esp => (
                    <option key={esp.id} value={esp.id}>{esp.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label><FaUser /> Doctor</label>
                <select 
                  value={filterDoctor} 
                  onChange={(e) => setFilterDoctor(e.target.value)}
                >
                  <option value="">Todos</option>
                  {doctores.map(doc => (
                    <option key={doc.id} value={doc.id}>{doc.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label><FaHourglassHalf /> Estado</label>
                <select 
                  value={filterEstado} 
                  onChange={(e) => setFilterEstado(e.target.value)}
                >
                  <option value="">Todos</option>
                  <option value="pendiente">Pendientes</option>
                  <option value="confirmada">Confirmadas</option>
                  <option value="completada">Completadas</option>
                  <option value="cancelada">Canceladas</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tabla de Citas */}
          {loading ? (
            <div className="admin-loading">Cargando citas...</div>
          ) : citasFiltradas.length === 0 ? (
            <div className="admin-no-results">No se encontraron citas con los filtros aplicados.</div>
          ) : (
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Paciente / Cédula</th>
                    <th>Contacto</th>
                    <th>Especialidad / Doctor</th>
                    <th>Fecha / Hora</th>
                    <th>Estado</th>
                    <th>Acciones Administrativas</th>
                  </tr>
                </thead>
                <tbody>
                  {citasFiltradas.map(cita => (
                    <tr key={cita.id} className={`table-row-${cita.estado}`}>
                      <td>
                        <div className="patient-name">{cita.nombre}</div>
                        <div className="patient-id"><FaIdCard /> {cita.cedula || 'Sin cédula'}</div>
                      </td>
                      <td>
                        <div className="patient-contact"><FaEnvelope /> {cita.email}</div>
                        <div className="patient-contact"><FaPhone /> {cita.telefono}</div>
                      </td>
                      <td>
                        <div className="med-spec"><FaBriefcaseMedical /> {cita.especialidad_nombre || 'No asignado'}</div>
                        <div className="med-doc"><FaUser /> {cita.doctor_nombre || 'No asignado'}</div>
                      </td>
                      <td>
                        <div className="appointment-date"><FaCalendarAlt /> {cita.fecha}</div>
                        <div className="appointment-time"><FaSync /> {cita.hora}</div>
                      </td>
                      <td>
                        <span className={`status-badge ${cita.estado}`}>
                          {cita.estado.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons-group">
                          {cita.estado === 'pendiente' && (
                            <button 
                              className="btn-action confirm" 
                              onClick={() => handleCambiarEstado(cita.id, 'confirmada')}
                              title="Confirmar Cita"
                            >
                              <FaCheck /> Confirmar
                            </button>
                          )}
                          
                          {cita.estado === 'confirmada' && (
                            <button 
                              className="btn-action complete" 
                              onClick={() => handleCambiarEstado(cita.id, 'completada')}
                              title="Marcar como Completada"
                            >
                              <FaCheckDouble /> Completar
                            </button>
                          )}

                          {cita.estado !== 'cancelada' && cita.estado !== 'completada' && (
                            <button 
                              className="btn-action cancel" 
                              onClick={() => handleCambiarEstado(cita.id, 'cancelada')}
                              title="Cancelar Cita"
                            >
                              <FaTimes /> Cancelar
                            </button>
                          )}

                          <button 
                            className="btn-action delete" 
                            onClick={() => handleEliminarCita(cita.id)}
                            title="Eliminar permanentemente"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminCitas;
