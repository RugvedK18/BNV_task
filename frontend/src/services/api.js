import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });

// optionally add interceptors for error handling

export const fetchUsers = (page, limit, search) =>
  API.get(`/users?page=${page}&limit=${limit}&search=${search}`);
export const fetchUserById = (id) => API.get(`/users/${id}`);
export const createUser = (userData) => API.post('/users', userData);
export const updateUser = (id, userData) => API.put(`/users/${id}`, userData);
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const exportUsersCSV = (search) => API.get(`/users/export/csv?search=${search}`, { responseType: 'blob' });