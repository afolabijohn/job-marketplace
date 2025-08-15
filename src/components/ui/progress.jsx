import React from 'react';

export function Progress({ value = 0, className = '', ...props }) {
  return (
    <div className={`w-full bg-slate-200 rounded-full h-2 ${className}`} {...props}>
      <div 
        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
} 