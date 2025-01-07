import React from 'react';

const Input = ({
  label,
  error,
  touched,
  type = 'text',
  id,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  className = '',
  ...props
}) => {
  const inputClasses = `
    w-full px-3 py-2 rounded-lg border
    focus:outline-none focus:ring-2
    ${touched && error 
      ? 'border-red-500 focus:ring-red-200' 
      : 'border-gray-300 focus:ring-blue-200'}
    ${className}
  `;

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block mb-2 font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={inputClasses}
        {...props}
      />
      {touched && error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;