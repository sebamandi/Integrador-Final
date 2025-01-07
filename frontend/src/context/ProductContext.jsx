import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { useNotification } from './NotificationContext';
import { initialProducts } from '../pages/Home';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showNotification } = useNotification();

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      // En una implementación real, aquí harías una llamada a la API
      // Por ahora usamos los productos iniciales
      setProducts(initialProducts);
      setError(null);
    } catch (err) {
      setError('Error al cargar los productos');
      showNotification('Error al cargar los productos', 'error');
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const addProduct = async (productData) => {
    try {
      setLoading(true);
      // En una implementación real, aquí harías una llamada POST a la API
      const newProduct = {
        ...productData,
        id: Date.now(), // Generamos un ID temporal
      };
      setProducts(prev => [...prev, newProduct]);
      showNotification('Producto creado exitosamente', 'success');
      return newProduct;
    } catch (err) {
      showNotification('Error al crear el producto', 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      setLoading(true);
      // En una implementación real, aquí harías una llamada PUT a la API
      setProducts(prev =>
        prev.map(product =>
          product.id === id ? { ...product, ...productData } : product
        )
      );
      showNotification('Producto actualizado exitosamente', 'success');
    } catch (err) {
      showNotification('Error al actualizar el producto', 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      // En una implementación real, aquí harías una llamada DELETE a la API
      setProducts(prev => prev.filter(product => product.id !== id));
      showNotification('Producto eliminado exitosamente', 'success');
    } catch (err) {
      showNotification('Error al eliminar el producto', 'error');
      throw err;
    }
  };

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      error,
      addProduct,
      updateProduct,
      deleteProduct,
      refreshProducts: loadProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};