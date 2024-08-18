import React from 'react';

const FormInput = ({ type, name, placeholder, onChange, value }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      style={{
        width: '100%',
        padding: '10px',
        margin: '8px 0',
        boxSizing: 'border-box',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#2A3556',
        color: 'white'
      }}
    />
  );
}

export default FormInput;
