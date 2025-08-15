import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function Accordion({ children, className = '', ...props }) {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  );
}

export function AccordionItem({ children, className = '', ...props }) {
  return (
    <div className={`border-b ${className}`} {...props}>
      {children}
    </div>
  );
}

export function AccordionTrigger({ children, className = '', ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <button
      className={`flex w-full items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180 ${className}`}
      onClick={() => setIsOpen(!isOpen)}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </button>
  );
}

export function AccordionContent({ children, className = '', ...props }) {
  return (
    <div className={`overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down ${className}`} {...props}>
      <div className="pb-4 pt-0">
        {children}
      </div>
    </div>
  );
} 