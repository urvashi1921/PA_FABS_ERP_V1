import { API_BASE_URL, AUTH_TOKEN_KEY } from './config.js';

const api = {
  async get(endpoint, requireAuth = true) {
    const headers = { 'Content-Type': 'application/json' };
    if (requireAuth) {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) throw new Error('No authentication token');
      headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(error.detail || 'Request failed');
    }
    return response.json();
  },

  async post(endpoint, data, requireAuth = true) {
    const headers = { 'Content-Type': 'application/json' };
    if (requireAuth) {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) throw new Error('No authentication token');
      headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(error.detail || 'Request failed');
    }
    return response.json();
  },

  async put(endpoint, data, requireAuth = true) {
    const headers = { 'Content-Type': 'application/json' };
    if (requireAuth) {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) throw new Error('No authentication token');
      headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(error.detail || 'Request failed');
    }
    return response.json();
  },

  async delete(endpoint, requireAuth = true) {
    const headers = { 'Content-Type': 'application/json' };
    if (requireAuth) {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) throw new Error('No authentication token');
      headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(error.detail || 'Request failed');
    }
    return response.json();
  },

  getToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  setToken(token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  },

  clearToken() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
};