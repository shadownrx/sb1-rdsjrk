import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export const login = (username: string, password: string) => api.post('/auth/login', { username, password });
export const register = (username: string, email: string, password: string, fsairlinesId: string) => api.post('/auth/register', { username, email, password, fsairlinesId });
export const getProfile = () => api.get('/users/profile');
export const getMedals = () => api.get('/medals');
export const getLicenses = () => api.get('/licenses');
export const getProducts = () => api.get('/products');
export const purchaseProduct = (productId: string) => api.post(`/products/purchase/${productId}`);
export const getRecentFlights = () => api.get('/flights/recent');

// Admin routes
export const getUsers = () => api.get('/users');
export const assignMedal = (userId: string, medalId: string) => api.post(`/medals/assign/${userId}`, { medalId });
export const assignLicense = (userId: string, licenseId: string) => api.post(`/licenses/assign/${userId}`, { licenseId });
export const createProduct = (productData: any) => api.post('/products', productData);

export default api;