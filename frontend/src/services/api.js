// src/services/api.js
const API_BASE_URL = 'http://localhost:8000/api';

// Configuración de headers por defecto
const defaultHeaders = {
  'Content-Type': 'application/json',
};

// Función helper para hacer requests
async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: defaultHeaders,
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error en ${endpoint}:`, error);
    throw error;
  }
}

// Servicios de Especialidades
export const especialidadesService = {
  getAll: () => apiFetch('/especialidades/'),
  getById: (id) => apiFetch(`/especialidades/${id}/`),
  create: (data) => apiFetch('/especialidades/', { 
    method: 'POST', 
    body: JSON.stringify(data) 
  }),
  update: (id, data) => apiFetch(`/especialidades/${id}/`, { 
    method: 'PUT', 
    body: JSON.stringify(data) 
  }),
  delete: (id) => apiFetch(`/especialidades/${id}/`, { 
    method: 'DELETE' 
  }),
  getLista: () => apiFetch('/especialidades/lista_completa/'),
};

// Servicios de Doctores
export const doctoresService = {
  getAll: () => apiFetch('/doctores/'),
  getById: (id) => apiFetch(`/doctores/${id}/`),
  create: (data) => apiFetch('/doctores/', { 
    method: 'POST', 
    body: JSON.stringify(data) 
  }),
  update: (id, data) => apiFetch(`/doctores/${id}/`, { 
    method: 'PUT', 
    body: JSON.stringify(data) 
  }),
  delete: (id) => apiFetch(`/doctores/${id}/`, { 
    method: 'DELETE' 
  }),
  getDisponibles: () => apiFetch('/doctores/disponibles/'),
  getPorEspecialidad: (especialidadId) => 
    apiFetch(`/doctores/por_especialidad/?especialidad_id=${especialidadId}`),
};

// Servicios de Citas
export const citasService = {
  getAll: () => apiFetch('/citas/'),
  getById: (id) => apiFetch(`/citas/${id}/`),
  getByCedula: (cedula) => apiFetch(`/citas/?cedula=${encodeURIComponent(cedula)}`),
  create: (data) => apiFetch('/citas/', { 
    method: 'POST', 
    body: JSON.stringify(data) 
  }),
  update: (id, data) => apiFetch(`/citas/${id}/`, { 
    method: 'PUT', 
    body: JSON.stringify(data) 
  }),
  patch: (id, data) => apiFetch(`/citas/${id}/`, { 
    method: 'PATCH', 
    body: JSON.stringify(data) 
  }),
  delete: (id) => apiFetch(`/citas/${id}/`, { 
    method: 'DELETE' 
  }),
  getPendientes: () => apiFetch('/citas/pendientes/'),
  getPorDoctor: (doctorId) => 
    apiFetch(`/citas/por_doctor/?doctor_id=${doctorId}`),
  crearRapida: (data) => apiFetch('/citas/crear_rapida/', { 
    method: 'POST', 
    body: JSON.stringify(data) 
  }),
};
