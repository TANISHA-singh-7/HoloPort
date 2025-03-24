import { useEffect, useState, useCallback } from 'react';
import { useTerminal } from '../context/TerminalContext';

type KeyMap = {
  [key: string]: () => void;
};

export const useKeyCommand = (keyMap?: KeyMap, active: boolean = true) => {
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const { executeCommand } = useTerminal();
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Ignore key events if inside input or textarea
    if (
      e.target instanceof HTMLInputElement || 
      e.target instanceof HTMLTextAreaElement
    ) {
      return;
    }
    
    setPressedKey(e.key);
    
    // Process predefined key commands
    if (keyMap && keyMap[e.key]) {
      keyMap[e.key]();
      e.preventDefault();
    }
    
    // Terminal shortcut keys
    if (e.ctrlKey && e.key === 't') {
      executeCommand('help'); // Show terminal help
      e.preventDefault();
    } else if (e.ctrlKey && e.key === 'k') {
      executeCommand('clear'); // Clear terminal
      e.preventDefault();
    }
    
    // Section navigation shortcuts
    if (e.altKey) {
      switch (e.key) {
        case '1':
          executeCommand('goto home');
          e.preventDefault();
          break;
        case '2':
          executeCommand('goto skills');
          e.preventDefault();
          break;
        case '3':
          executeCommand('goto projects');
          e.preventDefault();
          break;
        case '4':
          executeCommand('goto experience');
          e.preventDefault();
          break;
        case '5':
          executeCommand('goto achievements');
          e.preventDefault();
          break;
        case '6':
          executeCommand('goto coding-profiles');
          e.preventDefault();
          break;
        case '7':
          executeCommand('goto contact');
          e.preventDefault();
          break;
      }
    }
  }, [keyMap, executeCommand]);
  
  const handleKeyUp = useCallback(() => {
    setPressedKey(null);
  }, []);
  
  useEffect(() => {
    if (!active) return;
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [active, handleKeyDown, handleKeyUp]);
  
  return { pressedKey };
};
