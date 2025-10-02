import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't redirect if it's a login request
    const isLoginRequest = error.config.url.includes('/auth/login');
    
    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
  changePassword: (passwordData) => api.put('/auth/password', passwordData),
};

// Events API
export const eventsAPI = {
  getAll: (params) => api.get('/events', { params }),
  getById: (id) => api.get(`/events/${id}`),
  create: (eventData) => api.post('/events', eventData),
  update: (id, eventData) => api.put(`/events/${id}`, eventData),
  delete: (id) => api.delete(`/events/${id}`),
  register: (id) => api.post(`/events/${id}/register`),
  save: (id) => api.post(`/events/${id}/save`),
};

// Clubs API
export const clubsAPI = {
  getAll: () => api.get('/clubs'),
  getById: (id) => api.get(`/clubs/${id}`),
  create: (clubData) => api.post('/clubs', clubData),
  update: (id, clubData) => api.put(`/clubs/${id}`, clubData),
  delete: (id) => api.delete(`/clubs/${id}`),
  join: (id) => api.post(`/clubs/${id}/join`),
  leave: (id) => api.post(`/clubs/${id}/leave`),
};

// Admin API
export const adminAPI = {
  getAdmins: () => api.get('/admin/admins'),
  createAdmin: (adminData) => api.post('/admin/admins', adminData),
  updateAdmin: (id, adminData) => api.put(`/admin/admins/${id}`, adminData),
  deleteAdmin: (id) => api.delete(`/admin/admins/${id}`),
  getStudents: (params) => api.get('/admin/students', { params }),
  blockStudent: (id) => api.put(`/admin/students/${id}/block`),
  unblockStudent: (id) => api.put(`/admin/students/${id}/unblock`),
  deleteStudent: (id) => api.delete(`/admin/students/${id}`),
};

// Students API
export const studentsAPI = {
  getProfile: () => api.get('/students/profile'),
  getAppliedEvents: () => api.get('/students/applied-events'),
  getSavedEvents: () => api.get('/students/saved-events'),
  getRegisteredEvents: () => api.get('/students/registered-events'),
};

export default api;