import { api } from './api.js';
import { USER_KEY } from './config.js';

export async function login(username, password, role) {
  try {
    const response = await api.post('/auth/login', { username, password, role }, false);
    api.setToken(response.access_token);
    localStorage.setItem(USER_KEY, JSON.stringify(response.user));
    return response.user;
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
}

export async function register(userData) {
  try {
    return await api.post('/auth/register', userData, false);
  } catch (error) {
    throw new Error(error.message || 'Registration failed');
  }
}

export function logout() {
  api.clearToken();
  localStorage.removeItem(USER_KEY);
  window.location.href = 'index.html';
}

export function getCurrentUser() {
  const userStr = localStorage.getItem(USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
}

export function isAuthenticated() {
  return !!api.getToken() && !!getCurrentUser();
}