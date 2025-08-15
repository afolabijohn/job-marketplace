import React, { useState } from 'react';

export function Tabs({ children, defaultValue, className = '', ...props }) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  return (
    <div className={className} {...props}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        return child;
      })}
    </div>
  );
}

export function TabsList({ children, className = '', ...props }) {
  return (
    <div className={`flex space-x-1 rounded-lg bg-slate-100 p-1 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function TabsTrigger({ children, value, activeTab, setActiveTab, className = '', ...props }) {
  const isActive = activeTab === value;
  
  return (
    <button
      className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
        isActive 
          ? 'bg-white text-slate-900 shadow-sm' 
          : 'text-slate-600 hover:text-slate-900'
      } ${className}`}
      onClick={() => setActiveTab(value)}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, value, activeTab, className = '', ...props }) {
  if (activeTab !== value) return null;
  
  return (
    <div className={`mt-2 ${className}`} {...props}>
      {children}
    </div>
  );
} 