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

// Servicios de productos
export const productService = {
  create: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/products`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Producto creado:', response.data);
      return response;
    } catch (error) {
      console.error('Error al crear producto:', error.response || error.message);
      throw new Error(error.response?.data?.message || 'Error al crear producto');
    }
  },
};

// Servicio de contacto
export const contactService = {
  sendContact: async (contactData) => {
    try {
      const response = await axios.post(`${API_URL}/contact`, contactData);
      return response;
    } catch (error) {
      console.error('Error al enviar contacto:', error.response || error.message);
      throw new Error(error.response?.data?.message || 'Error al enviar el mensaje de contacto');
    }
  },
};
