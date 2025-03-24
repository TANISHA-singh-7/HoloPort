import React, { useState } from 'react';
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
  variant?: 'default' | 'outlined' | 'ghost' | 'cyber';
}

const HoloButton: React.FC<HoloButtonProps> = ({
  text,
  onClick,
  size = 'md',
  icon,
  fullWidth = false,
  color = 'primary',
  className = '',
  variant = 'default',
}) => {
  const { playClick } = useSound();
  const [isHovered, setIsHovered] = useState(false);
  
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-5 py-2',
    lg: 'px-7 py-3 text-lg',
  };
  
  const baseColorValues = {
    primary: { rgb: 'rgb(var(--neon-primary))', rgba: 'rgba(0,238,255,' },
    secondary: { rgb: 'rgb(var(--neon-secondary))', rgba: 'rgba(255,0,255,' },
    tertiary: { rgb: 'rgb(var(--neon-tertiary))', rgba: 'rgba(112,0,255,' }
  };
  
  const colorVariants = {
    default: {
      primary: `text-[${baseColorValues.primary.rgb}] border-[${baseColorValues.primary.rgba}0.4)] hover:bg-[${baseColorValues.primary.rgba}0.1)] hover:shadow-[0_0_15px_${baseColorValues.primary.rgba}0.4),inset_0_0_10px_${baseColorValues.primary.rgba}0.2)]`,
      secondary: `text-[${baseColorValues.secondary.rgb}] border-[${baseColorValues.secondary.rgba}0.4)] hover:bg-[${baseColorValues.secondary.rgba}0.1)] hover:shadow-[0_0_15px_${baseColorValues.secondary.rgba}0.4),inset_0_0_10px_${baseColorValues.secondary.rgba}0.2)]`,
      tertiary: `text-[${baseColorValues.tertiary.rgb}] border-[${baseColorValues.tertiary.rgba}0.4)] hover:bg-[${baseColorValues.tertiary.rgba}0.1)] hover:shadow-[0_0_15px_${baseColorValues.tertiary.rgba}0.4),inset_0_0_10px_${baseColorValues.tertiary.rgba}0.2)]`
    },
    outlined: {
      primary: `text-[${baseColorValues.primary.rgb}] border-[${baseColorValues.primary.rgba}0.6)] bg-transparent hover:bg-[${baseColorValues.primary.rgba}0.1)] hover:shadow-[0_0_15px_${baseColorValues.primary.rgba}0.4)]`,
      secondary: `text-[${baseColorValues.secondary.rgb}] border-[${baseColorValues.secondary.rgba}0.6)] bg-transparent hover:bg-[${baseColorValues.secondary.rgba}0.1)] hover:shadow-[0_0_15px_${baseColorValues.secondary.rgba}0.4)]`,
      tertiary: `text-[${baseColorValues.tertiary.rgb}] border-[${baseColorValues.tertiary.rgba}0.6)] bg-transparent hover:bg-[${baseColorValues.tertiary.rgba}0.1)] hover:shadow-[0_0_15px_${baseColorValues.tertiary.rgba}0.4)]`
    },
    ghost: {
      primary: `text-[${baseColorValues.primary.rgb}] border-transparent bg-transparent hover:bg-[${baseColorValues.primary.rgba}0.1)] hover:border-[${baseColorValues.primary.rgba}0.3)]`,
      secondary: `text-[${baseColorValues.secondary.rgb}] border-transparent bg-transparent hover:bg-[${baseColorValues.secondary.rgba}0.1)] hover:border-[${baseColorValues.secondary.rgba}0.3)]`,
      tertiary: `text-[${baseColorValues.tertiary.rgb}] border-transparent bg-transparent hover:bg-[${baseColorValues.tertiary.rgba}0.1)] hover:border-[${baseColorValues.tertiary.rgba}0.3)]`
    },
    cyber: {
      primary: `text-[${baseColorValues.primary.rgb}] border-[${baseColorValues.primary.rgba}0.6)] bg-[rgba(8,8,24,0.6)] hover:shadow-[0_0_15px_${baseColorValues.primary.rgba}0.5),inset_0_0_10px_${baseColorValues.primary.rgba}0.3)] hover:bg-[rgba(0,20,40,0.4)]`,
      secondary: `text-[${baseColorValues.secondary.rgb}] border-[${baseColorValues.secondary.rgba}0.6)] bg-[rgba(8,8,24,0.6)] hover:shadow-[0_0_15px_${baseColorValues.secondary.rgba}0.5),inset_0_0_10px_${baseColorValues.secondary.rgba}0.3)] hover:bg-[rgba(0,20,40,0.4)]`,
      tertiary: `text-[${baseColorValues.tertiary.rgb}] border-[${baseColorValues.tertiary.rgba}0.6)] bg-[rgba(8,8,24,0.6)] hover:shadow-[0_0_15px_${baseColorValues.tertiary.rgba}0.5),inset_0_0_10px_${baseColorValues.tertiary.rgba}0.3)] hover:bg-[rgba(0,20,40,0.4)]`
    }
  };
  
  const handleClick = () => {
    playClick();
    if (onClick) onClick();
  };
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`
        border 
        transition-all 
        duration-300 
        font-rajdhani
        tracking-wider
        uppercase
        ${variant === 'cyber' ? 'rounded-sm' : 'rounded'}
        inline-flex 
        items-center 
        justify-center
        position-relative
        ${sizeClasses[size]} 
        ${colorVariants[variant][color]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
    >
      {/* Decorative elements for cyberpunk style */}
      {variant === 'cyber' && (
        <>
          <div className={`absolute -top-[1px] -left-[1px] w-[4px] h-[4px] bg-[${baseColorValues[color].rgb}]`}></div>
          <div className={`absolute -bottom-[1px] -right-[1px] w-[4px] h-[4px] bg-[${baseColorValues[color].rgb}]`}></div>
          <div className={`absolute -top-[1px] left-[4px] w-[30%] h-[1px] bg-[${baseColorValues[color].rgb}]`}></div>
          <div className={`absolute -bottom-[1px] right-[4px] w-[30%] h-[1px] bg-[${baseColorValues[color].rgb}]`}></div>
        </>
      )}
      
      {/* Button content with icon */}
      <div className="relative z-10 flex items-center justify-center">
        {icon && <i className={`ri-${icon} ${text ? 'mr-2' : ''}`}></i>}
        <span className={isHovered ? 'holo-glow' : ''}>{text}</span>
      </div>
      
      {/* Extra glow effect for cyber variant */}
      {variant === 'cyber' && isHovered && (
        <div className={`absolute inset-0 bg-[${baseColorValues[color].rgba}0.05)] rounded-sm`}></div>
      )}
    </motion.button>
  );
};

export default HoloButton;
