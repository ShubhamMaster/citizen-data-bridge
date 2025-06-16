
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// Brand Colors from Logo
				brand: {
					navy: '#0B2952',      // Primary: Deep Navy Blue
					teal: '#2CA5A9',      // Secondary: Teal Aqua
					'navy-light': '#1E4A72',
					'navy-dark': '#051B36',
					'teal-light': '#5BC0C4',
					'teal-dark': '#1F7B7E',
				},
				
				// Base System Colors
				border: '#E5E7EB',
				input: '#E5E7EB',
				ring: '#0B2952',
				background: '#F9FAFB',
				foreground: '#1F2937',
				
				// Primary (Navy)
				primary: {
					DEFAULT: '#0B2952',
					50: '#EBF1F8',
					100: '#D7E3F1',
					200: '#AFC7E3',
					300: '#87ABD5',
					400: '#5F8FC7',
					500: '#3773B9',
					600: '#2A5A93',
					700: '#1E426E',
					800: '#0B2952',
					900: '#051B36',
					foreground: '#FFFFFF'
				},
				
				// Secondary (Teal)
				secondary: {
					DEFAULT: '#2CA5A9',
					50: '#E6F7F8',
					100: '#CCEFF0',
					200: '#99DFE1',
					300: '#66CFD2',
					400: '#33BFC3',
					500: '#2CA5A9',
					600: '#238487',
					700: '#1A6365',
					800: '#114243',
					900: '#082122',
					foreground: '#FFFFFF'
				},
				
				// Neutral Grays
				muted: {
					DEFAULT: '#F9FAFB',
					50: '#F9FAFB',
					100: '#F3F4F6',
					200: '#E5E7EB',
					300: '#D1D5DB',
					400: '#9CA3AF',
					500: '#6B7280',
					foreground: '#4B5563'
				},
				
				// Success, Warning, Error
				success: {
					DEFAULT: '#10B981',
					50: '#ECFDF5',
					100: '#D1FAE5',
					200: '#A7F3D0',
					300: '#6EE7B7',
					400: '#34D399',
					500: '#10B981',
					600: '#059669',
					700: '#047857',
					800: '#065F46',
					900: '#064E3B',
					foreground: '#FFFFFF'
				},
				
				warning: {
					DEFAULT: '#F59E0B',
					50: '#FFFBEB',
					100: '#FEF3C7',
					200: '#FDE68A',
					300: '#FCD34D',
					400: '#FBBF24',
					500: '#F59E0B',
					600: '#D97706',
					700: '#B45309',
					800: '#92400E',
					900: '#78350F',
					foreground: '#FFFFFF'
				},
				
				destructive: {
					DEFAULT: '#EF4444',
					50: '#FEF2F2',
					100: '#FEE2E2',
					200: '#FECACA',
					300: '#FCA5A5',
					400: '#F87171',
					500: '#EF4444',
					600: '#DC2626',
					700: '#B91C1C',
					800: '#991B1B',
					900: '#7F1D1D',
					foreground: '#FFFFFF'
				},
				
				// Surface Colors
				card: {
					DEFAULT: '#FFFFFF',
					foreground: '#1F2937'
				},
				
				popover: {
					DEFAULT: '#FFFFFF',
					foreground: '#1F2937'
				},
				
				accent: {
					DEFAULT: '#F3F4F6',
					foreground: '#1F2937'
				}
			},
			
			fontFamily: {
				sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
				heading: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
				body: ['Inter', 'system-ui', 'sans-serif']
			},
			
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1rem' }],
				'sm': ['0.875rem', { lineHeight: '1.25rem' }],
				'base': ['1rem', { lineHeight: '1.5rem' }],
				'lg': ['1.125rem', { lineHeight: '1.75rem' }],
				'xl': ['1.25rem', { lineHeight: '1.75rem' }],
				'2xl': ['1.5rem', { lineHeight: '2rem' }],
				'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
				'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
				'5xl': ['3rem', { lineHeight: '1.1' }],
				'6xl': ['3.75rem', { lineHeight: '1.1' }],
				'7xl': ['4.5rem', { lineHeight: '1' }],
			},
			
			borderRadius: {
				'none': '0',
				'sm': '0.25rem',
				'DEFAULT': '0.5rem',
				'md': '0.75rem',
				'lg': '1rem',
				'xl': '1.25rem',
				'2xl': '1.5rem',
				'3xl': '2rem',
				'full': '9999px'
			},
			
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem'
			},
			
			boxShadow: {
				'clean': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
				'clean-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'clean-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'clean-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
				'focus': '0 0 0 3px rgba(11, 41, 82, 0.1)',
				'focus-teal': '0 0 0 3px rgba(44, 165, 169, 0.1)'
			},
			
			animation: {
				'fade-in': 'fadeIn 0.6s ease-out',
				'slide-up': 'slideUp 0.4s ease-out',
				'slide-down': 'slideDown 0.4s ease-out',
				'scale-in': 'scaleIn 0.3s ease-out',
				'bounce-gentle': 'bounceGentle 2s infinite',
				'float': 'float 3s ease-in-out infinite'
			},
			
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				slideUp: {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				slideDown: {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				scaleIn: {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				bounceGentle: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-8px)' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				}
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
