import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

// Servicio de carrito
export const cartService = {
  createCheckout: async (items) => {
    try {
      const response = await axios.post(`${API_URL}/cart/checkout`, { items });
      console.log('Respuesta del backend:', response.data);
      return response;
    } catch (error) {
      console.error('Error al procesar el checkout:', error.response || error.message);
      throw new Error(error.response?.data?.message || 'Error al procesar el checkout');
    }
  },
};

// Servicios adicionales (sin cambios en esta versión)
export const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token); // Guardar el token en localStorage
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  },
};

export const productService = {
  createProduct: async (productData) => {
    try {
      return await axios.post(`${API_URL}/products`, productData);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear el producto');
    }
  },
};

export const contactService = {
  sendContact: async (contactData) => {
    try {
      return await axios.post(`${API_URL}/contact`, contactData);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al enviar el mensaje de contacto');
    }
  },
};
