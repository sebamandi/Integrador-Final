import React from 'react';
import { useFormValidation } from '../hooks/useFormValidation';
import { useProducts } from '../context/ProductContext';
import { useNotification } from '../context/NotificationContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const validationRules = {
  name: [
    value => !value ? 'El nombre es requerido' : '',
    value => value.length < 3 ? 'El nombre debe tener al menos 3 caracteres' : ''
  ],
  price: [
    value => !value ? 'El precio es requerido' : '',
    value => isNaN(value) || Number(value) <= 0 ? 'El precio debe ser un número positivo' : ''
  ],
  stock: [
    value => !value ? 'El stock es requerido' : '',
    value => isNaN(value) || Number(value) < 0 ? 'El stock no puede ser negativo' : ''
  ],
  brand: [
    value => !value ? 'La marca es requerida' : ''
  ],
  category: [
    value => !value ? 'La categoría es requerida' : ''
  ],
  shortDescription: [
    value => !value ? 'La descripción corta es requerida' : '',
    value => value.length > 100 ? 'La descripción corta no debe exceder los 100 caracteres' : ''
  ]
};

const initialValues = {
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
  image: null
};

function ProductForm() {
  const { addProduct } = useProducts();
  const { showNotification } = useNotification();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit
  } = useFormValidation(initialValues, validationRules);

  const onSubmit = async (formData) => {
    try {
      await addProduct(formData);
      showNotification('Producto creado exitosamente', 'success');
    } catch (error) {
      showNotification('Error al crear el producto', 'error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Alta de Producto</h1>
      
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit);
      }} className="space-y-6">
        <Input
          label="Nombre"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && errors.name}
          touched={touched.name}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Precio"
            name="price"
            type="number"
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.price && errors.price}
            touched={touched.price}
          />

          <Input
            label="Stock"
            name="stock"
            type="number"
            value={values.stock}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.stock && errors.stock}
            touched={touched.stock}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Marca"
            name="brand"
            value={values.brand}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.brand && errors.brand}
            touched={touched.brand}
          />

          <Input
            label="Categoría"
            name="category"
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.category && errors.category}
            touched={touched.category}
          />
        </div>

        <div className="space-y-4">
          <Input
            label="Descripción Corta"
            name="shortDescription"
            value={values.shortDescription}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.shortDescription && errors.shortDescription}
            touched={touched.shortDescription}
          />

          <div className="form-group">
            <label className="block mb-2 font-medium text-gray-700">
              Descripción Larga
            </label>
            <textarea
              name="longDescription"
              value={values.longDescription}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="4"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="freeShipping"
            checked={values.freeShipping}
            onChange={handleChange}
            className="rounded text-blue-600 focus:ring-blue-500"
          />
          <label className="text-gray-700">Envío sin cargo</label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Edad Desde"
            name="ageFrom"
            type="number"
            value={values.ageFrom}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <Input
            label="Edad Hasta"
            name="ageTo"
            type="number"
            value={values.ageTo}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div className="form-group">
          <label className="block mb-2 font-medium text-gray-700">
            Imagen del Producto
          </label>
          <input
            type="file"
            name="image"
            onChange={(e) => {
              handleChange({
                target: {
                  name: 'image',
                  value: e.target.files[0]
                }
              });
            }}
            className="w-full"
            accept="image/*"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
        >
          Crear Producto
        </Button>
      </form>
    </div>
  );
}

export default ProductForm;