'use client';

import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as animations from '../../lib/animations';

interface AnimationWrapperProps {
  children: ReactNode;
  animation?: keyof typeof animations;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

export default function AnimationWrapper({
  children,
  animation = 'fadeIn',
  direction = 'none',
  delay = 0,
  duration = 0.5,
  className = '',
  once = true,
  threshold = 0.1,
}: AnimationWrapperProps) {
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold,
  });

  // Get animation variant from animations library
  const getAnimationVariant = (): Variants => {
    const animationFn = animations[animation];
    
    if (typeof animationFn === 'function') {
      // Check if the function accepts parameters
      try {
        // Try calling with parameters first
        return animationFn(direction, delay, duration);
      } catch {
        // If it fails, try calling without parameters
        try {
          return animationFn(delay, duration);
        } catch {
          // If it still fails, call with no parameters
          return animationFn();
        }
      }
    }
    
    // Default fallback animation
    return {
      hidden: { 
        opacity: 0,
        y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
        x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0
      },
      visible: { 
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          duration,
          delay,
          ease: "easeOut"
        }
      }
    };
  };

  const variant = getAnimationVariant();

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={variant}
      >
        {children}
      </motion.div>
    </div>
  );
}