import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
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
  const [location, setLocation] = useLocation();
  const { playClick, playBeep, playSuccess, playError } = useSound();
  const [commandHistory, setCommandHistory] = useState<TerminalHistoryEntry[]>([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState<number | null>(null);
  
  const commands: Record<string, string> = {
    'help': 'Available commands:\n- whoami: Display basic information\n- skills: List technical skills\n- projects: View project portfolio\n- experience: Show work experience\n- achievements: View accomplishments\n- contact: Get contact information\n- coding-profiles: Show coding platform profiles\n- goto [section]: Navigate to a specific section\n- clear: Clear terminal history',
    'whoami': 'Tanisha Singh - Software Engineer, Competitive Programmer and Full-stack Developer with expertise in web development and AI integration.',
    'projects': '- Krishi Nirman - Farmer assistance platform\n- Period Tracker - AI-powered cycle tracking\n- MamaNest - Smart maternity care\n- BloomWithin - Mental health application\n- SmartEd - AI education platform\n- CryptoVault - Secure cryptocurrency wallet\n- EcoTrack - Environmental monitoring\n\nType \'goto projects\' to explore more details...',
    'skills': 'Frontend: HTML, CSS, JavaScript, React, Tailwind CSS, Three.js\nBackend: Node.js, Express, MongoDB, MySQL, PostgreSQL\nLanguages: JavaScript, TypeScript, Python, Java, C++\nOther: RESTful APIs, Socket.io, Git, Docker, AWS\n\nType \'goto skills\' to explore more...',
    'experience': '- Microsoft SWE Intern (May 2025 – July 2025)\n- Google STEP Intern (May 2024 – July 2024)\n- Open Source Contributor at Mozilla (2023-Present)\n- Teaching Assistant for Data Structures (2023-2024)\n\nType \'goto experience\' to explore more...',
    'achievements': '- Walmart CodeHers 2025 Finalist (Top 6%)\n- Google Girls Hackathon 2024 Finalist (Top 0.08%)\n- Microsoft Imagine Cup Semifinalist 2024\n- AWS DeepRacer Student League Top 10\n- Flipkart Grid 6.0 QuarterFinalist (Top 1.65%)\n- TechGIG Code Gladiators 2023 Regional Winner\n\nType \'goto achievements\' to explore more...',
    'contact': 'Email: tanishasingh4785@gmail.com\nGitHub: tanisha-singh-7\nLinkedIn: tanisha-singh-88b544260\nTwitter: @tanishasingh_dev\n\nType \'goto contact\' to reach out...',
    'coding-profiles': '- LeetCode: tanisha_singh (600+ problems solved)\n- CodeChef: tanisha_singh (5★ coder)\n- Codeforces: tanisha_singh (Specialist)\n- HackerRank: tanisha_singh (5★ in Problem Solving)\n\nType \'goto coding-profiles\' to explore more...',
    'clear': 'CLEAR_TERMINAL',
  };
  
  // Direct section navigation commands
  const sectionCommands = ['home', 'skills', 'projects', 'experience', 'achievements', 'contact', 'coding-profiles', 'coding'];
  
  const executeCommand = useCallback((cmd: string) => {
    const commandLower = cmd.toLowerCase().trim();
    let response = '';
    let isError = false;
    
    // Handle direct section navigation (user can just type the section name)
    if (sectionCommands.includes(commandLower)) {
      playSuccess();
      
      if (commandLower === 'home') {
        setLocation('/');
        response = 'Navigating to home section...';
      } else if (commandLower === 'coding' || commandLower === 'coding-profiles') {
        setLocation('/coding-profiles');
        response = 'Navigating to coding profiles section...';
      } else {
        setLocation(`/${commandLower}`);
        response = `Navigating to ${commandLower} section...`;
      }
    }
    // Handle goto commands
    else if (commandLower.startsWith('goto ')) {
      const section = commandLower.substring(5).trim();
      
      switch (section) {
        case 'home':
          setLocation('/');
          response = 'Navigating to home section...';
          playSuccess();
          break;
        case 'skills':
          setLocation('/skills');
          response = 'Navigating to skills section...';
          playSuccess();
          break;
        case 'projects':
          setLocation('/projects');
          response = 'Navigating to projects section...';
          playSuccess();
          break;
        case 'experience':
          setLocation('/experience');
          response = 'Navigating to experience section...';
          playSuccess();
          break;
        case 'achievements':
          setLocation('/achievements');
          response = 'Navigating to achievements section...';
          playSuccess();
          break;
        case 'contact':
          setLocation('/contact');
          response = 'Navigating to contact section...';
          playSuccess();
          break;
        case 'coding-profiles':
        case 'coding':
          setLocation('/coding-profiles');
          response = 'Navigating to coding profiles section...';
          playSuccess();
          break;
        default:
          response = `Section "${section}" not found. Available sections: home, skills, projects, experience, achievements, contact, coding-profiles`;
          isError = true;
          playError();
      }
    }
    // Handle clear command
    else if (commandLower === 'clear') {
      setCommandHistory([]);
      playClick();
      return; // Don't add this to command history
    }
    // Handle normal commands
    else if (commands[commandLower]) {
      response = commands[commandLower];
      playClick();
    }
    // Handle unknown commands
    else {
      response = `Command not found: ${cmd}. Type 'help' for available commands.`;
      isError = true;
      playError();
    }
    
    setCommandHistory(prev => [...prev, { command: cmd, response, isError }]);
    setCurrentCommandIndex(null);
  }, [commands, setLocation, playClick, playSuccess, playError]);
  
  // Navigate through command history
  const navigateHistory = useCallback((direction: 'up' | 'down') => {
    if (commandHistory.length === 0) return;
    
    if (direction === 'up') {
      setCurrentCommandIndex(prev => {
        if (prev === null) return commandHistory.length - 1;
        return prev > 0 ? prev - 1 : 0;
      });
      playBeep();
    } else {
      setCurrentCommandIndex(prev => {
        if (prev === null) return null;
        return prev < commandHistory.length - 1 ? prev + 1 : null;
      });
      playBeep();
    }
  }, [commandHistory, playBeep]);
  
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
