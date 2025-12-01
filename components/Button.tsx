import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { playClickSound } from '../constants';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'style' | 'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  onClick,
  className = '',
  ...props 
}) => {
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClickSound();
    if (onClick) onClick(e);
  };

  const baseStyles = "font-medium rounded-xl transition-all duration-200 flex items-center justify-center px-6 py-3 shadow-sm select-none";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-green-600 active:bg-green-700 shadow-green-200",
    secondary: "bg-secondary text-white hover:bg-blue-600 active:bg-blue-700 shadow-blue-200",
    outline: "border-2 border-primary text-primary bg-white hover:bg-green-50",
    danger: "bg-alert-red text-white hover:bg-red-600 shadow-red-200"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;