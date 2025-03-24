import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Create sound context
const audioContext = typeof AudioContext !== 'undefined' 
  ? new AudioContext() 
  : undefined;

if (audioContext) {
  // Resume AudioContext on user interaction
  document.addEventListener('click', () => {
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
  }, { once: true });
}

createRoot(document.getElementById("root")!).render(<App />);
