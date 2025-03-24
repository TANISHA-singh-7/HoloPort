import React, { useRef, ReactNode } from 'react';
import { useParallax } from '../hooks/useParallax';
import { motion } from 'framer-motion';

interface ParallaxContainerProps {
  children: ReactNode;
  depth?: number;
  className?: string;
  hover3D?: boolean;
  animate?: boolean;
  delay?: number;
}

const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  children,
  depth = 30,
  className = '',
  hover3D = true,
  animate = true,
  delay = 0
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { handleMouseMove } = useParallax(containerRef, hover3D ? depth : 0);
  
  return (
    <motion.div
      ref={containerRef}
      className={`relative transform-style-3d ${className}`}
      onMouseMove={hover3D ? handleMouseMove : undefined}
      initial={animate ? { opacity: 0, y: 20 } : undefined}
      animate={animate ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxContainer;
