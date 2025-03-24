import React, { useEffect } from 'react';
import Terminal from '../components/Terminal';
import HoloPanelCard from '../components/HoloPanelCard';
import HoloButton from '../components/HoloButton';
import SceneBackground from '../components/SceneBackground';
import { motion } from 'framer-motion';
import { useTerminal } from '../context/TerminalContext';
import { useSound } from '../context/SoundContext';
import { useLocation } from 'wouter';
import { info } from '../data';

const Home: React.FC = () => {
  const [, setLocation] = useLocation();
  const { executeCommand } = useTerminal();
  const { playClick } = useSound();

  // Auto-execute the "whoami" command when page loads
  useEffect(() => {
    // Small delay to make it look like someone is typing
    const timer = setTimeout(() => {
      executeCommand("whoami");
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [executeCommand]);
  
  const handleResume = () => {
    playClick();
    window.open(info.resume, "_blank");
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden pt-20">
      {/* Animated Background */}
      <SceneBackground />
      
      <div className="container mx-auto px-6 pt-16 md:pt-24 relative z-20 flex flex-col md:flex-row items-center">
        {/* Holographic Panel */}
        <motion.div 
          className="w-full md:w-1/2 mb-10 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <HoloPanelCard className="rounded-lg p-6 md:p-8 max-w-md mx-auto md:ml-0 animate-float">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-[rgb(var(--neon-primary))] animate-glow">
              Welcome to Tanisha Singh's HoloVerse! 🔮
            </h1>
            <div className="grid grid-cols-1 gap-4 mt-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[rgba(0,238,255,0.2)] flex items-center justify-center">
                  <i className="ri-user-line text-[rgb(var(--neon-primary))]"></i>
                </div>
                <div className="ml-4">
                  <p className="text-[rgb(var(--holo-text))] opacity-70">Name</p>
                  <p className="text-[rgb(var(--neon-primary))]">{info.name}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[rgba(0,238,255,0.2)] flex items-center justify-center">
                  <i className="ri-map-pin-line text-[rgb(var(--neon-primary))]"></i>
                </div>
                <div className="ml-4">
                  <p className="text-[rgb(var(--holo-text))] opacity-70">Location</p>
                  <p className="text-[rgb(var(--neon-primary))]">{info.location}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[rgba(0,238,255,0.2)] flex items-center justify-center">
                  <i className="ri-book-open-line text-[rgb(var(--neon-primary))]"></i>
                </div>
                <div className="ml-4">
                  <p className="text-[rgb(var(--holo-text))] opacity-70">Education</p>
                  <p className="text-[rgb(var(--neon-primary))]">{info.education}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <HoloButton 
                  text="Download Resume" 
                  icon="download-line" 
                  onClick={handleResume}
                />
              </div>
            </div>
          </HoloPanelCard>
        </motion.div>
        
        {/* Terminal Interface */}
        <motion.div 
          className="w-full md:w-1/2 h-80 md:h-96"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Terminal initialText="Type commands to interact with the HoloVerse terminal. Try 'help', 'whoami', 'projects', or 'contact'." />
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
