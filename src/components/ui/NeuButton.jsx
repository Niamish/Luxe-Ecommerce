import React from 'react';
import { Loader2 } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

/**
 * A neumorphic-styled button component that is theme-aware.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The content inside the button.
 * @param {function} props.onClick - The function to call on click.
 * @param {('default'|'primary'|'ghost'|'danger')} [props.variant='default'] - The button style variant.
 * @param {('sm'|'md'|'lg')} [props.size='md'] - The size of the button.
 * @param {boolean} [props.loading=false] - If true, shows a loading spinner.
 * @param {boolean} [props.disabled=false] - If true, disables the button.
 * @param {string} [props.className] - Additional CSS classes.
 */
const NeuButton = ({
  children,
  onClick,
  variant = "default",
  className = "",
  size = "md",
  loading = false,
  disabled = false,
  ...props
}) => {
  const { theme, t } = useTheme();

  const variants = {
    primary: theme === 'light' 
      ? 'bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white hover:shadow-2xl font-medium' 
      : `bg-gradient-to-r ${t.accentGradient} text-white hover:opacity-90`,
    default: theme === 'dark' ? 'bg-[#212737]' : 'bg-white/95 backdrop-blur-xl hover:bg-white',
    ghost: theme === 'light' ? 'bg-white/70 backdrop-blur-xl hover:bg-white/90' : '',
    danger: theme === 'light'
      ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white hover:shadow-2xl font-medium'
      : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:opacity-90',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`relative rounded-xl font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${variants[variant]} ${sizes[size]} ${className}`}
      style={{
        boxShadow: variant === 'primary' || variant === 'danger' 
          ? theme === 'light' ? '0 4px 20px -4px rgba(80, 70, 229, 0.3)' : '0 4px 15px rgba(124, 58, 237, 0.3)'
          : t.shadowOut,
        backgroundColor: variant === 'default' ? (theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : t.surface) : undefined,
        color: variant === 'default' ? t.text : (variant === 'primary' || variant === 'danger') ? '#ffffff' : undefined,
        border: theme === 'light' && (variant === 'default' || variant === 'ghost') ? '1px solid rgba(229, 231, 235, 0.8)' : 'none',
        textShadow: (variant === 'primary' || variant === 'danger') && theme === 'light' ? '0 1px 2px rgba(0, 0, 0, 0.2)' : 'none',
      }}
      onMouseEnter={(e) => {
        if (variant === 'default' && !disabled && !loading) {
          e.currentTarget.style.boxShadow = t.shadowOutHover;
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'default' && !disabled && !loading) {
          e.currentTarget.style.boxShadow = t.shadowOut;
        }
      }}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default NeuButton;