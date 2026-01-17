import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = "px-6 py-3 font-sans text-sm tracking-wider transition-all duration-300 ease-out";
  
  const variants = {
    primary: "bg-accent text-white hover:bg-opacity-90 hover:shadow-md",
    outline: "border border-charcoal text-charcoal hover:bg-charcoal hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};