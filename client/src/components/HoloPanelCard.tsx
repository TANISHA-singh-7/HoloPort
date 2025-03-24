import React, { useRef } from 'react';
import { useParallax } from '../hooks/useParallax';
import { motion } from 'framer-motion';

interface HoloPanelProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  gradient?: 'primary' | 'secondary' | 'tertiary' | 'none';
  hover3D?: boolean;
  delay?: number;
  hoverEffect?: 'glow' | 'scale' | 'tilt' | 'none';
}

const HoloPanelCard: React.FC<HoloPanelProps> = ({
  children,
  className = '',
  animate = true,
  gradient = 'primary',
  hover3D = false,
  delay = 0,
  hoverEffect = 'glow'
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { handleMouseMove } = useParallax(cardRef, hover3D ? 20 : 0);
  
  const gradientMap = {
    primary: 'bg-gradient-to-br from-[rgba(0,238,255,0.1)] to-[rgba(112,0,255,0.05)]',
    secondary: 'bg-gradient-to-br from-[rgba(255,0,255,0.1)] to-[rgba(0,238,255,0.05)]',
    tertiary: 'bg-gradient-to-br from-[rgba(112,0,255,0.1)] to-[rgba(255,0,255,0.05)]',
    none: ''
  };
  
  const hoverEffectMap = {
    glow: 'hover:shadow-[0_0_20px_rgba(0,238,255,0.5),inset_0_0_15px_rgba(0,238,255,0.2)]',
    scale: 'hover:scale-105',
    tilt: 'hover:rotate-1 hover:translate-y-[-5px]',
    none: ''
  };
  
  return (
    <motion.div
      ref={cardRef}
      className={`holo-panel relative backdrop-blur-md overflow-hidden ${className} ${hoverEffectMap[hoverEffect]} transition-all duration-300`}
      initial={animate ? { opacity: 0, y: 20 } : undefined}
      animate={animate ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      onMouseMove={hover3D ? handleMouseMove : undefined}
    >
      {gradient !== 'none' && (
        <div className={`absolute inset-0 ${gradientMap[gradient]} opacity-50`}></div>
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default HoloPanelCard;
