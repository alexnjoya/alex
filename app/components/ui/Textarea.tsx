'use client';

import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  helperText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, fullWidth = false, helperText, className = '', ...props }, ref) => {
    const textareaWrapperClasses = `
      relative
      ${fullWidth ? 'w-full' : ''}
    `;

    const textareaClasses = `
      w-full px-4 py-2
      border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
      rounded-md
      focus:outline-none focus:ring-2 
      ${error ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-primary-500 focus:border-primary-500'}
      bg-white dark:bg-gray-700
      text-gray-900 dark:text-gray-100
      transition-colors
      ${className}
    `;

    return (
      <div className={textareaWrapperClasses}>
        {label && (
          <label 
            htmlFor={props.id} 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          className={textareaClasses}
          {...props}
        />

        {error && (
          <p className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;