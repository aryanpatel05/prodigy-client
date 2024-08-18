import React from 'react';

const Button = ({ type, text }) => {
  return (
    <button
      type={type}
      style={{
        width: '50%',
        padding: '10px',
        margin: '8px 0',
        boxSizing: 'border-box',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#3B76EF',
        color: 'white',
        cursor: 'pointer',
        alignSelf: 'center',  // Centering the button
      }}
    >
      {text}
    </button>
  );
}

export default Button;
