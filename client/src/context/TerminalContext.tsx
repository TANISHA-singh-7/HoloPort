import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useLocation } from 'wouter';
import { useSound } from './SoundContext';

interface TerminalHistoryEntry {
  command: string;
  response: string;
  isError?: boolean;
}

interface TerminalContextProps {
  commands: Record<string, string>;
  executeCommand: (cmd: string) => void;
  commandHistory: TerminalHistoryEntry[];
  currentCommandIndex: number | null;
  navigateHistory: (direction: 'up' | 'down') => void;
}

const TerminalContext = createContext<TerminalContextProps>({
  commands: {},
  executeCommand: () => {},
  commandHistory: [],
  currentCommandIndex: null,
  navigateHistory: () => {},
});

export const useTerminal = () => useContext(TerminalContext);

interface TerminalProviderProps {
  children: ReactNode;
}

export const TerminalProvider: React.FC<TerminalProviderProps> = ({ children }) => {
  const [, setLocation] = useLocation();
  const { playClick } = useSound();
  const [commandHistory, setCommandHistory] = useState<TerminalHistoryEntry[]>([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState<number | null>(null);
  
  const commands: Record<string, string> = {
    'help': 'Available commands: whoami, projects, skills, experience, achievements, contact, clear, goto [section]',
    'whoami': 'Tanisha Singh - Software Engineer, Competitive Programmer and Full-stack Developer.',
    'projects': '- Krishi Nirman - Farmer assistance platform\n- Period Tracker - AI-powered cycle tracking\n- MamaNest - Smart maternity care\nType \'goto projects\' to explore more...',
    'skills': 'Technical Skills: HTML, CSS, JavaScript, React, Express, MongoDB, MySQL, Python, Socket.io\nType \'goto skills\' to explore more...',
    'experience': 'Microsoft SWE Intern (May 2025 – July 2025)\nType \'goto experience\' to explore more...',
    'achievements': '- Walmart CodeHers 2025 Finalist (Top 6%)\n- Google Girls Hackathon 2024 Finalist (Top 0.08%)\n- Flipkart Grid 6.0 QuarterFinalist (Top 1.65%)\n- Myntra We for She 2024 Quarterfinalist\nType \'goto achievements\' to explore more...',
    'contact': 'Email: tanishasingh4785@gmail.com\nGitHub: tanisha-singh-7\nLinkedIn: tanisha-singh-88b544260\nType \'goto contact\' to reach out...',
    'clear': 'CLEAR_TERMINAL',
  };
  
  const executeCommand = useCallback((cmd: string) => {
    const commandLower = cmd.toLowerCase().trim();
    let response = '';
    let isError = false;
    
    // Handle goto commands
    if (commandLower.startsWith('goto ')) {
      const section = commandLower.substring(5).trim();
      playClick();
      
      switch (section) {
        case 'home':
          setLocation('/');
          response = 'Navigating to home section...';
          break;
        case 'skills':
          setLocation('/skills');
          response = 'Navigating to skills section...';
          break;
        case 'projects':
          setLocation('/projects');
          response = 'Navigating to projects section...';
          break;
        case 'experience':
          setLocation('/experience');
          response = 'Navigating to experience section...';
          break;
        case 'achievements':
          setLocation('/achievements');
          response = 'Navigating to achievements section...';
          break;
        case 'contact':
          setLocation('/contact');
          response = 'Navigating to contact section...';
          break;
        case 'coding-profiles':
        case 'coding':
          setLocation('/coding-profiles');
          response = 'Navigating to coding profiles section...';
          break;
        default:
          response = `Section "${section}" not found. Available sections: home, skills, projects, experience, achievements, contact, coding-profiles`;
          isError = true;
      }
    }
    // Handle normal commands
    else if (commandLower === 'clear') {
      setCommandHistory([]);
      return; // Don't add this to command history
    }
    else if (commands[commandLower]) {
      response = commands[commandLower];
    }
    else {
      response = `Command not found: ${cmd}. Type 'help' for available commands.`;
      isError = true;
    }
    
    setCommandHistory(prev => [...prev, { command: cmd, response, isError }]);
    setCurrentCommandIndex(null);
  }, [commands, setLocation, playClick]);
  
  // Navigate through command history
  const navigateHistory = useCallback((direction: 'up' | 'down') => {
    if (commandHistory.length === 0) return;
    
    if (direction === 'up') {
      setCurrentCommandIndex(prev => {
        if (prev === null) return commandHistory.length - 1;
        return prev > 0 ? prev - 1 : 0;
      });
    } else {
      setCurrentCommandIndex(prev => {
        if (prev === null) return null;
        return prev < commandHistory.length - 1 ? prev + 1 : null;
      });
    }
  }, [commandHistory]);
  
  return (
    <TerminalContext.Provider value={{
      commands,
      executeCommand,
      commandHistory,
      currentCommandIndex,
      navigateHistory,
    }}>
      {children}
    </TerminalContext.Provider>
  );
};
