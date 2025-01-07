import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Servicio de carrito modificado para no enviar token
export const cartService = {
  createCheckout: async (items) => {
    try {
      return await axios.post(`${API_URL}/cart/checkout`, { items });
    } catch (error) {
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
