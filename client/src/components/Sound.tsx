import { useEffect, useRef } from 'react';

interface SoundProps {
  src: string;
  volume?: number;
  loop?: boolean;
  autoplay?: boolean;
  id: string;
}

const Sound = ({ src, volume = 0.1, loop = false, autoplay = false, id }: SoundProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      
      if (autoplay) {
        // Try to play audio
        const playPromise = audioRef.current.play();
        
        // Handle autoplay policy
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            // Auto-play was prevented
            console.log('Autoplay prevented:', error);
            
            // Add a click listener to play audio on user interaction
            const playAudioOnUserInteraction = () => {
              if (audioRef.current) {
                audioRef.current.play().catch(e => console.log('Still cannot play audio:', e));
              }
              document.removeEventListener('click', playAudioOnUserInteraction);
            };
            
            document.addEventListener('click', playAudioOnUserInteraction);
          });
        }
      }
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [src, volume, loop, autoplay]);
  
  return (
    <audio
      ref={audioRef}
      src={src}
      loop={loop}
      id={id}
      preload="auto"
      className="hidden"
    />
  );
};

export default Sound;
