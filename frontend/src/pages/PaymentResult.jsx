import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

const PaymentResult = () => {
  const { status } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();
  const { showNotification } = useNotification();

  useEffect(() => {
    // Extract URL parameters
    const queryParams = new URLSearchParams(location.search);
    // eslint-disable-next-line no-unused-vars
    const paymentId = queryParams.get('payment_id');
    // eslint-disable-next-line no-unused-vars
    const merchantOrderId = queryParams.get('merchant_order_id');

    const handlePaymentResult = async () => {
      try {
        switch (status) {
          case 'success':
            // Clear cart only for successful payment
            clearCart();
            showNotification('¡Pago realizado con éxito!', 'success');
            break;
          
          case 'pending':
            showNotification('El pago está pendiente de confirmación', 'info');
            break;
          
          case 'failure':
            showNotification('Hubo un problema con el pago', 'error');
            break;
          
          default:
            showNotification('Estado de pago desconocido', 'error');
        }
      } catch (error) {
        console.error('Error procesando resultado de pago:', error);
        showNotification('Error al procesar el pago', 'error');
      }
    };

    handlePaymentResult();
  }, [status, clearCart, showNotification, location.search]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        {status === 'success' && (
          <div>
            <h2 className="text-3xl font-bold text-green-600 mb-4">¡Pago Exitoso!</h2>
            <p className="text-gray-700 mb-6">Tu compra ha sido procesada correctamente.</p>
          </div>
        )}

        {status === 'pending' && (
          <div>
            <h2 className="text-3xl font-bold text-yellow-600 mb-4">Pago Pendiente</h2>
            <p className="text-gray-700 mb-6">Tu pago está siendo procesado. Te mantendremos informado.</p>
          </div>
        )}

        {status === 'failure' && (
          <div>
            <h2 className="text-3xl font-bold text-red-600 mb-4">Pago Fallido</h2>
            <p className="text-gray-700 mb-6">Hubo un problema al procesar tu pago. Por favor, intenta nuevamente.</p>
          </div>
        )}

        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default PaymentResult;