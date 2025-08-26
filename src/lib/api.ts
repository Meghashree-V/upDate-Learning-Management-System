import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token from localStorage if present
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      // Merge headers safely to satisfy AxiosRequestHeaders typing
      const current = (config.headers ?? {}) as Record<string, any>;
      config.headers = { ...current, Authorization: `Bearer ${token}` } as any;
    }
  } catch {}
  return config;
});

export default api;
