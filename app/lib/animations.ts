import { Variants } from 'framer-motion';

// Fade in animation
export const fadeIn = (
  direction: 'up' | 'down' | 'left' | 'right' | 'none' = 'none',
  delay: number = 0,
  duration: number = 0.5
): Variants => {
  return {
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
        delay,
        duration,
        ease: 'easeInOut',
      },
    },
  };
};

// Stagger children animation
export const staggerContainer = (
  staggerChildren: number = 0.1,
  delayChildren: number = 0
): Variants => {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};

// Scale animation
export const scaleIn = (delay: number = 0, duration: number = 0.5): Variants => {
  return {
    hidden: {
      scale: 0.8,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay,
        duration,
        ease: 'easeInOut',
      },
    },
  };
};

// Slide in animation
export const slideIn = (
  direction: 'up' | 'down' | 'left' | 'right',
  type: 'tween' | 'spring' = 'tween',
  delay: number = 0,
  duration: number = 0.5
): Variants => {
  return {
    hidden: {
      x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
      y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
    },
    visible: {
      x: 0,
      y: 0,
      transition: {
        type,
        delay,
        duration,
        ease: 'easeOut',
      },
    },
  };
};

// Zoom in animation
export const zoomIn = (delay: number = 0, duration: number = 0.5): Variants => {
  return {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay,
        duration,
        ease: 'easeOut',
      },
    },
  };
};

// Pop up animation
export const popUp = (delay: number = 0, duration: number = 0.5): Variants => {
  return {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: [0, 1.1, 1],
      opacity: 1,
      transition: {
        delay,
        duration,
        ease: 'easeOut',
      },
    },
  };
};

// Rotate animation
export const rotate = (delay: number = 0, duration: number = 0.5): Variants => {
  return {
    hidden: {
      rotate: -180,
      opacity: 0,
    },
    visible: {
      rotate: 0,
      opacity: 1,
      transition: {
        delay,
        duration,
        ease: 'easeOut',
      },
    },
  };
};

// Typing animation (for text)
export const typing = (delay: number = 0): Variants => {
  return {
    hidden: {
      width: '0%',
      borderRight: '0.15em solid',
    },
    visible: {
      width: '100%',
      borderRight: '0.15em solid',
      transition: {
        delay,
        type: 'spring',
        stiffness: 50,
        damping: 10,
      },
    },
  };
};