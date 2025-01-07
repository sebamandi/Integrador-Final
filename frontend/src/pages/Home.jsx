import React from 'react';
import ProductList from '../components/shop/ProductList';
import { useProducts } from '../context/ProductContext';

// Importar imágenes
import image1 from '../assets/images/bauer vapo 3x pro 2.webp';
import image2 from '../assets/images/ccm casco.webp';
import image3 from '../assets/images/codera bauer supreme.webp';
import image4 from '../assets/images/guantes ccm.webp';
import image5 from '../assets/images/pads warrior.webp';
import image6 from '../assets/images/palo warrior.webp';

// Datos de productos con todas las descripciones
export const initialProducts = [
  {
    id: 1,
    name: 'Patines Bauer Vapor 3x Pro',
    price: 650,
    shortDescription: 'Patín de gama alta para un gran desempeño en cancha.',
    description: 'Patín de gama alta para un gran desempeño en cancha! Contamos con todos los talles!',
    imageUrl: image1,
    stock: 10,
    brand: 'Bauer',
    category: 'Patines'
  },
  {
    id: 2,
    name: 'Casco CCM 4500',
    price: 150,
    shortDescription: 'Casco de gama media, ideal para protección sin peso extra.',
    description: 'Casco de gama media, ideal para aquellos que quieran protegerse sin sumar peso extra. Consulte por talles especiales!',
    imageUrl: image2,
    stock: 8,
    brand: 'CCM',
    category: 'Cascos'
  },
  {
    id: 3,
    name: 'Coderas Bauer Supreme',
    price: 75,
    shortDescription: 'Coderas con protección de policarbonato.',
    description: 'Coderas de gama media, con protección de policarbonato para disminuir el peso sin perder seguridad! Cuenta con sujección de tres puntos para mayor confort!',
    imageUrl: image3,
    stock: 15,
    brand: 'Bauer',
    category: 'Protecciones'
  },
  {
    id: 4,
    name: 'Guantes CCM AS 580',
    price: 120,
    shortDescription: 'Guantes de gama alta con palma de doble capa.',
    description: 'Guante de gama alta, cuenta con palma de doble capa, fabricada con cuero sintético para un mejor grip y durabilidad. Tenemos todos los talles!',
    imageUrl: image4,
    stock: 12,
    brand: 'CCM',
    category: 'Guantes'
  },
  {
    id: 5,
    name: 'Pads Warrior LX Pro',
    price: 130,
    shortDescription: 'Pads de gama alta a precio especial.',
    description: 'Pads de gama alta a un precio especial! Modelo regular fit, para un mayor confort a la hora de jugar! Tenemos todos los talles!',
    imageUrl: image5,
    stock: 6,
    brand: 'Warrior',
    category: 'Protecciones'
  },
  {
    id: 6,
    name: 'Stick Warrior Alpha LX',
    price: 85,
    shortDescription: 'Palo de gama media-alta para mejor rendimiento.',
    description: 'Palo de gama media-alta, ideal para aquellos que necesiten llevar su tiro a los niveles más altos! Contamos con stock inmediato para zurdos o diestros, incluyendo 3 tipos de flex!',
    imageUrl: image6,
    stock: 20,
    brand: 'Warrior',
    category: 'Palos'
  }
];

function Home() {
  const { loading } = useProducts();

  return (
    <div className="min-h-screen bg-gray-50">
     

      <section className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <ProductList products={initialProducts} />
        )}
      </section>
    </div>
  );
}

export default Home;