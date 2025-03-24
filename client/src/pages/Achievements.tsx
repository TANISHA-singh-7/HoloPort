import React from 'react';
import HoloPanelCard from '../components/HoloPanelCard';
import HoloButton from '../components/HoloButton';
import { motion } from 'framer-motion';
import { achievements } from '../data';

const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-holo-dark -z-10"></div>
      
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-[rgb(var(--neon-primary))] animate-glow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          NOTABLE ACHIEVEMENTS
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {achievements.map((achievement, index) => (
            <HoloPanelCard
              key={index}
              className="achievement-badge rounded-lg p-6 backdrop-blur-md relative overflow-hidden"
              gradient={index % 2 === 0 ? 'primary' : 'secondary'}
              delay={index}
              hover3D={true}
            >
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 flex items-center justify-center bg-[rgba(${index % 2 === 0 ? '255,0,255' : '0,238,255'},0.2)] rounded-full`}>
                    <i className={`ri-${achievement.icon} text-2xl text-[rgb(var(${index % 2 === 0 ? '--neon-secondary' : '--neon-tertiary'}))]`}></i>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full bg-[rgb(var(${index % 2 === 0 ? '--neon-secondary' : '--neon-tertiary'}))] animate-pulse mr-2`}></div>
                    <span className={`text-xs text-[rgb(var(${index % 2 === 0 ? '--neon-secondary' : '--neon-tertiary'}))]`}>{achievement.year}</span>
                  </div>
                </div>
                <h3 className={`text-xl font-bold text-[rgb(var(${index % 2 === 0 ? '--neon-secondary' : '--neon-tertiary'}))] mb-2`}>{achievement.title}</h3>
                <p className="text-[rgb(var(--holo-text))] mb-4">{achievement.description}</p>
                <HoloButton 
                  text="View Badge" 
                  icon="award-line" 
                  size="sm"
                  color={index % 2 === 0 ? 'secondary' : 'tertiary'}
                  onClick={() => window.open(achievement.link, '_blank')}
                />
              </div>
            </HoloPanelCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
