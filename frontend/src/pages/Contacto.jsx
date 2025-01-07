import React, { useState } from 'react';
import { useNotification } from '../context/NotificationContext';
import { contactService } from '../services/api';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

function Contacto() {
  const { showNotification } = useNotification();
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    validateField(name, formValues[name]);
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'name':
        if (!value) {
          newErrors.name = 'El nombre es requerido';
        } else if (value.length < 2) {
          newErrors.name = 'El nombre debe tener al menos 2 caracteres';
        } else {
          delete newErrors.name;
        }
        break;

      case 'email':
        if (!value) {
          newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = 'El email no es válido';
        } else {
          delete newErrors.email;
        }
        break;

      case 'message':
        if (!value) {
          newErrors.message = 'El mensaje es requerido';
        } else if (value.length < 10) {
          newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
        } else {
          delete newErrors.message;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Marcar todos los campos como tocados
    const allTouched = Object.keys(formValues).reduce(
      (acc, key) => ({ ...acc, [key]: true }), {}
    );
    setTouched(allTouched);

    // Validar todos los campos
    Object.keys(formValues).forEach(key => {
      validateField(key, formValues[key]);
    });

    // Si hay errores, no enviar
    if (Object.keys(errors).length > 0) {
      showNotification('Por favor, corrija los errores del formulario', 'error');
      return;
    }

    try {
      setLoading(true);
      await contactService.send(formValues);
      showNotification('Mensaje enviado exitosamente', 'success');
      setSubmitted(true);
    } catch (error) {
      showNotification(error.message || 'Error al enviar el mensaje', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="mb-4 text-green-500">
            <Send className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold mb-4">¡Gracias por contactarnos!</h2>
          <p className="text-gray-600">
            Nos comunicaremos contigo pronto.
          </p>
          <Button
            variant="primary"
            fullWidth
            className="mt-6"
            onClick={() => window.location.href = '/'}
          >
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Contacto</h1>
            <p className="text-gray-600">
              Estamos aquí para ayudarte. Envíanos tu mensaje.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Formulario */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Nombre"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && errors.name}
                  touched={touched.name}
                  placeholder="Tu nombre"
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formValues.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                  touched={touched.email}
                  placeholder="tu@email.com"
                />

                <div className="form-group">
                  <label className="block mb-2 font-medium text-gray-700">
                    Mensaje
                  </label>
                  <textarea
                    name="message"
                    value={formValues.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows="6"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2
                      ${touched.message && errors.message 
                        ? 'border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:ring-blue-200'}`}
                    placeholder="¿En qué podemos ayudarte?"
                  />
                  {touched.message && errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Enviar Mensaje'}
                </Button>
              </form>
            </div>

            {/* Información de contacto */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-6">Información de Contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-medium">Dirección</h4>
                      <p className="text-gray-600">Br. Artigas 1234, Montevideo</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-gray-600">consultas@charruashs.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-medium">Teléfono</h4>
                      <p className="text-gray-600">+598 99 123 456</p>
                    </div>
                  </div>
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
        </div>
      </div>
    </div>
  );
}

export default Contacto;