import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Achievements from "./pages/Achievements";
import CodingProfiles from "./pages/CodingProfiles";
import Contact from "./pages/Contact";
import NotFound from "./pages/not-found";

import { TerminalProvider } from "./context/TerminalContext";
import { SoundProvider } from "./context/SoundContext";
import { useEffect } from "react";

function Router() {
  useEffect(() => {
    // Scroll to top when navigating
    document.documentElement.scrollTop = 0;
  }, []);
  
  return (
    <div className="noise">
      <div className="scanline fixed inset-0 pointer-events-none z-50 opacity-10"></div>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/skills" component={Skills} />
        <Route path="/projects" component={Projects} />
        <Route path="/experience" component={Experience} />
        <Route path="/achievements" component={Achievements} />
        <Route path="/coding-profiles" component={CodingProfiles} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
      <footer className="py-8 border-t border-holo-primary/20 relative">
        <div className="container mx-auto px-6 text-center">
          <p className="text-holo-text opacity-70">&copy; {new Date().getFullYear()} Tanisha Singh's HoloVerse | All rights reserved</p>
          <p className="text-sm text-holo-text opacity-50 mt-2">Designed by Tanisha Singh</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SoundProvider>
        <TerminalProvider>
          <Router />
          <Toaster />
        </TerminalProvider>
      </SoundProvider>
    </QueryClientProvider>
  );
}

export default App;
