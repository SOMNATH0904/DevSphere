
import React from 'react';

export const Card = ({ children, className }) => (
  <div className={`p-6 shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children }) => (
  <div className="p-4">{children}</div>
);

