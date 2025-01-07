export const validators = {
    required: (value) => !value ? 'Este campo es requerido' : '',
    
    minLength: (min) => (value) => 
      value && value.length < min ? `Debe tener al menos ${min} caracteres` : '',
    
    maxLength: (max) => (value) => 
      value && value.length > max ? `Debe tener máximo ${max} caracteres` : '',
    
    email: (value) => 
      value && !/\S+@\S+\.\S+/.test(value) ? 'Email inválido' : '',
    
    numeric: (value) => 
      value && isNaN(value) ? 'Debe ser un número' : '',
    
    positiveNumber: (value) => 
      value && Number(value) <= 0 ? 'Debe ser un número positivo' : '',
    
    phone: (value) => 
      value && !/^[\d\s()-]+$/.test(value) ? 'Número de teléfono inválido' : '',
    
    url: (value) => 
      value && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value) 
        ? 'URL inválida' : '',
    
    password: (value) => {
      if (!value) return '';
      const errors = [];
      if (value.length < 8) errors.push('al menos 8 caracteres');
      if (!/\d/.test(value)) errors.push('al menos un número');
      if (!/[a-z]/.test(value)) errors.push('al menos una minúscula');
      if (!/[A-Z]/.test(value)) errors.push('al menos una mayúscula');
      return errors.length ? `La contraseña debe tener ${errors.join(', ')}` : '';
    }
  };
  
  export const composeValidators = (...validators) => (value) => 
    validators.reduce((error, validator) => error || validator(value), '');