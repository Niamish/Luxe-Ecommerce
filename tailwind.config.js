/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This line scans your entire src folder
  ],
  theme: {
    extend: {
      // You can add your custom theme values here later if needed.
      // For example, your neumorphic shadows could become custom utilities:
      boxShadow: {
        'neu-light': '6px 6px 12px #c1c8d4, -6px -6px 12px #ffffff',
        'neu-light-inset': 'inset 6px 6px 12px #c1c8d4, inset -6px -6px 12px #ffffff',
        'neu-light-sm': '3px 3px 6px #c1c8d4, -3px -3px 6px #ffffff',
        'neu-light-lg': '9px 9px 18px #b8c0cd, -9px -9px 18px #ffffff',
        'neu-dark': '8px 8px 16px #141824, -8px -8px 16px #202638',
        'neu-dark-inset': 'inset 8px 8px 16px #141824, inset -8px -8px 16px #202638',
      },
      fontSize: {
        'xxs': ['0.625rem', { lineHeight: '0.875rem' }],
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.875rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
      },
      fontWeight: {
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      }
    },
  },
  plugins: [],
}