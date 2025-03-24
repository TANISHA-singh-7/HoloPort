import React from 'react';
import HoloPanelCard from '../components/HoloPanelCard';
import HoloButton from '../components/HoloButton';
import { motion } from 'framer-motion';
import { experience } from '../data';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-holo-dark -z-10"></div>
      
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-[rgb(var(--neon-primary))] animate-glow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          PROFESSIONAL EXPERIENCE
        </motion.h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-[rgb(var(--neon-primary))] via-[rgb(var(--neon-secondary))] to-[rgb(var(--neon-tertiary))] transform -translate-x-1/2"></div>
            
            {experience.map((exp, index) => (
              <div className="relative z-10" key={index}>
                <div className="flex flex-col md:flex-row items-center mb-8">
                  <div className="order-1 md:w-5/12"></div>
                  
                  <motion.div 
                    className="order-1 md:order-2 w-8 h-8 bg-[rgb(var(--neon-primary))] rounded-full border-4 border-holo-dark flex items-center justify-center z-10 transform md:translate-x-0 -translate-y-4 md:-translate-y-0 animate-pulse-slow"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <i className={`ri-${exp.icon} text-holo-dark`}></i>
                  </motion.div>
                  
                  <div className="order-1 md:order-3 md:w-5/12">
                    <HoloPanelCard
                      className="p-6 rounded-lg backdrop-blur-md"
                      animate={true}
                      delay={index}
                      hover3D={true}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-[rgb(var(--neon-primary))] mb-1">{exp.title}</h3>
                          <p className="text-[rgb(var(--holo-text))] opacity-70 text-sm mb-3">{exp.period}</p>
                        </div>
                        <img src={exp.logo} alt={`${exp.company} Logo`} className="w-10 h-10 object-contain opacity-80" />
                      </div>
                      <p className="text-[rgb(var(--holo-text))] mb-4">{exp.description}</p>
                      <HoloButton 
                        text={exp.linkText} 
                        icon={exp.linkIcon} 
                        size="sm"
                        onClick={() => window.open(exp.link, '_blank')}
                      />
                    </HoloPanelCard>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
