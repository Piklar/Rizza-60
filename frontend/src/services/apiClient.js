import axios from 'axios';

/**
 * Axios instance pre-configured with the backend base URL.
 * Base URL is injected from the VITE_API_URL environment variable.
 * Usage: import apiClient from './services/apiClient';
 *        await apiClient.post('/api/rsvp', payload);
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

export default apiClient;
