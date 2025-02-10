/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  safeList: ["border-[#8C57FF]"],
  theme: {
  	screens: {
  		xs: '400px',
  		sm: '640px',
  		md: '768px',
  		lg: '1024px',
  		xl: '1280px',
  		'2xl': '1536px'
  	},
  	extend: {
  		colors: {
  			text: 'white',
  			light: {
  				bg: '#efefef',
  				dark: '#fff'
  			},
  			dark: {
  				bg: '#2a2a2a'
  			},
  			primary: {
  				color: '#ff5c5c',
  				hover: '#f53a3a'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		boxShadow: {
  			light: '0 0 2px rgba(0,0,0,0.5)',
  			dark: 'none'
  		},
  		typography: '({ theme }) => ({\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n        red: {\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n          css: {\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n            "--tw-prose-bullets": theme("colors.red[600]"),\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n            "--tw-prose-quotes": theme("colors.red[900]"),\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n            "--tw-prose-quote-borders": theme("colors.red[500]"),\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n            "--tw-prose-bold": theme("colors.pink[900]"),\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n            "--tw-prose-invert-quotes": theme("colors.red[100]"),\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n            "--tw-prose-invert-quote-borders": theme("colors.red[700]"),\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n            "--tw-prose-invert-bullets": theme("colors.red[600]"),\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n          },\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n        },\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n      })',
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".custom-padding": {
          "@apply px-6 lg:px-10": "",
        },
        ".custom-shadow": {
          "@apply shadow-light dark:shadow-none lg:shadow-none": "",
        },
        ".custom-width": {
          "@apply max-w-[1800px] mx-auto": "",
        },
        ".custom-h1-size": {
          "@apply text-2xl sm:text-3xl md:text-4xl lg:text-5xl": "",
        },
        ".custom-h2-size": {
          "@apply text-xl sm:text-2xl md:text-3xl lg:text-4xl": "",
        },
        ".custom-h3-size": {
          "@apply text-lg sm:text-xl md:text-2xl lg:text-3xl": "",
        },
        ".custom-h4-size": {
          "@apply text-base sm:text-lg md:text-xl lg:text-2xl": "",
        },
        ".custom-h5-size": {
          "@apply text-sm sm:text-base md:text-lg lg:text-xl": "",
        },
        ".custom-h6-size": {
          "@apply text-xs sm:text-sm md:text-base lg:text-lg": "",
        },
        ".custom-p-size": {
          "@apply xs:text-[15px] sm:text-[16px]": "",
        },
      });
    },
      require("tailwindcss-animate")
],
  darkMode: ["class"],
};
