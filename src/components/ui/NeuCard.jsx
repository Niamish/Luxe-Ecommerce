import React from 'react';
import { useTheme } from '../../hooks/useTheme';

/**
 * A neumorphic-styled card container that is theme-aware.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The content inside the card.
 * @param {boolean} [props.inset=false] - If true, applies an inset shadow.
 * @param {boolean} [props.hover=true] - If true, enables hover effects.
 * @param {string} [props.className] - Additional CSS classes.
 */
const NeuCard = ({
  children,
  className = '',
  inset = false,
  hover = true,
  ...props
}) => {
  const { t, theme } = useTheme();

  return (
    <div
      className={`rounded-2xl transition-all duration-300 ${className}`}
      style={{
        backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : t.surface,
        boxShadow: inset ? t.shadowIn : t.shadowOut,
        backdropFilter: theme === 'light' ? 'blur(12px) saturate(150%)' : 'none',
        border: theme === 'light' ? '1px solid rgba(229, 231, 235, 0.6)' : 'none',
        background: theme === 'light' && !inset 
          ? 'linear-gradient(145deg, rgba(255,255,255,0.85) 0%, rgba(249,250,251,0.80) 100%)' 
          : undefined,
      }}
      onMouseEnter={(e) => {
        if (hover && !inset) {
          e.currentTarget.style.boxShadow = t.shadowOutHover;
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (hover && !inset) {
          e.currentTarget.style.boxShadow = t.shadowOut;
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default NeuCard;