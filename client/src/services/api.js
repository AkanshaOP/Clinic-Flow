import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001/api',
});

export const getStats = () => api.get('/stats');
export const getPatients = () => api.get('/patients');
export const getAppointments = () => api.get('/appointments');
export const createAppointment = (data) => api.post('/appointments', data);

export default api;
