import React, { useEffect, useState } from 'react';

interface SceneProps {
  children?: React.ReactNode;
}

const SceneBackground: React.FC<SceneProps> = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Handle parallax effect based on mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Base background with gradient and noise texture */}
      <div className="absolute inset-0 bg-[#080818] noise">
        {/* Animated scanlines */}
        <div className="absolute inset-0 scanline"></div>
        
        {/* Cyberpunk style night sky with stars */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050520] via-[#1a0b35] to-[#290a38]">
          {/* Stars */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute w-[1px] h-[1px] bg-white opacity-80"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                boxShadow: '0 0 2px 1px rgba(255, 255, 255, 0.4)',
                animation: `twinkle ${2 + Math.random() * 4}s infinite ease-in-out alternate`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
        
        {/* Holographic grid perspective floor */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[40vh] perspective-1000"
          style={{
            transform: `rotateX(60deg) translateZ(-100px) translateY(20vh) translateX(${mousePosition.x * -20}px)`,
            backgroundImage: 'linear-gradient(90deg, rgba(0,238,255,0.2) 1px, transparent 1px), linear-gradient(rgba(0,238,255,0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            transformOrigin: 'bottom',
            background: 'linear-gradient(to top, rgba(0,238,255,0.1), transparent 80%)',
          }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(90deg, rgba(0,238,255,0.2) 1px, transparent 1px), linear-gradient(rgba(0,238,255,0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}></div>
        </div>
        
        {/* Cyberpunk Skyscrapers */}
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] z-10">
          {/* City skyline - Buildings */}
          <div className="relative h-full w-full">
            {/* Group 1 - Far buildings */}
            <div className="absolute bottom-0 left-0 right-0 h-[30vh] z-10" 
              style={{ transform: `translateX(${mousePosition.x * -5}px)` }}>
              
              {/* Building 1 */}
              <div className="absolute bottom-0 left-[5%] w-[30px] h-[65%] bg-[#0d0d2b]">
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-10 gap-[2px] p-[2px]">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="bg-[#ff00e4] opacity-30"></div>
                  ))}
                </div>
                <div className="absolute top-0 left-0 right-0 h-[10px] bg-[#ff00e4] opacity-40"></div>
              </div>
              
              {/* Building 2 */}
              <div className="absolute bottom-0 left-[15%] w-[50px] h-[45%] bg-[#0d0d2b]">
                <div className="absolute inset-0 grid grid-cols-5 grid-rows-8 gap-[2px] p-[2px]">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div key={i} className="bg-[#00eeff] opacity-20"></div>
                  ))}
                </div>
              </div>
              
              {/* Building 3 */}
              <div className="absolute bottom-0 left-[30%] w-[80px] h-[80%] bg-[#0d0d2b]">
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-15 gap-[2px] p-[2px]">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <div key={i} className={`bg-[${Math.random() > 0.7 ? '#00eeff' : '#ff00e4'}] opacity-${Math.random() > 0.5 ? '30' : '20'}`}></div>
                  ))}
                </div>
                <div className="absolute top-0 left-[40%] w-[20%] h-[20px] bg-[#ff0000] opacity-70 animate-pulse"></div>
              </div>
              
              {/* Building 4 */}
              <div className="absolute bottom-0 left-[48%] w-[35px] h-[55%] bg-[#0d0d2b]">
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-10 gap-[2px] p-[2px]">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="bg-[#00eeff] opacity-40"></div>
                  ))}
                </div>
              </div>
              
              {/* Building 5 */}
              <div className="absolute bottom-0 left-[60%] w-[100px] h-[70%] bg-[#0d0d2b]">
                <div className="absolute inset-0 grid grid-cols-10 grid-rows-15 gap-[2px] p-[2px]">
                  {Array.from({ length: 120 }).map((_, i) => (
                    <div key={i} className="bg-[#00eeff] opacity-20"></div>
                  ))}
                </div>
                <div className="absolute top-0 left-0 right-0 h-[15px] bg-[#00eeff] opacity-50"></div>
              </div>
              
              {/* Building 6 */}
              <div className="absolute bottom-0 left-[78%] w-[45px] h-[60%] bg-[#0d0d2b]">
                <div className="absolute inset-0 grid grid-cols-4 grid-rows-12 gap-[2px] p-[2px]">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div key={i} className="bg-[#ff00e4] opacity-30"></div>
                  ))}
                </div>
              </div>
              
              {/* Building 7 */}
              <div className="absolute bottom-0 left-[90%] w-[60px] h-[50%] bg-[#0d0d2b]">
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-10 gap-[2px] p-[2px]">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <div key={i} className="bg-[#00eeff] opacity-30"></div>
                  ))}
                </div>
                <div className="absolute top-0 left-[40%] w-[20%] h-[10px] bg-[#ff0000] opacity-70 animate-pulse"></div>
              </div>
            </div>
            
            {/* Group 2 - Front buildings with more detail */}
            <div className="absolute bottom-0 left-0 right-0 h-[35vh] z-20" 
              style={{ transform: `translateX(${mousePosition.x * -15}px)` }}>
              
              {/* TechCorp Tower */}
              <div className="absolute bottom-0 left-[20%] w-[120px] h-[90%] bg-[#0a0a1e]">
                <div className="absolute inset-y-0 left-0 w-[70%] bg-[#0a0a1e]">
                  <div className="absolute inset-0 grid grid-cols-6 grid-rows-20 gap-[3px] p-[3px]">
                    {Array.from({ length: 100 }).map((_, i) => (
                      <div key={i} className="bg-[#00eeff] opacity-30"></div>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 w-[30%] bg-[#0a0a1e]">
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-20 gap-[3px] p-[3px]">
                    {Array.from({ length: 50 }).map((_, i) => (
                      <div key={i} className="bg-[#00eeff] opacity-40"></div>
                    ))}
                  </div>
                </div>
                <div className="absolute top-0 left-0 right-0 h-[20px] bg-[#00eeff] opacity-70"></div>
                <div className="absolute top-[30px] left-[20px] text-[10px] text-[#00eeff] opacity-80 font-mono">TANISHA CORP</div>
              </div>
              
              {/* Neon Tower */}
              <div className="absolute bottom-0 right-[25%] w-[100px] h-[85%]">
                <div className="absolute inset-0 bg-[#0a0a1e]">
                  <div className="absolute inset-0 grid grid-cols-8 grid-rows-16 gap-[3px] p-[3px]">
                    {Array.from({ length: 120 }).map((_, i) => (
                      <div key={i} className="bg-[#ff00e4] opacity-40"></div>
                    ))}
                  </div>
                </div>
                <div className="absolute top-[10%] h-[5px] bg-[#ff00e4] left-0 right-0 opacity-90"></div>
                <div className="absolute top-[30%] h-[5px] bg-[#ff00e4] left-0 right-0 opacity-90"></div>
                <div className="absolute top-[60%] h-[5px] bg-[#ff00e4] left-0 right-0 opacity-90"></div>
                <div className="absolute top-0 left-0 right-0 h-[15px] bg-[#ff0000] opacity-70 animate-pulse"></div>
              </div>
            </div>
          </div>
          
          {/* Holographic advertisements floating in the sky */}
          <div className="absolute top-[10%] left-[20%] w-[120px] h-[60px] animate-float"
               style={{ animationDuration: '15s', transform: `translateX(${mousePosition.x * -25}px) translateY(${mousePosition.y * -15}px)` }}>
            <div className="absolute inset-0 rounded-md bg-[rgba(0,238,255,0.1)] border border-[rgba(0,238,255,0.4)] backdrop-blur-sm">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-[rgba(0,238,255,0.9)] text-xs font-mono animate-pulse">TECH SOLUTIONS</div>
              </div>
            </div>
          </div>
          
          <div className="absolute top-[30%] right-[30%] w-[80px] h-[40px] animate-float"
               style={{ animationDuration: '12s', animationDelay: '2s', transform: `translateX(${mousePosition.x * -20}px) translateY(${mousePosition.y * -10}px)` }}>
            <div className="absolute inset-0 rounded-md bg-[rgba(255,0,255,0.1)] border border-[rgba(255,0,255,0.4)] backdrop-blur-sm">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-[rgba(255,0,255,0.9)] text-xs font-mono animate-pulse">CYBER NET</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Glowing orbs/drones flying in cyberpunk city */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-[#0ef] shadow-[0_0_15px_5px_rgba(0,238,255,0.6)] animate-float"
             style={{ transform: `translateX(${mousePosition.x * -30}px) translateY(${mousePosition.y * -20}px)` }}></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-[#f0f] shadow-[0_0_15px_5px_rgba(255,0,255,0.6)] animate-float" 
             style={{ animationDelay: '1s', transform: `translateX(${mousePosition.x * -25}px) translateY(${mousePosition.y * -15}px)` }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 rounded-full bg-[#0ef] shadow-[0_0_15px_5px_rgba(0,238,255,0.6)] animate-float" 
             style={{ animationDelay: '2s', transform: `translateX(${mousePosition.x * -20}px) translateY(${mousePosition.y * -10}px)` }}></div>
        <div className="absolute top-1/2 left-1/3 w-2 h-2 rounded-full bg-[#f0f] shadow-[0_0_15px_5px_rgba(255,0,255,0.6)] animate-float" 
             style={{ animationDelay: '1.5s', transform: `translateX(${mousePosition.x * -15}px) translateY(${mousePosition.y * -25}px)` }}></div>
        <div className="absolute bottom-1/3 left-1/2 w-4 h-4 rounded-full bg-[#70f] shadow-[0_0_15px_5px_rgba(112,0,255,0.6)] animate-float" 
             style={{ animationDelay: '0.5s', transform: `translateX(${mousePosition.x * -35}px) translateY(${mousePosition.y * -30}px)` }}></div>
        
        {/* Flying cars in the distance */}
        <div className="absolute top-[35%] left-[-50px] w-[10px] h-[4px] bg-[#ff0000] opacity-70 animate-flyRight"
             style={{ animationDuration: '15s', animationIterationCount: 'infinite' }}>
          <div className="absolute -top-[1px] -left-[3px] w-[3px] h-[1px] bg-[#ff0000] opacity-70"></div>
        </div>
        
        <div className="absolute top-[45%] right-[-30px] w-[8px] h-[3px] bg-[#0ef] opacity-70 animate-flyLeft"
             style={{ animationDuration: '20s', animationIterationCount: 'infinite', animationDelay: '5s' }}>
          <div className="absolute -top-[1px] -right-[3px] w-[3px] h-[1px] bg-[#0ef] opacity-70"></div>
        </div>
      </div>
      
      {/* Children content */}
      {children}
      
      {/* Overlay gradient for better text readability - reduced opacity */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(8,8,24,0.6)] to-[rgba(8,8,24,0.7)]"></div>
    </div>
  );
};

export default SceneBackground;
