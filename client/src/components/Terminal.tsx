import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTerminal } from '../context/TerminalContext';
import { useSound } from '../context/SoundContext';
import { useLocation } from 'wouter';

interface TerminalProps {
  initialText?: string;
  height?: string;
}

const Terminal: React.FC<TerminalProps> = ({ initialText = '', height = 'h-80 md:h-96' }) => {
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();
  const { commands, executeCommand, commandHistory, currentCommandIndex, navigateHistory } = useTerminal();
  const { playBeep, playClick } = useSound();
  const [currentInput, setCurrentInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  // Auto-scroll to bottom on content change
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [commandHistory]);
  
  // Handle key input for terminal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (currentInput.trim()) {
        executeCommand(currentInput.trim());
        setCurrentInput('');
        playClick();
      }
    } else if (e.key === 'Backspace') {
      setCurrentInput(prev => prev.slice(0, -1));
    } else if (e.key === 'ArrowUp') {
      navigateHistory('up');
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      navigateHistory('down');
      e.preventDefault();
    } else if (e.key.length === 1) {
      setCurrentInput(prev => prev + e.key);
      playBeep();
    }
  };
  
  // Set current input from history when navigating
  useEffect(() => {
    if (commandHistory.length > 0 && currentCommandIndex !== null) {
      setCurrentInput(commandHistory[currentCommandIndex].command);
    } else if (currentCommandIndex === null) {
      setCurrentInput('');
    }
  }, [currentCommandIndex, commandHistory]);
  
  // Simulate focus on terminal when clicking anywhere in the terminal
  const handleTerminalClick = () => {
    setIsFocused(true);
  };
  
  const handleGlobalKeydown = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return;
    }
    
    if (!isFocused) return;
    
    if (e.key === 'Enter') {
      if (currentInput.trim()) {
        executeCommand(currentInput.trim());
        setCurrentInput('');
        playClick();
      }
    } else if (e.key === 'Backspace') {
      setCurrentInput(prev => prev.slice(0, -1));
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      navigateHistory('up');
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      navigateHistory('down');
      e.preventDefault();
    } else if (e.key.length === 1) {
      setCurrentInput(prev => prev + e.key);
      playBeep();
    }
  }, [currentInput, executeCommand, isFocused, navigateHistory, playBeep, playClick]);
  
  useEffect(() => {
    // Add event listener only when terminal is focused
    if (isFocused) {
      window.addEventListener('keydown', handleGlobalKeydown);
    }
    
    // Remove event listener when component unmounts or loses focus
    return () => {
      window.removeEventListener('keydown', handleGlobalKeydown);
    };
  }, [handleGlobalKeydown, isFocused]);
  
  // Blur terminal when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (terminalContentRef.current && !terminalContentRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Add blinking cursor
  const [cursorVisible, setCursorVisible] = useState(true);
  
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);
  
  return (
    <div 
      className={`terminal rounded-lg overflow-hidden ${height} ${isFocused ? 'ring-1 ring-[rgb(var(--neon-primary))]' : ''}`} 
      onClick={handleTerminalClick} 
      tabIndex={0} 
      onKeyDown={handleKeyDown}
    >
      <div className="terminal-header flex items-center px-4 py-2 bg-black bg-opacity-80">
        <div className="w-3 h-3 rounded-full bg-red-500 opacity-70 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-70 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-green-500 opacity-70"></div>
        <div className="ml-4 text-xs opacity-70">tanisha@tanishaverse:~</div>
      </div>
      <div ref={terminalContentRef} className="p-4 font-mono text-sm h-[calc(100%-32px)] overflow-auto bg-black bg-opacity-70">
        {initialText && (
          <div className="mb-4">{initialText}</div>
        )}
        
        <div className="mb-2">Welcome to TanishaVerse OS v1.0.0</div>
        <div className="mb-2">Type <span className="text-[rgb(var(--neon-secondary))]">'help'</span> to see available commands</div>
        
        {/* Command history */}
        {commandHistory.map((entry, index) => (
          <div key={index}>
            <div className="mb-1 terminal-line">
              <span className="text-[rgb(var(--neon-secondary))]">tanisha@tanishaverse:~$</span> {entry.command}
            </div>
            <div className={`mb-3 ${entry.isError ? 'text-red-400' : ''} whitespace-pre-line`}>
              {entry.response}
            </div>
          </div>
        ))}
        
        {/* Current input line */}
        <div className="terminal-prompt flex">
          <span className="text-[rgb(var(--neon-secondary))]">tanisha@tanishaverse:~$</span> 
          <span className="ml-1">{currentInput}</span>
          {cursorVisible && isFocused && <span className="ml-px w-2 h-5 bg-[rgb(var(--neon-primary))] inline-block animate-pulse"></span>}
        </div>
      </div>
    </div>
  );
};

export default Terminal;
