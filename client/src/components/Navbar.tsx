import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import HoloButton from './HoloButton';
import { useSound } from '../context/SoundContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { playClick } = useSound();
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  // Update time every second for cyberpunk HUD effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  const toggleMenu = () => {
    playClick();
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleNavigation = (path: string) => {
    playClick();
    setLocation(path);
    setIsMenuOpen(false); 
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled ? 'bg-[rgba(8,8,24,0.85)] backdrop-blur-md shadow-[0_5px_15px_rgba(0,0,0,0.3)]' : 'bg-transparent'
    } border-b border-[rgba(0,238,255,0.3)]`}>
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Left side with logo and cyberpunk HUD elements */}
        <div className="flex items-center">
          <div className="relative">
            <span className="text-2xl font-bold text-[rgb(var(--neon-primary))] animate-glow tracking-wider">
              TANISHA<span className="text-[rgb(var(--neon-secondary))]">VERSE</span>
            </span>
            
            {/* Decorative cyber elements */}
            <div className="absolute -top-2 -left-4 w-3 h-3 border-t-2 border-l-2 border-[rgb(var(--neon-primary))] opacity-80"></div>
            <div className="absolute -bottom-2 -left-4 w-3 h-3 border-b-2 border-l-2 border-[rgb(var(--neon-primary))] opacity-80"></div>
            <div className="absolute -top-2 -right-4 w-3 h-3 border-t-2 border-r-2 border-[rgb(var(--neon-secondary))] opacity-80"></div>
            <div className="absolute -bottom-2 -right-4 w-3 h-3 border-b-2 border-r-2 border-[rgb(var(--neon-secondary))] opacity-80"></div>
          </div>
          
          {/* HUD style elements */}
          <div className="hidden md:flex ml-10 items-center">
            <div className="text-xs font-mono text-[rgb(var(--neon-primary))] opacity-90 border border-[rgba(0,238,255,0.3)] rounded px-2 py-1">
              {time.toLocaleTimeString()}
            </div>
            <div className="ml-3 text-xs font-mono text-[rgb(var(--neon-secondary))] opacity-90 border border-[rgba(255,0,255,0.3)] rounded px-2 py-1">
              SYS:ACTIVE
            </div>
            <div className="ml-3 h-1 w-20 bg-[rgba(0,238,255,0.2)] rounded overflow-hidden">
              <div className="h-full bg-[rgb(var(--neon-primary))] animate-pulse" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
        
        {/* Navigation with cyberpunk styling */}
        <div className="hidden md:flex space-x-5">
          <HoloButton onClick={() => handleNavigation('/')} text="HOME" size="sm" />
          <HoloButton onClick={() => handleNavigation('/skills')} text="SKILLS" size="sm" />
          <HoloButton onClick={() => handleNavigation('/projects')} text="PROJECTS" size="sm" />
          <HoloButton onClick={() => handleNavigation('/experience')} text="EXPERIENCE" size="sm" />
          <HoloButton onClick={() => handleNavigation('/achievements')} text="ACHIEVEMENTS" size="sm" />
          <HoloButton onClick={() => handleNavigation('/coding-profiles')} text="CODING" size="sm" />
          <HoloButton onClick={() => handleNavigation('/contact')} text="CONTACT" size="sm" />
        </div>
        
        {/* Mobile menu button with cyberpunk styling */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            className="relative px-3 py-1 rounded border border-[rgba(0,238,255,0.4)] bg-[rgba(0,0,20,0.5)] text-[rgb(var(--neon-primary))]"
          >
            <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line`}></i>
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[rgb(var(--neon-primary))] animate-pulse"></span>
          </button>
        </div>
      </div>
      
      {/* Mobile menu with cyberpunk styling */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 backdrop-blur-lg py-4 px-4 flex flex-col space-y-3 bg-[rgba(8,8,24,0.95)] border-b border-[rgba(0,238,255,0.3)] shadow-[0_5px_20px_rgba(0,0,0,0.5),inset_0_0_10px_rgba(0,238,255,0.1)]">
          <HoloButton onClick={() => handleNavigation('/')} text="HOME" fullWidth />
          <HoloButton onClick={() => handleNavigation('/skills')} text="SKILLS" fullWidth />
          <HoloButton onClick={() => handleNavigation('/projects')} text="PROJECTS" fullWidth />
          <HoloButton onClick={() => handleNavigation('/experience')} text="EXPERIENCE" fullWidth />
          <HoloButton onClick={() => handleNavigation('/achievements')} text="ACHIEVEMENTS" fullWidth />
          <HoloButton onClick={() => handleNavigation('/coding-profiles')} text="CODING PROFILES" fullWidth />
          <HoloButton onClick={() => handleNavigation('/contact')} text="CONTACT" fullWidth />
          
          {/* Cyberpunk decorative element */}
          <div className="mt-4 border-t border-[rgba(0,238,255,0.2)] pt-3 flex justify-between items-center">
            <div className="text-xs font-mono text-[rgb(var(--neon-primary))] opacity-90">
              {time.toLocaleTimeString()}
            </div>
            <div className="text-xs font-mono text-[rgb(var(--neon-secondary))] opacity-90">
              SYS:ACTIVE
            </div>
            <div className="h-1 w-20 bg-[rgba(0,238,255,0.2)] rounded overflow-hidden">
              <div className="h-full bg-[rgb(var(--neon-primary))] animate-pulse" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
      )}
      
      {/* Decorative scanlines for cyberpunk effect - reduced opacity */}
      <div className="absolute inset-0 scanline opacity-10 pointer-events-none"></div>
      
      {/* Decorative cyberpunk circuit lines */}
      <div className="absolute left-0 top-0 w-[150px] h-[2px] bg-[rgba(0,238,255,0.3)]"></div>
      <div className="absolute right-0 top-0 w-[150px] h-[2px] bg-[rgba(255,0,255,0.3)]"></div>
      <div className="absolute left-0 bottom-0 w-[50px] h-[2px] bg-[rgba(0,238,255,0.3)]"></div>
      <div className="absolute right-0 bottom-0 w-[50px] h-[2px] bg-[rgba(255,0,255,0.3)]"></div>
    </nav>
  );
};

export default Navbar;
