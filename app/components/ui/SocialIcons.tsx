'use client';

import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface SocialIconsProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'default' | 'circle';
  showLabels?: boolean;
}

export default function SocialIcons({
  size = 'md',
  className = '',
  variant = 'default',
  showLabels = false,
}: SocialIconsProps) {
  // Icon sizes
  const sizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  // Container styles
  const containerClasses = `
    flex items-center space-x-4
    ${className}
  `;

  // Icon wrapper styles
  const getIconWrapperClasses = (colorClass: string) => {
    if (variant === 'circle') {
      return `
        w-10 h-10 flex items-center justify-center
        rounded-full bg-gray-100 dark:bg-gray-800
        hover:${colorClass} transition-colors duration-300
      `;
    }
    
    return `text-gray-600 hover:${colorClass} dark:text-gray-400 dark:hover:text-white transition-colors duration-300`;
  };

  const icons = [
    {
      icon: <FaGithub className={sizes[size]} />,
      href: 'https://github.com/alexnjoya',
      label: 'GitHub',
      ariaLabel: 'GitHub Profile',
      colorClass: 'text-gray-900',
    },
    {
      icon: <FaLinkedin className={sizes[size]} />,
      href: 'https://linkedin.com/in/alexnjoya',
      label: 'LinkedIn',
      ariaLabel: 'LinkedIn Profile',
      colorClass: 'text-blue-600',
    },
    {
      icon: <FaEnvelope className={sizes[size]} />,
      href: 'mailto:njoyaalexander71@gmail.com',
      label: 'Email',
      ariaLabel: 'Email Address',
      colorClass: 'text-red-500',
    },
    {
      icon: <FaPhoneAlt className={sizes[size]} />,
      href: 'tel:+233240027151',
      label: 'Phone',
      ariaLabel: 'Phone Number',
      colorClass: 'text-green-500',
    },
  ];

  return (
    <div className={containerClasses}>
      {icons.map((item, index) => (
        <motion.a
          key={item.label}
          href={item.href}
          target={item.href.startsWith('http') ? '_blank' : undefined}
          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          aria-label={item.ariaLabel}
          className={getIconWrapperClasses(item.colorClass)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          {item.icon}
          {showLabels && (
            <span className="ml-2 text-sm">{item.label}</span>
          )}
        </motion.a>
      ))}
    </div>
  );
}