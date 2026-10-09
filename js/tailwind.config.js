tailwind.config = {
  theme: {
    extend: {
      colors: {
        chalk: '#FCFBF7',
        alabaster: '#F4F1E9',
        parchment: '#E9E4D8',
        linen: '#D9D2C2',
        ink: '#1F1C18',
        graphite: '#45403A',
        stone: '#6A6358',
        terracotta: { DEFAULT: '#9C4221', deep: '#7C3317' },
        racing: { DEFAULT: '#24453A', deep: '#1A342B' },
        cobalt: { DEFAULT: '#2C4770', deep: '#213658' },
        oxblood: '#7B2D26',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(31, 28, 24, 0.04), 0 6px 16px -10px rgba(31, 28, 24, 0.10)',
        lift: '0 2px 4px rgba(31, 28, 24, 0.05), 0 14px 28px -14px rgba(31, 28, 24, 0.14)',
        bar: '0 1px 0 rgba(31, 28, 24, 0.07)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
};
