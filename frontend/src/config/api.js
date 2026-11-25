// Centralized API configuration
// In local development, falls back to http://localhost:8000
// When deployed on Vercel, set VITE_API_URL in Vercel Project Settings > Environment Variables
export const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/+$/, '');
