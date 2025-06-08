'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Skill } from '@/types';

interface SkillCardProps {
  skill: Skill;
  index: number;
  categoryIndex: number;
}

export default function SkillCard({ skill, index, categoryIndex }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Dynamic gradient background based on skill color
  const getGradientClass = () => {
    if (skill.color.includes('yellow')) return 'from-yellow-500/10 to-yellow-500/5';
    if (skill.color.includes('blue')) return 'from-blue-500/10 to-blue-500/5';
    if (skill.color.includes('green')) return 'from-green-500/10 to-green-500/5';
    if (skill.color.includes('gray')) return 'from-gray-500/10 to-gray-500/5';
    if (skill.color.includes('sky')) return 'from-sky-500/10 to-sky-500/5';
    if (skill.color.includes('purple')) return 'from-purple-500/10 to-purple-500/5';
    return 'from-primary-500/10 to-primary-500/5';
  };

  // Get accent color for highlight elements
  const getAccentColor = () => {
    if (skill.color.includes('yellow')) return 'bg-yellow-500';
    if (skill.color.includes('blue')) return 'bg-blue-500';
    if (skill.color.includes('green')) return 'bg-green-500';
    if (skill.color.includes('gray')) return 'bg-gray-500';
    if (skill.color.includes('sky')) return 'bg-sky-500';
    if (skill.color.includes('purple')) return 'bg-purple-500';
    return 'bg-primary-500';
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: (categoryIndex * 0.1) + (index * 0.05),
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Level indicator animation variants
  const levelVariants = {
    hidden: { width: 0 },
    visible: (i: number) => ({
      width: i < skill.level ? '100%' : '0%',
      transition: {
        delay: (categoryIndex * 0.1) + (index * 0.05) + (i * 0.1) + 0.3,
        duration: 0.4,
        ease: 'easeOut'
      }
    })
  };

  // Icon animation
  const iconVariants = {
    hidden: { scale: 0, rotate: -30 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: (categoryIndex * 0.1) + (index * 0.05) + 0.2,
      }
    },
    hover: {
      y: [0, -10, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        relative overflow-hidden
        bg-white dark:bg-gray-800
        rounded-xl p-6
        flex flex-col items-center justify-center
        shadow-lg hover:shadow-2xl
        transition-all duration-300
        backdrop-blur-sm
        bg-gradient-to-br ${getGradientClass()}
        border border-gray-100 dark:border-gray-700
      `}
    >
      {/* Accent border line */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${skill.color.replace('border-', 'bg-')}`}></div>
      
      {/* Background pattern (only visible on hover) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
        <div className="absolute inset-0 bg-pattern-grid opacity-5"></div>
      </div>

      {/* Icon container with floating animation */}
      <motion.div
        variants={iconVariants}
        className={`
          relative mb-4
          w-16 h-16
          flex items-center justify-center
          rounded-full
          bg-white dark:bg-gray-700
          shadow-md
          z-10
        `}
      >
        {/* Glowing effect on hover */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.2 }}
            className={`absolute inset-0 rounded-full ${skill.color.replace('border-', 'bg-')} opacity-20 blur-md`}
          />
        )}
        
        {/* Icon */}
        <div className="transform transition-transform duration-300">
          {skill.icon}
        </div>
      </motion.div>

      {/* Skill name */}
      <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 mb-3 text-center">
        {skill.name}
      </h3>

      {/* Custom skill level indicator */}
      <div className="w-full max-w-[120px] space-y-1.5 mt-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              custom={i}
              variants={levelVariants}
              initial="hidden"
              animate="visible"
              className={`h-full ${getAccentColor()} rounded-full`}
            />
          </div>
        ))}
      </div>

      {/* Experience level label */}
      <div className="mt-3 text-xs font-medium text-gray-500 dark:text-gray-400">
        {skill.level === 5 ? "Expert" : 
         skill.level === 4 ? "Advanced" : 
         skill.level === 3 ? "Intermediate" : 
         skill.level === 2 ? "Basic" : "Beginner"}
      </div>
    </motion.div>
  );
}