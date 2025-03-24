import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

interface SoundContextProps {
  isMuted: boolean;
  toggleMute: () => void;
  playClick: () => void;
  playBeep: () => void;
  playSuccess: () => void;
  playError: () => void;
}

const SoundContext = createContext<SoundContextProps>({
  isMuted: false,
  toggleMute: () => {},
  playClick: () => {},
  playBeep: () => {},
  playSuccess: () => {},
  playError: () => {},
});

export const useSound = () => useContext(SoundContext);

interface SoundProviderProps {
  children: ReactNode;
}

export const SoundProvider: React.FC<SoundProviderProps> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  
  useEffect(() => {
    // Initialize AudioContext on user interaction to comply with browser policies
    const initializeAudio = () => {
      if (!audioContext) {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        setAudioContext(ctx);
      }
      
      // Remove the listener after initialization
      document.removeEventListener('click', initializeAudio);
    };
    
    document.addEventListener('click', initializeAudio);
    
    return () => {
      document.removeEventListener('click', initializeAudio);
    };
  }, [audioContext]);
  
  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);
  
  // Function to create and play a beep sound
  const createAndPlaySound = useCallback((
    type: 'beep' | 'click' | 'success' | 'error'
  ) => {
    if (isMuted || !audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Configure sound based on type
    switch (type) {
      case 'beep':
        oscillator.type = 'sine';
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.05;
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
        break;
        
      case 'click':
        oscillator.type = 'square';
        oscillator.frequency.value = 600;
        gainNode.gain.value = 0.03;
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.05);
        break;
        
      case 'success':
        oscillator.type = 'sine';
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.05;
        oscillator.start();
        
        // Create a rising tone effect for success
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.2);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.stop(audioContext.currentTime + 0.3);
        break;
        
      case 'error':
        oscillator.type = 'sawtooth';
        oscillator.frequency.value = 300;
        gainNode.gain.value = 0.04;
        oscillator.start();
        
        // Create a descending tone effect for error
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        oscillator.stop(audioContext.currentTime + 0.4);
        break;
    }
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
  }, [isMuted, audioContext]);
  
  const playBeep = useCallback(() => createAndPlaySound('beep'), [createAndPlaySound]);
  const playClick = useCallback(() => createAndPlaySound('click'), [createAndPlaySound]);
  const playSuccess = useCallback(() => createAndPlaySound('success'), [createAndPlaySound]);
  const playError = useCallback(() => createAndPlaySound('error'), [createAndPlaySound]);
  
  return (
    <SoundContext.Provider value={{
      isMuted,
      toggleMute,
      playClick,
      playBeep,
      playSuccess,
      playError,
    }}>
      {children}
    </SoundContext.Provider>
  );
};
