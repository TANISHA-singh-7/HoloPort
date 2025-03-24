import React from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../context/SoundContext';

interface HoloButtonProps {
  text: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  fullWidth?: boolean;
  color?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
}

const HoloButton: React.FC<HoloButtonProps> = ({
  text,
  onClick,
  size = 'md',
  icon,
  fullWidth = false,
  color = 'primary',
  className = '',
}) => {
  const { playClick } = useSound();
  
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-5 py-2',
    lg: 'px-7 py-3 text-lg',
  };
  
  const colorClasses = {
    primary: 'text-[rgb(var(--neon-primary))] border-[rgba(0,238,255,0.4)] hover:bg-[rgba(0,238,255,0.1)] hover:shadow-[0_0_15px_rgba(0,238,255,0.4),inset_0_0_10px_rgba(0,238,255,0.2)]',
    secondary: 'text-[rgb(var(--neon-secondary))] border-[rgba(255,0,255,0.4)] hover:bg-[rgba(255,0,255,0.1)] hover:shadow-[0_0_15px_rgba(255,0,255,0.4),inset_0_0_10px_rgba(255,0,255,0.2)]',
    tertiary: 'text-[rgb(var(--neon-tertiary))] border-[rgba(112,0,255,0.4)] hover:bg-[rgba(112,0,255,0.1)] hover:shadow-[0_0_15px_rgba(112,0,255,0.4),inset_0_0_10px_rgba(112,0,255,0.2)]'
  };
  
  const handleClick = () => {
    playClick();
    if (onClick) onClick();
  };
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`
        bg-[rgba(0,20,40,0.2)] 
        border 
        transition-all 
        duration-300 
        rounded 
        holo-glow 
        inline-flex 
        items-center 
        justify-center
        ${sizeClasses[size]} 
        ${colorClasses[color]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
    >
      {icon && <i className={`ri-${icon} ${text ? 'mr-2' : ''}`}></i>}
      {text}
    </motion.button>
  );
};

export default HoloButton;
