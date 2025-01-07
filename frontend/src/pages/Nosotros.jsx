import React from 'react';
import { Heart, Package, Users } from 'lucide-react';

function Nosotros() {
  const features = [
    {
      icon: <Heart className="w-12 h-12 text-blue-600" />,
      title: 'Pasión por el Deporte',
      description: 'Nacemos desde nuestra pasión por el hockey, entendiendo las necesidades de los deportistas.'
    },
    {
      icon: <Package className="w-12 h-12 text-blue-600" />,
      title: 'Amplia Variedad',
      description: 'Contamos con una amplia variedad de stock, así como también de marcas y talles.'
    },
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: 'Personal Capacitado',
      description: 'Todos nuestros centros cuentan con personas capacitadas y a su total disposición.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nosotros
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Somos una empresa que nace desde su <span className="font-bold">pasión por el deporte</span>, 
            pensando siempre en hacer el hockey más accesible para todos.
          </p>
        </div>
      </section>

      {/* Misión */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Nuestra Misión</h2>
            <p className="text-gray-600 text-lg italic">
              "Que cada persona que quiera jugar, pueda acceder sin problemas a todo el equipamiento necesario."
            </p>
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-600 mb-6">
              Desde los inicios del deporte en el país hemos pasado por la necesidad y la falta de equipamiento 
              en nuestros alrededores y decidimos, pensando en las futuras generaciones, invertir para que nuestro 
              sueño de <span className="font-bold">tener una tienda de hockey a la vuelta de la esquina, sea posible!</span>
            </p>
            <p className="text-gray-600">
              En caso de no tener el producto que buscas, ¡lo conseguimos! Nuestro compromiso es brindarte 
              la mejor experiencia y el equipamiento que necesitas para tu desarrollo en el deporte.
            </p>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegirnos?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¡Encuentra tu equipamiento ideal!
          </h2>
          <p className="text-xl mb-8">
            Visita nuestra tienda y descubre todo lo que tenemos para ti
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Ver Productos
          </button>
        </div>
      </section>
    </div>
  );
}

export default Nosotros;