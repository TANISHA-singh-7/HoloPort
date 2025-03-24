import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import HoloButton from './HoloButton';
import { useSound } from '../context/SoundContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { playClick } = useSound();
  const [scrolled, setScrolled] = useState(false);
  
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
      scrolled ? 'bg-holo-dark bg-opacity-90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    } border-b border-holo-primary border-opacity-20`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-[rgb(var(--neon-primary))] animate-glow tracking-wider">HOLOVERSE</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <HoloButton onClick={() => handleNavigation('/')} text="HOME" size="sm" />
          <HoloButton onClick={() => handleNavigation('/skills')} text="SKILLS" size="sm" />
          <HoloButton onClick={() => handleNavigation('/projects')} text="PROJECTS" size="sm" />
          <HoloButton onClick={() => handleNavigation('/experience')} text="EXPERIENCE" size="sm" />
          <HoloButton onClick={() => handleNavigation('/achievements')} text="ACHIEVEMENTS" size="sm" />
          <HoloButton onClick={() => handleNavigation('/coding-profiles')} text="CODING" size="sm" />
          <HoloButton onClick={() => handleNavigation('/contact')} text="CONTACT" size="sm" />
        </div>
        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            className="holo-button px-3 py-1 rounded text-[rgb(var(--neon-primary))]"
          >
            <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line`}></i>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden holo-panel absolute top-full left-0 right-0 backdrop-blur-lg py-4 px-4 flex flex-col space-y-3 bg-[rgba(8,8,24,0.9)]">
          <HoloButton onClick={() => handleNavigation('/')} text="HOME" fullWidth />
          <HoloButton onClick={() => handleNavigation('/skills')} text="SKILLS" fullWidth />
          <HoloButton onClick={() => handleNavigation('/projects')} text="PROJECTS" fullWidth />
          <HoloButton onClick={() => handleNavigation('/experience')} text="EXPERIENCE" fullWidth />
          <HoloButton onClick={() => handleNavigation('/achievements')} text="ACHIEVEMENTS" fullWidth />
          <HoloButton onClick={() => handleNavigation('/coding-profiles')} text="CODING PROFILES" fullWidth />
          <HoloButton onClick={() => handleNavigation('/contact')} text="CONTACT" fullWidth />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
