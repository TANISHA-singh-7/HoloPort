import React, { useState } from 'react';
import HoloPanelCard from '../components/HoloPanelCard';
import HoloButton from '../components/HoloButton';
import { motion } from 'framer-motion';
import { useSound } from '../context/SoundContext';
import { contactInfo } from '../data';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const { playClick, playBeep } = useSound();
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  
  const contactMutation = useMutation({
    mutationFn: (data: ContactFormData) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully",
        description: "Your transmission has been received. Thank you for contacting me!",
        variant: "default",
      });
      setFormData({ name: '', email: '', message: '' });
    },
    onError: (error) => {
      toast({
        title: "Transmission Failed",
        description: `There was an error sending your message: ${error.message}`,
        variant: "destructive",
      });
    }
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    playBeep();
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    contactMutation.mutate(formData);
  };
  
  return (
    <section id="contact" className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-holo-dark -z-10"></div>
      
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-[rgb(var(--neon-primary))] animate-glow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          CONTACT TRANSMISSION
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <HoloPanelCard
            className="rounded-lg p-6 backdrop-blur-md relative"
            gradient="primary"
            hover3D={false}
          >
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-[rgb(var(--neon-primary))] mb-6">Send Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-[rgb(var(--holo-text))] text-sm mb-2">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name" 
                    className="contact-input w-full p-3 rounded-md bg-[rgba(0,30,60,0.2)] border border-[rgba(0,238,255,0.3)] text-[rgb(var(--holo-text))] placeholder-[rgb(var(--holo-text))]/30 focus:outline-none focus:border-[rgb(var(--neon-primary))] transition"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-[rgb(var(--holo-text))] text-sm mb-2">Your Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email" 
                    className="contact-input w-full p-3 rounded-md bg-[rgba(0,30,60,0.2)] border border-[rgba(0,238,255,0.3)] text-[rgb(var(--holo-text))] placeholder-[rgb(var(--holo-text))]/30 focus:outline-none focus:border-[rgb(var(--neon-primary))] transition"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-[rgb(var(--holo-text))] text-sm mb-2">Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4} 
                    placeholder="Enter your message" 
                    className="contact-input w-full p-3 rounded-md bg-[rgba(0,30,60,0.2)] border border-[rgba(0,238,255,0.3)] text-[rgb(var(--holo-text))] placeholder-[rgb(var(--holo-text))]/30 focus:outline-none focus:border-[rgb(var(--neon-primary))] transition"
                    required
                  ></textarea>
                </div>
                <HoloButton 
                  text={contactMutation.isPending ? "Sending..." : "Send Transmission"}
                  icon="send-plane-line"
                  type="submit"
                  disabled={contactMutation.isPending}
                />
              </form>
            </div>
          </HoloPanelCard>
          
          <HoloPanelCard
            className="rounded-lg p-6 backdrop-blur-md"
            gradient="secondary"
            delay={1}
          >
            <h3 className="text-xl font-bold text-[rgb(var(--neon-primary))] mb-6">Connect With Me</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center bg-[rgba(0,238,255,0.1)] rounded-full mr-4">
                  <i className="ri-mail-line text-[rgb(var(--neon-primary))]"></i>
                </div>
                <div>
                  <h4 className="text-[rgb(var(--holo-text))] font-medium">Email</h4>
                  <a href={`mailto:${contactInfo.email}`} className="text-[rgb(var(--neon-primary))] hover:underline">{contactInfo.email}</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center bg-[rgba(255,0,255,0.1)] rounded-full mr-4">
                  <i className="ri-github-line text-[rgb(var(--neon-secondary))]"></i>
                </div>
                <div>
                  <h4 className="text-[rgb(var(--holo-text))] font-medium">GitHub</h4>
                  <a href={contactInfo.github} target="_blank" rel="noreferrer" className="text-[rgb(var(--neon-secondary))] hover:underline">{contactInfo.githubUsername}</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center bg-[rgba(112,0,255,0.1)] rounded-full mr-4">
                  <i className="ri-linkedin-line text-[rgb(var(--neon-tertiary))]"></i>
                </div>
                <div>
                  <h4 className="text-[rgb(var(--holo-text))] font-medium">LinkedIn</h4>
                  <a href={contactInfo.linkedin} target="_blank" rel="noreferrer" className="text-[rgb(var(--neon-tertiary))] hover:underline">{contactInfo.linkedinUsername}</a>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-[rgb(var(--holo-text))] font-medium mb-3">Current Status</h4>
                <div className="bg-[rgba(0,22,34,0.8)] p-3 rounded-md border border-[rgba(0,238,255,0.2)] text-sm font-mono">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse mr-2"></div>
                    <span className="text-green-400">Available for opportunities</span>
                  </div>
                  <div className="mt-2 text-[rgb(var(--holo-text))] opacity-70">System online and ready to process new connections</div>
                </div>
              </div>
            </div>
          </HoloPanelCard>
        </div>
      </div>
    </section>
  );
};

export default Contact;
