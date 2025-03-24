import React from 'react';
import HoloPanelCard from '../components/HoloPanelCard';
import HoloButton from '../components/HoloButton';
import { motion } from 'framer-motion';
import { codingProfiles } from '../data';

const CodingProfiles: React.FC = () => {
  return (
    <section id="coding-profiles" className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-holo-dark -z-10"></div>
      
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-[rgb(var(--neon-primary))] animate-glow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          CODING PROFILES
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {codingProfiles.map((profile, index) => (
            <HoloPanelCard
              key={index}
              className="rounded-lg p-6 backdrop-blur-md transition-transform hover:scale-105"
              gradient={index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'tertiary'}
              delay={index}
              hover3D={true}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className={`text-xl font-bold text-[rgb(var(${index % 3 === 0 ? '--neon-primary' : index % 3 === 1 ? '--neon-secondary' : '--neon-tertiary'}))]`}>{profile.platform}</h3>
                <div className={`w-10 h-10 flex items-center justify-center bg-[rgba(${index % 3 === 0 ? '0,238,255' : index % 3 === 1 ? '255,0,255' : '112,0,255'},0.1)] rounded-full`}>
                  <i className={`ri-${profile.icon} text-[rgb(var(${index % 3 === 0 ? '--neon-primary' : index % 3 === 1 ? '--neon-secondary' : '--neon-tertiary'}))]`}></i>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  {profile.stars ? (
                    <>
                      {[...Array(profile.stars)].map((_, i) => (
                        <i key={i} className="ri-star-fill text-yellow-500 mr-2"></i>
                      ))}
                    </>
                  ) : profile.rank ? (
                    <span className="text-green-400 mr-2 font-medium">{profile.rank}</span>
                  ) : null}
                  <span className="text-sm text-[rgb(var(--holo-text))]">{profile.rating}</span>
                </div>
                <div className={`w-full h-2 bg-[rgba(${index % 3 === 0 ? '0,238,255' : index % 3 === 1 ? '255,0,255' : '112,0,255'},0.2)] rounded-full`}>
                  <div 
                    className={`h-full bg-[rgb(var(${index % 3 === 0 ? '--neon-primary' : index % 3 === 1 ? '--neon-secondary' : '--neon-tertiary'}))] rounded-full`} 
                    style={{ width: `${profile.progressPercentage}%` }}
                  ></div>
                </div>
              </div>
              
              <HoloButton 
                text="View Profile" 
                icon="external-link-line" 
                size="sm"
                color={index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'tertiary'}
                onClick={() => window.open(profile.link, '_blank')}
              />
            </HoloPanelCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CodingProfiles;
