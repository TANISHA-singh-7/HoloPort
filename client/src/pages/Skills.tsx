import React, { useState } from 'react';
import HoloPanelCard from '../components/HoloPanelCard';
import { motion } from 'framer-motion';
import { skills } from '../data';

const Skills: React.FC = () => {
  // Group skills by category
  const categories = Array.from(new Set(skills.map(skill => skill.category)));
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Filter skills based on active category
  const filteredSkills = activeCategory 
    ? skills.filter(skill => skill.category === activeCategory) 
    : skills;
  
  return (
    <section id="skills" className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-holo-dark -z-10"></div>
      
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-[rgb(var(--neon-primary))] animate-glow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          TECHNICAL SKILLS
        </motion.h2>
        
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button 
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full border ${!activeCategory 
              ? 'bg-[rgba(var(--neon-primary),0.2)] border-[rgba(var(--neon-primary),0.5)] text-[rgb(var(--neon-primary))]' 
              : 'border-[rgba(var(--holo-text),0.3)] text-[rgba(var(--holo-text),0.7)] hover:bg-[rgba(var(--neon-primary),0.1)]'
            } transition-all duration-300`}
          >
            All Skills
          </button>
          
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full border ${activeCategory === category
                ? `bg-[rgba(var(${index % 3 === 0 ? '--neon-primary' : index % 3 === 1 ? '--neon-secondary' : '--neon-tertiary'}),0.2)] 
                   border-[rgba(var(${index % 3 === 0 ? '--neon-primary' : index % 3 === 1 ? '--neon-secondary' : '--neon-tertiary'}),0.5)] 
                   text-[rgb(var(${index % 3 === 0 ? '--neon-primary' : index % 3 === 1 ? '--neon-secondary' : '--neon-tertiary'}))]`
                : 'border-[rgba(var(--holo-text),0.3)] text-[rgba(var(--holo-text),0.7)] hover:bg-[rgba(var(--neon-primary),0.1)]'
              } transition-all duration-300`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredSkills.map((skill, index) => {
            // Determine color based on category
            let colorIndex;
            switch(skill.category) {
              case 'Frontend': colorIndex = 0; break; // primary color
              case 'Backend': colorIndex = 1; break;  // secondary color
              case 'Languages': colorIndex = 2; break;  // tertiary color
              case 'Tools': colorIndex = 0; break;  // primary color
              default: colorIndex = index % 3;
            }
            
            return (
              <HoloPanelCard 
                key={skill.name}
                className="skill-card rounded-lg p-4 flex flex-col items-center text-center backdrop-blur-sm"
                gradient={colorIndex === 0 ? 'primary' : colorIndex === 1 ? 'secondary' : 'tertiary'}
                hover3D={true}
                delay={index}
                hoverEffect="glow"
              >
                <div className={`w-16 h-16 mb-4 flex items-center justify-center bg-[rgba(${colorIndex === 0 ? '0,238,255' : colorIndex === 1 ? '255,0,255' : '112,0,255'},0.15)] rounded-full border border-[rgba(${colorIndex === 0 ? '0,238,255' : colorIndex === 1 ? '255,0,255' : '112,0,255'},0.3)]`}>
                  <i className={`ri-${skill.icon} text-3xl text-[rgb(var(${colorIndex === 0 ? '--neon-primary' : colorIndex === 1 ? '--neon-secondary' : '--neon-tertiary'}))]`}></i>
                </div>
                <h3 className={`text-[rgb(var(${colorIndex === 0 ? '--neon-primary' : colorIndex === 1 ? '--neon-secondary' : '--neon-tertiary'}))] mb-1 font-bold`}>{skill.name}</h3>
                <div className="text-xs text-[rgba(var(--holo-text),0.7)] mb-2">{skill.category}</div>
                <div className={`w-full h-2 bg-[rgba(${colorIndex === 0 ? '0,238,255' : colorIndex === 1 ? '255,0,255' : '112,0,255'},0.1)] rounded-full mt-1 overflow-hidden border border-[rgba(${colorIndex === 0 ? '0,238,255' : colorIndex === 1 ? '255,0,255' : '112,0,255'},0.2)]`}>
                  <div 
                    className={`h-full bg-[rgb(var(${colorIndex === 0 ? '--neon-primary' : colorIndex === 1 ? '--neon-secondary' : '--neon-tertiary'}))] rounded-full`} 
                    style={{ width: `${skill.proficiency}%` }}
                  ></div>
                </div>
                <div className="text-xs text-[rgba(var(--holo-text),0.7)] mt-1">{skill.proficiency}%</div>
              </HoloPanelCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
