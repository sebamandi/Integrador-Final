import React, { useState } from 'react';
import { useNotification } from '../context/NotificationContext';
import { productService } from '../services/api';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { Plus, Upload } from 'lucide-react';
import { CATEGORIES, BRANDS, } from '../utils/constants';

function Alta() {
  const { showNotification } = useNotification();
  const [formValues, setFormValues] = useState({
    name: '',
    price: '',
    stock: '',
    brand: '',
    category: '',
    shortDescription: '',
    longDescription: '',
    freeShipping: false,
    ageFrom: '',
    ageTo: '',
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const newValue = type === 'checkbox' ? checked : 
                     type === 'file' ? files[0] : value;
    
    setFormValues({
      ...formValues,
      [name]: newValue
    });

    if (touched[name]) {
      validateField(name, newValue);
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
        if (!value) newErrors.name = 'El nombre es requerido';
        else if (value.length < 3) newErrors.name = 'El nombre debe tener al menos 3 caracteres';
        else delete newErrors.name;
        break;
      
      case 'price':
        if (!value) newErrors.price = 'El precio es requerido';
        else if (isNaN(value) || Number(value) <= 0) newErrors.price = 'El precio debe ser un número positivo';
        else delete newErrors.price;
        break;
      
      case 'stock':
        if (!value) newErrors.stock = 'El stock es requerido';
        else if (isNaN(value) || Number(value) < 0) newErrors.stock = 'El stock debe ser un número no negativo';
        else delete newErrors.stock;
        break;

      case 'brand':
        if (!value) newErrors.brand = 'La marca es requerida';
        else delete newErrors.brand;
        break;

      case 'category':
        if (!value) newErrors.category = 'La categoría es requerida';
        else delete newErrors.category;
        break;

      case 'shortDescription':
        if (!value) newErrors.shortDescription = 'La descripción corta es requerida';
        else if (value.length > 200) newErrors.shortDescription = 'La descripción corta no puede superar 200 caracteres';
        else delete newErrors.shortDescription;
        break;

      case 'image':
        if (!value) newErrors.image = 'La imagen es requerida';
        else if (!(value instanceof File)) newErrors.image = 'Debe seleccionar un archivo de imagen';
        else if (value.size > 5000000) newErrors.image = 'La imagen no debe superar 5MB';
        else delete newErrors.image;
        break;

      case 'ageFrom':
        if (value && (isNaN(value) || Number(value) < 0)) {
          newErrors.ageFrom = 'La edad debe ser un número positivo';
        } else delete newErrors.ageFrom;
        break;

      case 'ageTo':
        if (value && (isNaN(value) || Number(value) < Number(formValues.ageFrom))) {
          newErrors.ageTo = 'La edad hasta debe ser mayor que la edad desde';
        } else delete newErrors.ageTo;
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

    // Verificar si hay errores
    const currentErrors = { ...errors };
    Object.keys(formValues).forEach(key => {
      validateField(key, formValues[key]);
      if (errors[key]) currentErrors[key] = errors[key];
    });

    // Si hay errores, no enviar
    if (Object.keys(currentErrors).length > 0) {
      showNotification('Por favor, corrija los errores del formulario', 'error');
      return;
    }

    // Preparar datos para envío
    const formData = new FormData();
    Object.keys(formValues).forEach(key => {
      if (key === 'image' && formValues[key]) {
        formData.append(key, formValues[key]);
      } else if (key !== 'image') {
        formData.append(key, formValues[key]);
      }
    });

    try {
      setLoading(true);
      await productService.create(formData);
      showNotification('Producto creado exitosamente', 'success');
      
      // Reiniciar formulario
      setFormValues({
        name: '',
        price: '',
        stock: '',
        brand: '',
        category: '',
        shortDescription: '',
        longDescription: '',
        freeShipping: false,
        ageFrom: '',
        ageTo: '',
        image: null,
      });
      setTouched({});
    } catch (error) {
      showNotification(error.message || 'Error al crear el producto', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <Plus className="text-blue-600" />
          Alta de Producto
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          <Input
            label="Nombre del producto"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && errors.name}
            touched={touched.name}
            placeholder="Ej: Palo de Hockey Bauer Supreme"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Precio ($)"
              name="price"
              type="number"
              value={formValues.price}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.price && errors.price}
              touched={touched.price}
              placeholder="0.00"
            />

            <Input
              label="Stock"
              name="stock"
              type="number"
              value={formValues.stock}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.stock && errors.stock}
              touched={touched.stock}
              placeholder="0"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block mb-2 font-medium text-gray-700">
                Marca
              </label>
              <select
                name="brand"
                value={formValues.brand}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-2 border rounded-lg ${
                  touched.brand && errors.brand ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Seleccionar marca</option>
                {BRANDS.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
              {touched.brand && errors.brand && (
                <p className="mt-1 text-sm text-red-500">{errors.brand}</p>
              )}
            </div>

            <div className="form-group">
              <label className="block mb-2 font-medium text-gray-700">
                Categoría
              </label>
              <select
                name="category"
                value={formValues.category}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-2 border rounded-lg ${
                  touched.category && errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Seleccionar categoría</option>
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {touched.category && errors.category && (
                <p className="mt-1 text-sm text-red-500">{errors.category}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="form-group">
              <label className="block mb-2 font-medium text-gray-700">
                Descripción corta
              </label>
              <textarea
                name="shortDescription"
                value={formValues.shortDescription}
                onChange={handleChange}
                onBlur={handleBlur}
                rows="2"
                className={`w-full p-2 border rounded-lg ${
                  touched.shortDescription && errors.shortDescription ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Breve descripción del producto"
              />
              {touched.shortDescription && errors.shortDescription && (
                <p className="mt-1 text-sm text-red-500">{errors.shortDescription}</p>
              )}
            </div>

            <div className="form-group">
              <label className="block mb-2 font-medium text-gray-700">
                Descripción larga
              </label>
              <textarea
                name="longDescription"
                value={formValues.longDescription}
                onChange={handleChange}
                onBlur={handleBlur}
                rows="4"
                className={`w-full p-2 border rounded-lg ${
                  touched.longDescription && errors.longDescription ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Descripción detallada del producto"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="freeShipping"
              name="freeShipping"
              checked={formValues.freeShipping}
              onChange={handleChange}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="freeShipping" className="text-gray-700">
              Envío sin cargo
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Edad desde"
              name="ageFrom"
              type="number"
              value={formValues.ageFrom}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.ageFrom && errors.ageFrom}
              touched={touched.ageFrom}
              placeholder="Edad mínima"
            />

            <Input
              label="Edad hasta"
              name="ageTo"
              type="number"
              value={formValues.ageTo}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.ageTo && errors.ageTo}
              touched={touched.ageTo}
              placeholder="Edad máxima"
            />
          </div>

          <div className="form-group">
            <label className="block mb-2 font-medium text-gray-700">
              Foto del producto
            </label>
            <div className={`border-2 border-dashed rounded-lg p-4 text-center ${
              touched.image && errors.image ? 'border-red-500' : 'border-gray-300'
            }`}>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                className="hidden"
                accept="image/*"
              />
              <label htmlFor="image" className="cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Click para seleccionar una imagen
                </p>
              </label>
              {formValues.image && (
                <p className="mt-2 text-sm text-gray-600">
                  Archivo seleccionado: {formValues.image.name}
                </p>
              )}
            </div>
            {touched.image && errors.image && (
              <p className="mt-1 text-sm text-red-500">{errors.image}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Creando Producto...' : 'Crear Producto'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Alta;