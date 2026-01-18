import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * A reusable loading spinner component.
 * @param {object} props - Component props.
 * @param {('sm'|'md'|'lg'|'xl')} [props.size='md'] - The size of the spinner.
 * @param {string} [props.className] - Additional CSS classes.
 */
const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  return (
    <Loader2 className={`animate-spin ${sizeMap[size]} ${className}`} />
  );
};

export default LoadingSpinner;