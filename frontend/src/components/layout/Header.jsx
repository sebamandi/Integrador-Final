import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartModal from '../shop/CartModal';
import logo from '../../assets/images/logo (2).png';

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cartItems } = useCart();

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        {/* Primera sección: Logo y título */}
        <div className="flex items-center py-4">
          {/* Logo a la izquierda */}
          <div className="flex-shrink-0">
            <img 
              src={logo} 
              alt="Logo de hockey shop" 
              className="h-48 w-auto"
            />
          </div>

          {/* Título centrado */}
          <div className="flex-grow text-center">
            <h1 className="text-5xl font-bold">Charrúas Hockey Shop</h1>
            <p className="text-gray-300">Tu tienda especializada en equipamiento de hockey</p>
          </div>

          {/* Espacio equivalente al logo para mantener el centrado */}
          <div className="flex-shrink-0 w-48"></div>
        </div>

        {/* Segunda sección: Navegación y carrito */}
        <div className="flex justify-between items-center py-2 border-t border-gray-700">
          {/* Espacio a la izquierda para centrar la navegación */}
          <div className="w-48"></div>

          {/* Navegación centrada */}
          <nav className="hidden md:flex flex-grow justify-center space-x-6 text-lg">
            <Link to="/" className="hover:text-gray-300">Inicio</Link>
            <Link to="/alta" className="hover:text-gray-300">Alta de Productos</Link>
            <Link to="/contacto" className="hover:text-gray-300">Contacto</Link>
            <Link to="/nosotros" className="hover:text-gray-300">Nosotros</Link>
          </nav>

          {/* Carrito a la derecha */}
          <button 
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="flex items-center space-x-2 bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 text-lg w-48 justify-center"
          >
            <span>🛒</span>
            <span>{cartItems.length}</span>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <CartModal
          isVisible={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </header>
  );
}

export default Header;