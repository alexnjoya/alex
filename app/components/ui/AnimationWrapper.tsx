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
      return animationFn(direction, delay, duration);
    }
    
    // Default to fadeIn if animation not found
    return animations.fadeIn(direction, delay, duration);
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