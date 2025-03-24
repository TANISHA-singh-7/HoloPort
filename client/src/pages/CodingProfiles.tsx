import React, { useState } from 'react';
import HoloPanelCard from '../components/HoloPanelCard';
import HoloButton from '../components/HoloButton';
import { motion } from 'framer-motion';
import { codingProfiles } from '../data';

const CodingProfiles: React.FC = () => {
  const [expandedProfile, setExpandedProfile] = useState<number | null>(null);
  
  const toggleExpand = (index: number) => {
    if (expandedProfile === index) {
      setExpandedProfile(null);
    } else {
      setExpandedProfile(index);
    }
  };
  
  return (
    <section id="coding-profiles" className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-holo-dark -z-10"></div>
      
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-[rgb(var(--neon-primary))] animate-glow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          COMPETITIVE PROGRAMMING PROFILES
        </motion.h2>
        
        <motion.p
          className="text-[rgb(var(--holo-text))] text-center max-w-3xl mx-auto mb-12 opacity-80"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Track my algorithmic problem-solving journey across various competitive programming platforms
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {codingProfiles.map((profile, index) => {
            const isExpanded = expandedProfile === index;
            const colorVariant = index % 3;
            const colorPrimary = colorVariant === 0 ? '--neon-primary' : colorVariant === 1 ? '--neon-secondary' : '--neon-tertiary';
            const bgColorRGBA = colorVariant === 0 ? '0,238,255' : colorVariant === 1 ? '255,0,255' : '112,0,255';
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${isExpanded ? 'md:col-span-2' : ''}`}
              >
                <HoloPanelCard
                  className={`rounded-lg p-6 backdrop-blur-md transition-all duration-300 ${isExpanded ? 'transform-none' : 'hover:scale-[1.02]'}`}
                  gradient={colorVariant === 0 ? 'primary' : colorVariant === 1 ? 'secondary' : 'tertiary'}
                  hoverEffect={isExpanded ? 'none' : 'glow'}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 flex items-center justify-center bg-[rgba(${bgColorRGBA},0.15)] rounded-full border border-[rgba(${bgColorRGBA},0.3)] mr-4`}>
                        <i className={`ri-${profile.icon} text-2xl text-[rgb(var(${colorPrimary}))]`}></i>
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold text-[rgb(var(${colorPrimary}))]`}>{profile.platform}</h3>
                        <div className="flex items-center mt-1">
                          {profile.stars ? (
                            <>
                              {[...Array(profile.stars)].map((_, i) => (
                                <i key={i} className="ri-star-fill text-yellow-500 mr-1"></i>
                              ))}
                              <span className="text-sm text-[rgb(var(--holo-text))] ml-1">{profile.rating}</span>
                            </>
                          ) : profile.rank ? (
                            <>
                              <span className={`text-[rgb(var(${colorPrimary}))] mr-2 font-medium`}>{profile.rank}</span>
                              <span className="text-sm text-[rgb(var(--holo-text))]">{profile.rating}</span>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[rgb(var(--holo-text))] text-sm mb-1">
                        <i className="ri-code-box-line mr-1"></i>
                        {profile.problemsSolved} problems
                      </span>
                      <span className="text-xs text-[rgba(var(--holo-text),0.7)]">{profile.progressPercentage}% complete</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className={`w-full h-2 bg-[rgba(${bgColorRGBA},0.1)] rounded-full overflow-hidden border border-[rgba(${bgColorRGBA},0.2)]`}>
                      <div 
                        className={`h-full bg-[rgb(var(${colorPrimary}))] rounded-full`} 
                        style={{ width: `${profile.progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Expanded content */}
                  {isExpanded && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 mb-4"
                    >
                      <p className="text-[rgb(var(--holo-text))] mb-4">{profile.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="text-[rgb(var(--holo-text))] font-semibold mb-2">Contest Highlight:</h4>
                        <div className={`bg-[rgba(${bgColorRGBA},0.1)] p-3 rounded-md border border-[rgba(${bgColorRGBA},0.2)]`}>
                          <div className="flex items-center">
                            <i className={`ri-trophy-fill text-[rgb(var(${colorPrimary}))] mr-2`}></i>
                            <span className="text-[rgb(var(--holo-text))]">{profile.contestHighlight}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-[rgb(var(--holo-text))] font-semibold mb-2">Badges:</h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.badges?.map((badge, i) => (
                            <span 
                              key={i} 
                              className={`px-3 py-1 rounded-full text-xs border border-[rgba(${bgColorRGBA},0.3)] bg-[rgba(${bgColorRGBA},0.1)] text-[rgb(var(${colorPrimary}))]`}
                            >
                              <i className="ri-medal-fill mr-1"></i>
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-[rgb(var(--holo-text))] font-semibold mb-2">Achievements:</h4>
                        <ul className="list-disc pl-5 text-[rgb(var(--holo-text))]">
                          {profile.achievements?.map((achievement, i) => (
                            <li key={i} className="mb-1">{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                  
                  <div className="flex justify-between mt-4">
                    <HoloButton 
                      text={isExpanded ? "Show Less" : "Show More"}
                      icon={isExpanded ? "arrow-up-s-line" : "arrow-down-s-line"}
                      size="sm"
                      color={colorVariant === 0 ? 'primary' : colorVariant === 1 ? 'secondary' : 'tertiary'}
                      onClick={() => toggleExpand(index)}
                    />
                    
                    <HoloButton 
                      text="View Profile" 
                      icon="external-link-line" 
                      size="sm"
                      color={colorVariant === 0 ? 'primary' : colorVariant === 1 ? 'secondary' : 'tertiary'}
                      onClick={() => window.open(profile.link, '_blank')}
                    />
                  </div>
                </HoloPanelCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CodingProfiles;
