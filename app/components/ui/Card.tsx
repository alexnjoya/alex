'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  as?: 'div' | 'article' | 'section';
}

export default function Card({
  children,
  className = '',
  hover = true,
  onClick,
  as: Component = 'div',
}: CardProps) {
  const baseClasses = `
    bg-white dark:bg-gray-800
    rounded-xl shadow-md overflow-hidden
    transition-all duration-300
  `;

  const hoverClasses = hover
    ? 'hover:shadow-lg transform hover:-translate-y-1'
    : '';

  const clickClasses = onClick
    ? 'cursor-pointer'
    : '';

  const cardClasses = `${baseClasses} ${hoverClasses} ${clickClasses} ${className}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className={cardClasses}
      as={Component}
    >
      {children}
    </motion.div>
  );
}