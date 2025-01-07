export const formatters = {
    currency: (value, currency = 'USD', locale = 'es-UY') => {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
      }).format(value);
    },
  
    date: (value, options = {}, locale = 'es-UY') => {
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options
      }).format(new Date(value));
    },
  
    number: (value, options = {}, locale = 'es-UY') => {
      return new Intl.NumberFormat(locale, options).format(value);
    },
  
    percentage: (value, decimals = 2, locale = 'es-UY') => {
      return new Intl.NumberFormat(locale, {
        style: 'percent',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }).format(value / 100);
    },
  
    truncateText: (text, maxLength = 100) => {
      if (!text || text.length <= maxLength) return text;
      return `${text.substring(0, maxLength)}...`;
    },
  
    capitalize: (text) => {
      if (!text) return '';
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    },
  
    phoneNumber: (number) => {
      if (!number) return '';
      const cleaned = ('' + number).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/);
      if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
      }
      return number;
    }
  };