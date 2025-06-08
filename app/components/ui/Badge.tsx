'use client';

import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  className?: string;
}

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  rounded = false,
  className = '',
}: BadgeProps) {
  // Badge variants
  const variants = {
    primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400',
    secondary: 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400',
    success: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
    error: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  };

  // Badge sizes
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  // Badge shapes
  const shape = rounded ? 'rounded-full' : 'rounded-md';

  // Construct badge classes
  const badgeClasses = `
    inline-flex items-center font-medium
    ${variants[variant]}
    ${sizes[size]}
    ${shape}
    ${className}
  `;

  return <span className={badgeClasses}>{children}</span>;
}