
import React from 'react';

const Button = ({ children, className, variant, onClick }) => {
  const baseClass = "px-6 py-2 rounded text-lg font-semibold focus:outline-none transition-colors";
  const variantClass = variant === 'outline' 
    ? 'border-2 border-[#e0e0ff] text-[#e0e0ff] hover:bg-[#1bffb725] hover:text-[#0a0f2c]' 
     : 'bg-[#e0e0ff] text-[#0a0f2c] flex items-center gap-2 shadow-lg shadow-[#1bffb7] hover:bg-[#c2c2ff]';

  return (
    <button className={`${baseClass} ${variantClass} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
