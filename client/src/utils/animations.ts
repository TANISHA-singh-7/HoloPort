import { gsap } from 'gsap';

/**
 * Creates a holographic floating animation
 * @param target Element or selector to animate
 * @param options Animation options
 */
export const createFloatingAnimation = (
  target: string | Element,
  options: {
    duration?: number;
    yDistance?: number;
    rotationX?: number;
    rotationY?: number;
    delay?: number;
    ease?: string;
  } = {}
) => {
  const {
    duration = 3,
    yDistance = 10,
    rotationX = 2,
    rotationY = 3,
    delay = 0,
    ease = 'power1.inOut'
  } = options;
  
  // Create timeline for floating effect
  const tl = gsap.timeline({
    repeat: -1,
    yoyo: true,
    defaults: { ease }
  });
  
  tl.to(target, {
    y: `-=${yDistance}`,
    rotationX: rotationX,
    rotationY: rotationY,
    duration,
    delay
  }).to(target, {
    y: `+=${yDistance}`,
    rotationX: -rotationX / 2,
    rotationY: -rotationY / 2,
    duration,
    delay: 0
  });
  
  return tl;
};

/**
 * Creates a holographic glow pulse animation
 * @param target Element or selector to animate
 * @param options Animation options
 */
export const createGlowAnimation = (
  target: string | Element,
  options: {
    duration?: number;
    glowIntensity?: number;
    color?: string;
    delay?: number;
    ease?: string;
  } = {}
) => {
  const {
    duration = 2,
    glowIntensity = 10,
    color = '0, 238, 255',
    delay = 0,
    ease = 'power1.inOut'
  } = options;
  
  // Create timeline for glow effect
  const tl = gsap.timeline({
    repeat: -1,
    yoyo: true,
    defaults: { ease }
  });
  
  tl.to(target, {
    boxShadow: `0 0 ${glowIntensity}px rgba(${color}, 0.7), inset 0 0 ${glowIntensity / 2}px rgba(${color}, 0.4)`,
    textShadow: `0 0 ${glowIntensity / 2}px rgba(${color}, 1.0)`,
    duration,
    delay
  });
  
  return tl;
};

/**
 * Creates a holographic typing animation
 * @param target Element or selector to animate
 * @param text Text to type
 * @param options Animation options
 */
export const createTypingAnimation = (
  target: string | Element,
  text: string,
  options: {
    speed?: number;
    delay?: number;
    cursor?: boolean;
    onComplete?: () => void;
  } = {}
) => {
  const {
    speed = 0.05,
    delay = 0,
    cursor = true,
    onComplete
  } = options;
  
  // Get the element
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return;
  
  // Clear existing content
  element.textContent = '';
  
  // Create cursor element if needed
  if (cursor) {
    const cursorEl = document.createElement('span');
    cursorEl.className = 'terminal-cursor';
    element.appendChild(cursorEl);
  }
  
  // Type each character with a delay
  const tl = gsap.timeline({ delay });
  
  // Type each character
  for (let i = 0; i < text.length; i++) {
    tl.add(() => {
      const currentText = text.substring(0, i + 1);
      element.textContent = currentText + (cursor ? '|' : '');
    }, i * speed);
  }
  
  // Once complete
  if (onComplete) {
    tl.call(onComplete);
  }
  
  return tl;
};

/**
 * Creates a holographic scan line animation
 * @param target Element or selector to animate
 * @param options Animation options
 */
export const createScanlineAnimation = (
  target: string | Element,
  options: {
    duration?: number;
    scanlineHeight?: number;
    color?: string;
    opacity?: number;
  } = {}
) => {
  const {
    duration = 3,
    scanlineHeight = 2,
    color = '0, 238, 255',
    opacity = 0.2
  } = options;
  
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return;
  
  // Create a scanline element
  const scanline = document.createElement('div');
  scanline.style.position = 'absolute';
  scanline.style.left = '0';
  scanline.style.right = '0';
  scanline.style.height = `${scanlineHeight}px`;
  scanline.style.backgroundColor = `rgba(${color}, ${opacity})`;
  scanline.style.pointerEvents = 'none';
  scanline.style.zIndex = '10';
  
  // Add scanline to target
  (element as HTMLElement).style.position = 'relative';
  (element as HTMLElement).style.overflow = 'hidden';
  element.appendChild(scanline);
  
  // Animate the scanline
  const tl = gsap.timeline({
    repeat: -1,
    defaults: { ease: 'none' }
  });
  
  tl.fromTo(scanline, 
    { top: '-10px' },
    { top: '100%', duration }
  );
  
  return tl;
};

