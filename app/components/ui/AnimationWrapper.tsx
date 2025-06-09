'use client';

import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimationWrapperProps {
  children: ReactNode;
  animation?: 'fadeIn' | 'slideIn' | 'scaleIn' | 'staggerContainer';
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

// Define animation functions directly in the component
const animationVariants = {
  fadeIn: (
    direction: 'up' | 'down' | 'left' | 'right' | 'none' = 'none',
    delay: number = 0,
    duration: number = 0.5
  ): Variants => ({
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
      x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  }),

  slideIn: (
    direction: 'up' | 'down' | 'left' | 'right' | 'none' = 'left',
    delay: number = 0,
    duration: number = 0.5
  ): Variants => ({
    hidden: {
      x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      opacity: 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  }),

  scaleIn: (
    direction: 'up' | 'down' | 'left' | 'right' | 'none' = 'none',
    delay: number = 0,
    duration: number = 0.5
  ): Variants => ({
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  }),

  staggerContainer: (
    direction: 'up' | 'down' | 'left' | 'right' | 'none' = 'none',
    delay: number = 0,
    duration: number = 0.5
  ): Variants => ({
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  }),
};

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

  // Get animation variant
  const getAnimationVariant = (): Variants => {
    const animationFn = animationVariants[animation];
    return animationFn(direction, delay, duration);
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
