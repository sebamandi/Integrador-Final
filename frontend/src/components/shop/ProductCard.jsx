import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ProductCard = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-64 object-contain p-4"
        />
        {product.freeShipping && (
          <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
            Envío gratis
          </span>
        )}
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h2>
        
        <div className="mb-4">
          {isExpanded ? (
            <>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <div>
                  <span className="font-semibold">Marca:</span> {product.brand}
                </div>
                <div>
                  <span className="font-semibold">Categoría:</span> {product.category}
                </div>
                <div>
                  <span className="font-semibold">Stock:</span> {product.stock} unidades
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-600">{product.shortDescription}</p>
          )}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center w-full text-gray-600 mb-4 hover:text-gray-800 transition-colors duration-300"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="mr-2" size={20} />
              <span>Ver menos</span>
            </>
          ) : (
            <>
              <ChevronDown className="mr-2" size={20} />
              <span>Ver más detalles</span>
            </>
          )}
        </button>

        <div className="mt-4 flex justify-between items-center">
          <div className="text-gray-800">
            <span className="text-2xl font-bold text-blue-600">
              ${product.price}
            </span>
            <p className={`text-sm mt-1 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? 'Stock disponible' : 'Sin stock'}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`
              px-4 py-2 rounded-lg transition-colors duration-300
              ${product.stock > 0 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-300 cursor-not-allowed text-gray-500'}
            `}
          >
            {product.stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;