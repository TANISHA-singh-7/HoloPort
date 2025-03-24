import React from 'react';

interface SceneProps {
  children?: React.ReactNode;
}

// Simplified version without 3D elements for now, using CSS backgrounds
const SceneBackground: React.FC<SceneProps> = ({ children }) => {
  return (
    <div className="absolute inset-0 -z-10">
      {/* Background with gradient and animation */}
      <div className="absolute inset-0 bg-[#080818] noise">
        {/* Animated scanlines */}
        <div className="absolute inset-0 scanline"></div>
        
        {/* Holographic grid lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(0deg, rgba(0,238,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,238,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center'
        }}></div>
        
        {/* Glowing orbs representing the drones */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-[#0ef] shadow-[0_0_15px_5px_rgba(0,238,255,0.4)] animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-[#f0f] shadow-[0_0_15px_5px_rgba(255,0,255,0.4)] animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full bg-[#0ef] shadow-[0_0_15px_5px_rgba(0,238,255,0.4)] animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-2 h-2 rounded-full bg-[#f0f] shadow-[0_0_15px_5px_rgba(255,0,255,0.4)] animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 rounded-full bg-[#70f] shadow-[0_0_15px_5px_rgba(112,0,255,0.4)] animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      {/* Children content */}
      {children}
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(8,8,24,0.8)] to-[rgba(8,8,24,0.9)]"></div>
    </div>
  );
};

export default SceneBackground;
