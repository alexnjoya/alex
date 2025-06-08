'use client';

import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
  helperText?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, icon, fullWidth = false, helperText, className = '', ...props }, ref) => {
    const inputWrapperClasses = `
      relative
      ${fullWidth ? 'w-full' : ''}
    `;

    const inputClasses = `
      w-full px-4 py-2
      border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
      rounded-md
      focus:outline-none focus:ring-2 
      ${error ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-primary-500 focus:border-primary-500'}
      bg-white dark:bg-gray-700
      text-gray-900 dark:text-gray-100
      transition-colors
      ${icon ? 'pl-10' : ''}
      ${className}
    `;

    return (
      <div className={inputWrapperClasses}>
        {label && (
          <label 
            htmlFor={props.id} 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            className={inputClasses}
            {...props}
          />
        </div>

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

TextInput.displayName = 'TextInput';

export default TextInput;