/**
 * Creates a holographic glitch effect
 * @param target Element or selector to animate
 * @param options Animation options
 */
export const createGlitchAnimation = (
  target: string | Element,
  options: {
    intensity?: number;
    duration?: number;
    interval?: number;
  } = {}
) => {
  const {
    intensity = 5,
    duration = 0.2,
    interval = 3
  } = options;
  
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return;
  
  // Create glitch animation timeline
  const tl = gsap.timeline({
    repeat: -1,
    repeatDelay: interval,
    defaults: { ease: 'power1.inOut' }
  });
  
  // Series of quick distortions to simulate glitch
  tl.to(target, { x: intensity, opacity: 0.8, skewX: intensity, duration: duration / 4 })
    .to(target, { x: -intensity, opacity: 0.9, skewX: -intensity, duration: duration / 4 })
    .to(target, { x: intensity / 2, opacity: 1, skewX: 0, duration: duration / 4 })
    .to(target, { x: 0, skewX: 0, duration: duration / 4 });
  
  return tl;
};

/**
 * Creates a holographic 3D card tilt effect
 * @param element Element to apply effect to
 * @param intensity How strong the effect should be (1-10)
 */
export function create3DTiltEffect(element: HTMLElement, intensity: number = 5) {
  if (!element) return;
  
  const height = element.clientHeight;
  const width = element.clientWidth;
  const strengthFactor = intensity * 0.2; // Convert 1-10 scale to usable values
  
  // Add perspective to element
  element.style.transformStyle = 'preserve-3d';
  element.style.perspective = '1000px';
  
  // Handle mouse move for tilt effect
  function handleMouseMove(e: MouseEvent) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPercent = (x / width - 0.5) * 2; // -1 to 1
    const yPercent = (y / height - 0.5) * 2; // -1 to 1
    
    // Apply rotation based on mouse position
    const rotateY = xPercent * (10 * strengthFactor);
    const rotateX = yPercent * (-10 * strengthFactor);
    
    // Apply transform with subtle movement
    gsap.to(element, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: 'power2.out'
    });
  }
  
  // Reset position when mouse leaves
  function handleMouseLeave() {
    gsap.to(element, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: 'elastic.out(1,0.7)'
    });
  }
  
  // Add event listeners
  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);
  
  // Return function to remove event listeners
  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
}

/**
 * Master animation controller to coordinate multiple effects
 */
export class HolographicController {
  private animations: gsap.core.Timeline[] = [];
  private elements: HTMLElement[] = [];
  
  /**
   * Add an element to be animated
   * @param element Element to animate
   * @param effects Array of effect names to apply
   */
  addElement(element: HTMLElement, effects: ('float' | 'glow' | 'glitch' | 'scanline' | 'tilt')[]) {
    this.elements.push(element);
    
    effects.forEach(effect => {
      let animation;
      
      switch (effect) {
        case 'float':
          animation = createFloatingAnimation(element);
          break;
        case 'glow':
          animation = createGlowAnimation(element);
          break;
        case 'glitch':
          animation = createGlitchAnimation(element);
          break;
        case 'scanline':
          animation = createScanlineAnimation(element);
          break;
        case 'tilt':
          // For tilt, we add the event listeners instead of a timeline
          create3DTiltEffect(element);
          return;
      }
      
      if (animation) {
        this.animations.push(animation);
      }
    });
  }
  
  /**
   * Play all animations
   */
  play() {
    this.animations.forEach(animation => animation.play());
  }
  
  /**
   * Pause all animations
   */
  pause() {
    this.animations.forEach(animation => animation.pause());
  }
  
  /**
   * Kill all animations and clean up
   */
  kill() {
    this.animations.forEach(animation => animation.kill());
    this.animations = [];
    this.elements = [];
  }
}
