import React, { useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import { X, Plus, Minus } from 'lucide-react';
import { cartService } from '../../services/api';
import Button from '../common/Button';

const CartModal = ({ isVisible, closeModal }) => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getTotal,
    clearCart 
  } = useCart();
  const { showNotification } = useNotification();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeModal]);

  const handleCheckout = async () => {
    try {
      if (cartItems.length === 0) {
        showNotification('El carrito está vacío', 'error');
        return;
      }

      const response = await cartService.createCheckout(cartItems);
      console.log('Respuesta del backend:', response.data);

      showNotification('Compra realizada con éxito', 'success');
      clearCart(); // Vaciar el carrito después de la compra
    } catch (error) {
      console.error('Error en checkout:', error);
      showNotification(
        error.message || 'Error al procesar el pago',
        'error'
      );
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={closeModal}
      />
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div 
            className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                Carrito de Compras
              </h2>
              <button 
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600">
                    Tu carrito está vacío
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center border-b pb-4 last:border-b-0"
                    >
                      <img 
                        src={item.imageUrl} 
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg mr-6"
                      />
                      <div className="flex-grow">
                        <h3 className="font-bold text-lg text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-gray-600">
                          ${item.price.toFixed(2)} c/u
                        </p>
                        <div className="flex items-center mt-2 space-x-3">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="bg-gray-200 text-gray-700 rounded-full p-1 
                              disabled:opacity-50 hover:bg-gray-300 transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-gray-800 font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bg-gray-200 text-gray-700 rounded-full p-1 
                              hover:bg-gray-300 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800 mt-2 text-sm"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="bg-gray-100 p-6 rounded-b-lg">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-bold text-gray-800">Total:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${getTotal().toFixed(2)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="secondary"
                    onClick={clearCart}
                  >
                    Vaciar Carrito
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0}
                  >
                    Finalizar Compra
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartModal;
