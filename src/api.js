import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Axios instance for JSON requests
export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json', // only for JSON requests
  },
});

// ===== Helper: safe GET =====
export async function safeGet(url, params) {
  try {
    const res = await api.get(url, { params });
    return [res.data, null];
  } catch (err) {
    return [null, err?.response?.data || err.message];
  }
}

// ===== Helper: safe POST =====
export async function safePost(url, body) {
  try {
    // Detect if body is FormData (for file uploads)
    const isFormData = body instanceof FormData;

    const res = await axios.post(baseURL + url, body, isFormData ? {
      // Let the browser set the correct multipart/form-data headers automatically
      headers: {}
    } : {}); // JSON requests use default axios instance headers

    return [res.data, null];
  } catch (err) {
    return [null, err?.response?.data || err.message];
  }
}
