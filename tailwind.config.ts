
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
				// Modern Gen-Z color palette
				border: 'hsl(214 32% 91%)',
				input: 'hsl(214 32% 91%)',
				ring: 'hsl(200 100% 50%)',
				background: '#FFFFFF',
				foreground: '#0F172A',
				
				// Primary brand colors - Navy + Cyan theme
				primary: {
					DEFAULT: '#0F172A', // Dark navy
					50: '#F8FAFC',
					100: '#F1F5F9',
					200: '#E2E8F0',
					300: '#CBD5E1',
					400: '#94A3B8',
					500: '#64748B',
					600: '#475569',
					700: '#334155',
					800: '#1E293B',
					900: '#0F172A',
					foreground: '#FFFFFF'
				},
				
				// Secondary accent - Cyan/Teal
				secondary: {
					DEFAULT: '#F8FAFC',
					50: '#ECFEFF',
					100: '#CFFAFE',
					200: '#A5F3FC',
					300: '#67E8F9',
					400: '#22D3EE',
					500: '#06B6D4',
					600: '#0891B2',
					700: '#0E7490',
					800: '#155E75',
					900: '#164E63',
					foreground: '#0F172A'
				},
				
				// Accent colors
				accent: {
					DEFAULT: '#06B6D4', // Cyan
					50: '#ECFEFF',
					100: '#CFFAFE',
					200: '#A5F3FC',
					300: '#67E8F9',
					400: '#22D3EE',
					500: '#06B6D4',
					600: '#0891B2',
					700: '#0E7490',
					800: '#155E75',
					900: '#164E63',
					foreground: '#FFFFFF'
				},
				
				// Success colors
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
				
				// Warning colors
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
				
				// Error colors
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
				
				// Neutral grays
				muted: {
					DEFAULT: '#F8FAFC',
					50: '#F8FAFC',
					100: '#F1F5F9',
					200: '#E2E8F0',
					300: '#CBD5E1',
					400: '#94A3B8',
					500: '#64748B',
					foreground: '#475569'
				},
				
				// Special colors for Gen-Z feel
				neon: {
					blue: '#00D4FF',
					purple: '#8B5CF6',
					pink: '#EC4899',
					green: '#10B981'
				},
				
				// Card and surface colors
				card: {
					DEFAULT: '#FFFFFF',
					foreground: '#0F172A'
				},
				
				popover: {
					DEFAULT: '#FFFFFF',
					foreground: '#0F172A'
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
				'5xl': ['3rem', { lineHeight: '1' }],
				'6xl': ['3.75rem', { lineHeight: '1' }],
				'7xl': ['4.5rem', { lineHeight: '1' }],
			},
			
			borderRadius: {
				'none': '0',
				'sm': '0.25rem',
				'DEFAULT': '0.5rem',
				'md': '0.75rem',
				'lg': '1rem',
				'xl': '1.5rem',
				'2xl': '2rem',
				'full': '9999px'
			},
			
			boxShadow: {
				'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
				'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
				'glow': '0 0 20px rgba(6, 182, 212, 0.3)',
				'neon': '0 0 30px rgba(0, 212, 255, 0.5)'
			},
			
			animation: {
				'fade-in': 'fadeIn 0.6s ease-in-out',
				'slide-up': 'slideUp 0.5s ease-out',
				'scale-in': 'scaleIn 0.3s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate'
			},
			
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				slideUp: {
					'0%': { transform: 'translateY(30px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				scaleIn: {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				glowPulse: {
					'0%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' },
					'100%': { boxShadow: '0 0 40px rgba(6, 182, 212, 0.6)' }
				}
			},
			
			backdropBlur: {
				'glass': '16px'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
