import React from 'react';
import HoloPanelCard from '../components/HoloPanelCard';
import HoloButton from '../components/HoloButton';
import { motion } from 'framer-motion';
import { projects } from '../data';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-holo-dark -z-10"></div>
      
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-[rgb(var(--neon-primary))] animate-glow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          HOLOGRAPHIC PROJECTS
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <HoloPanelCard 
              key={index}
              className="project-card rounded-lg overflow-hidden backdrop-blur-md relative"
              gradient={index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'tertiary'}
              delay={index}
              hover3D={true}
            >
              <div className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-xl font-bold text-[rgb(var(${index % 3 === 0 ? '--neon-primary' : index % 3 === 1 ? '--neon-secondary' : '--neon-tertiary'}))] animate-glow`}>{project.name}</h3>
                  <div className={`bg-[rgba(${index % 3 === 0 ? '0,238,255' : index % 3 === 1 ? '255,0,255' : '112,0,255'},0.2)] rounded-full h-8 w-8 flex items-center justify-center`}>
                    <i className={`ri-${project.icon} text-[rgb(var(${index % 3 === 0 ? '--neon-primary' : index % 3 === 1 ? '--neon-secondary' : '--neon-tertiary'}))]`}></i>
                  </div>
                </div>
                <p className="text-[rgb(var(--holo-text))] mb-4">{project.description}</p>
                <div className="mb-4">
                  <h4 className="text-[rgb(var(--holo-text))] opacity-70 text-sm mb-2">TECH STACK</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className={`bg-[rgba(${index % 3 === 0 ? '0,238,255' : index % 3 === 1 ? '255,0,255' : '112,0,255'},0.1)] text-[rgb(var(${index % 3 === 0 ? '--neon-primary' : index % 3 === 1 ? '--neon-secondary' : '--neon-tertiary'}))] text-xs rounded px-2 py-1`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <HoloButton 
                    text="Live Demo" 
                    icon="eye-line" 
                    size="sm"
                    color={index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'tertiary'}
                    onClick={() => window.open(project.liveDemo, '_blank')}
                  />
                  <HoloButton 
                    text="GitHub" 
                    icon="github-line" 
                    size="sm"
                    color={index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'tertiary'}
                    onClick={() => window.open(project.github, '_blank')}
                  />
                </div>
              </div>
              <div className={`h-1 bg-gradient-to-r ${
                index % 3 === 0 
                  ? 'from-[rgb(var(--neon-primary))] via-[rgb(var(--neon-secondary))] to-[rgb(var(--neon-tertiary))]' 
                  : index % 3 === 1 
                    ? 'from-[rgb(var(--neon-secondary))] via-[rgb(var(--neon-tertiary))] to-[rgb(var(--neon-primary))]' 
                    : 'from-[rgb(var(--neon-tertiary))] via-[rgb(var(--neon-primary))] to-[rgb(var(--neon-secondary))]'
              }`}></div>
            </HoloPanelCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
