export const CATEGORIES = [
    'Patines',
    'Protecciones',
    'Palos',
    'Cascos',
    'Guantes',
    'Accesorios'
  ];
  
  export const BRANDS = [
    'Bauer',
    'CCM',
    'Warrior',
    'Easton',
    'Sherwood',
    'STX'
  ];
  
  export const AGE_RANGES = [
    { from: 4, to: 8, label: 'Niños pequeños' },
    { from: 9, to: 12, label: 'Niños grandes' },
    { from: 13, to: 17, label: 'Adolescentes' },
    { from: 18, to: 99, label: 'Adultos' }
  ];
  
  export const API_ENDPOINTS = {
    PRODUCTS: '/api/products',
    CART: '/api/cart',
    CONTACT: '/api/contact',
    AUTH: '/api/auth'
  };
  
  export const LOCAL_STORAGE_KEYS = {
    CART: 'cart',
    USER: 'user',
    THEME: 'theme',
    LANGUAGE: 'language'
  };
  
  export const NOTIFICATION_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info',
    WARNING: 'warning'
  };
  
  export const VALIDATION_MESSAGES = {
    REQUIRED: 'Este campo es requerido',
    EMAIL: 'Ingrese un email válido',
    MIN_LENGTH: (min) => `Debe tener al menos ${min} caracteres`,
    MAX_LENGTH: (max) => `Debe tener máximo ${max} caracteres`,
    NUMERIC: 'Debe ser un número',
    POSITIVE: 'Debe ser un número positivo',
    PHONE: 'Número de teléfono inválido'
  };