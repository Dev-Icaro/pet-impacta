// Constantes do projeto
export const APP_CONFIG = {
  name: 'Pet Impacta',
  description: 'Sistema de gestão para pets',
  version: '1.0.0',
} as const;

export const API_ENDPOINTS = {
  base: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  auth: '/auth',
  pets: '/pets',
  users: '/users',
} as const;

export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  pets: '/pets',
  profile: '/profile',
} as const;
