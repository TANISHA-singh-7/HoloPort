import { RefObject, useCallback } from 'react';

export const useParallax = (ref: RefObject<HTMLElement>, depth: number = 20) => {
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current || depth === 0) return;
    
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate the mouse position relative to the element
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Calculate the percentage position within the element
    const xPercent = (x / width - 0.5) * 2; // -1 to 1
    const yPercent = (y / height - 0.5) * 2; // -1 to 1
    
    // Apply the transform based on mouse position and depth
    const moveX = xPercent * depth;
    const moveY = yPercent * depth;
    
    // Apply subtle rotation for a 3D effect
    const rotateX = yPercent * -5; // Inverse Y for natural tilt
    const rotateY = xPercent * 5;
    
    ref.current.style.transform = `
      perspective(1000px)
      translateX(${moveX}px)
      translateY(${moveY}px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
  }, [ref, depth]);
  
  const resetPosition = useCallback(() => {
    if (!ref.current) return;
    
    // Reset the transform when mouse leaves
    ref.current.style.transform = `
      perspective(1000px)
      translateX(0)
      translateY(0)
      rotateX(0)
      rotateY(0)
    `;
  }, [ref]);
  
  return { handleMouseMove, resetPosition };
};
