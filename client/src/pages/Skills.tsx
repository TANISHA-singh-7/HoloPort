import React from 'react';
import HoloPanelCard from '../components/HoloPanelCard';
import { motion } from 'framer-motion';
import { skills } from '../data';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-holo-dark -z-10"></div>
      
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-[rgb(var(--neon-primary))] animate-glow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          TECHNICAL SKILLS
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <HoloPanelCard 
              key={index}
              className="skill-card rounded-lg p-4 flex flex-col items-center text-center backdrop-blur-sm"
              gradient={index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'tertiary'}
              hover3D={true}
              delay={index}
              hoverEffect="glow"
            >
              <div className={`w-16 h-16 mb-4 flex items-center justify-center bg-[rgba(${index % 3 === 0 ? '0,238,255' : index % 3 === 1 ? '255,0,255' : '112,0,255'},0.1)] rounded-full`}>
                <i className={`ri-${skill.icon} text-3xl text-[rgb(var(${index % 3 === 0 ? '--neon-primary' : index % 3 === 1 ? '--neon-secondary' : '--neon-tertiary'}))]`}></i>
              </div>
              <h3 className={`text-[rgb(var(${index % 3 === 0 ? '--neon-primary' : index % 3 === 1 ? '--neon-secondary' : '--neon-tertiary'}))] mb-1`}>{skill.name}</h3>
              <div className={`w-full h-1 bg-[rgba(${index % 3 === 0 ? '0,238,255' : index % 3 === 1 ? '255,0,255' : '112,0,255'},0.2)] rounded-full mt-2`}>
                <div 
                  className={`h-full bg-[rgb(var(${index % 3 === 0 ? '--neon-primary' : index % 3 === 1 ? '--neon-secondary' : '--neon-tertiary'}))] rounded-full`} 
                  style={{ width: `${skill.proficiency}%` }}
                ></div>
              </div>
            </HoloPanelCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
