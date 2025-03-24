import React from 'react';

interface HoloPanelProps {
  children: React.ReactNode;
  className?: string;
  gradient?: 'primary' | 'secondary' | 'tertiary' | 'none';
  hoverEffect?: 'glow' | 'scale' | 'tilt' | 'none';
}

const HoloPanelCard: React.FC<HoloPanelProps> = ({
  children,
  className = '',
  gradient = 'primary',
  hoverEffect = 'glow'
}) => {
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
    <div
      className={`holo-panel relative backdrop-blur-md overflow-hidden ${className} ${hoverEffectMap[hoverEffect]} transition-all duration-300`}
    >
      {gradient !== 'none' && (
        <div className={`absolute inset-0 ${gradientMap[gradient]} opacity-50`}></div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default HoloPanelCard;
