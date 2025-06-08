'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  center = true,
  className = '',
}: SectionTitleProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`mb-16 ${center ? 'text-center' : ''} ${className}`}
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="heading-lg gradient-text inline-block mb-4"
      >
        {title}
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={inView ? { opacity: 1, width: '100px' } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`h-1 bg-gradient-to-r from-primary-500 to-secondary-500 ${center ? 'mx-auto' : ''} mb-8`}
      />
      
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}