/**
 * Format date string to readable format
 */
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };
  
  /**
   * Truncate text to a specified length
   */
  export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };
  
  /**
   * Validate email address format
   */
  export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  /**
   * Convert string to URL-friendly slug
   */
  export const createSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove non-word characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
      .trim();
  };
  
  /**
   * Get years of experience from a given start date
   */
  export const getYearsOfExperience = (startDate: string): number => {
    const start = new Date(startDate);
    const current = new Date();
    const diffTime = Math.abs(current.getTime() - start.getTime());
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365);
    return Math.floor(diffYears);
  };
  
  /**
   * Group array items by a specific property
   */
  export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
    return array.reduce((result, item) => {
      const groupKey = String(item[key]);
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    }, {} as Record<string, T[]>);
  };
  
  /**
   * Generate random ID
   */
  export const generateId = (): string => {
    return Math.random().toString(36).substring(2, 9);
  };
  
  /**
   * Get file extension from filename
   */
  export const getFileExtension = (filename: string): string => {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
  };
  
  /**
   * Check if device is mobile
   */
  export const isMobile = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768;
  };
  
  /**
   * Debounce function to limit execution rate
   */
  export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout | null = null;
    
    return function(...args: Parameters<T>) {
      const later = () => {
        timeout = null;
        func(...args);
      };
      
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };