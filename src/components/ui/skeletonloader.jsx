import React from 'react';
import { useTheme } from '../../hooks/useTheme';

/**
 * A simple, theme-aware skeleton loader for placeholder content.
 * @param {object} props - Component props.
 * @param {string} [props.className] - Additional CSS classes to control size, shape, etc.
 */
const SkeletonLoader = ({ className = '' }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`animate-pulse rounded-xl relative overflow-hidden ${className}`}
      style={{
        backgroundColor: theme === 'dark' ? '#2a3041' : '#e2e8f0',
      }}
    >
      <div 
        className="absolute inset-0 -translate-x-full animate-shimmer"
        style={{
          background: `linear-gradient(90deg, transparent, ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)'}, transparent)`,
          animation: 'shimmer 2s infinite'
        }}
      />
    </div>
  );
};

export default SkeletonLoader;