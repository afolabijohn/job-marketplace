import React from 'react';

export function Select({ children, className = '', ...props }) {
  return (
    <select className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} {...props}>
      {children}
    </select>
  );
}

export function SelectContent({ children, className = '', ...props }) {
  return <div className={`${className}`} {...props}>{children}</div>;
}

export function SelectItem({ children, className = '', ...props }) {
  return <option className={`${className}`} {...props}>{children}</option>;
}

export function SelectTrigger({ children, className = '', ...props }) {
  return <div className={`${className}`} {...props}>{children}</div>;
}

export function SelectValue({ placeholder, className = '', ...props }) {
  return <span className={`${className}`} {...props}>{placeholder}</span>;
} 