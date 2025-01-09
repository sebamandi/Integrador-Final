import React, { useState } from 'react';
import { useNotification } from '../context/NotificationContext';
import { contactService } from '../services/api';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { Mail, Phone, MapPin } from 'lucide-react';

function Contacto() {
  const { showNotification } = useNotification();
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    if (!value) {
      newErrors[name] = `${name} es requerido`;
    } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      newErrors[name] = 'El email no es válido';
    } else if (name === 'message' && value.length < 10) {
      newErrors[name] = 'El mensaje debe tener al menos 10 caracteres';
    } else {
      delete newErrors[name];
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar todos los campos
    Object.keys(formValues).forEach((key) => {
      validateField(key, formValues[key]);
    });

    if (Object.keys(errors).length > 0) {
      showNotification('Por favor corrige los errores', 'error');
      return;
    }

    try {
      setLoading(true);
      await contactService.sendContact(formValues);
      showNotification('Mensaje enviado correctamente', 'success');
      setSubmitted(true);
    } catch (error) {
      showNotification('Error al enviar el mensaje', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sección del Formulario de Contacto */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Formulario de Contacto</h2>
          {submitted ? (
            <div className="text-center">
              <h3 className="text-lg font-bold">¡Gracias por contactarnos!</h3>
              <p>Nos comunicaremos contigo pronto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <Input
                name="name"
                label="Nombre"
                value={formValues.name}
                onChange={handleChange}
                error={errors.name}
              />
              <Input
                name="email"
                label="Email"
                value={formValues.email}
                onChange={handleChange}
                error={errors.email}
              />
              <Input
                name="message"
                label="Mensaje"
                value={formValues.message}
                onChange={handleChange}
                error={errors.message}
                multiline
              />
              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar'}
              </Button>
            </form>
          )}
        </div>

        {/* Sección de Información de Contacto */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Información de Contacto</h2>
          <div className="mb-4 flex items-center">
            <MapPin className="mr-4 text-blue-500" />
            <p className="text-gray-600">Antonio Machado 1526, Montevideo, Uruguay</p>
          </div>
          <div className="mb-4 flex items-center">
            <Phone className="mr-4 text-blue-500" />
            <p className="text-gray-600">+598  099 123 456</p>
          </div>
          <div className="mb-4 flex items-center">
            <Mail className="mr-4 text-blue-500" />
            <p className="text-gray-600">contacto@charruashockey.com</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Horarios de Atención</h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="font-medium">Lunes a Viernes:</span>
                    <span className="text-gray-600">9:00 - 19:00</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Sábados:</span>
                    <span className="text-gray-600">9:00 - 14:00</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Domingos:</span>
                    <span className="text-gray-600">Cerrado</span>
                  </p>
                </div>
              </div>
      </div>
    </div>
    
  );
}

export default Contacto;
