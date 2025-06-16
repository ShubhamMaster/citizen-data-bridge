
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
				// Gen Z-inspired color palette
				border: 'hsl(220 13% 91%)',
				input: 'hsl(220 13% 91%)',
				ring: 'hsl(262 83% 58%)',
				background: '#FEFEFE',
				foreground: '#1A1A1A',
				
				// Primary brand colors - clean and modern
				primary: {
					DEFAULT: '#6366F1', // Modern indigo
					50: '#F0F0FF',
					100: '#E5E5FF',
					200: '#D1D1FF',
					300: '#B8B8FF',
					400: '#9B9BFF',
					500: '#6366F1',
					600: '#4F46E5',
					700: '#4338CA',
					800: '#3730A3',
					900: '#312E81',
					foreground: '#FFFFFF'
				},
				
				// Secondary colors - soft and subtle
				secondary: {
					DEFAULT: '#F8FAFC',
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
					foreground: '#0F172A'
				},
				
				// Accent colors - vibrant but soft
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
				
				// Success colors - mint green
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
				
				// Warning colors - soft peach
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
				
				// Error colors - coral
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
				
				// Neutral grays - clean and modern
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
				
				// Special Gen Z colors
				purple: {
					DEFAULT: '#8B5CF6',
					50: '#F5F3FF',
					100: '#EDE9FE',
					200: '#DDD6FE',
					300: '#C4B5FD',
					400: '#A78BFA',
					500: '#8B5CF6',
					600: '#7C3AED',
					700: '#6D28D9',
					800: '#5B21B6',
					900: '#4C1D95'
				},
				
				mint: {
					DEFAULT: '#14B8A6',
					50: '#F0FDFA',
					100: '#CCFBF1',
					200: '#99F6E4',
					300: '#5EEAD4',
					400: '#2DD4BF',
					500: '#14B8A6',
					600: '#0D9488',
					700: '#0F766E',
					800: '#115E59',
					900: '#134E4A'
				},
				
				coral: {
					DEFAULT: '#FF6B6B',
					50: '#FFF5F5',
					100: '#FED7D7',
					200: '#FEB2B2',
					300: '#FC8181',
					400: '#F56565',
					500: '#FF6B6B',
					600: '#E53E3E',
					700: '#C53030',
					800: '#9B2C2C',
					900: '#742A2A'
				},
				
				lavender: {
					DEFAULT: '#A855F7',
					50: '#FAF5FF',
					100: '#F3E8FF',
					200: '#E9D5FF',
					300: '#D8B4FE',
					400: '#C084FC',
					500: '#A855F7',
					600: '#9333EA',
					700: '#7E22CE',
					800: '#6B21A8',
					900: '#581C87'
				},
				
				// Legacy Civora colors for compatibility
				civora: {
					navy: '#334155', // Softer navy
					teal: '#06B6D4', // Modern teal
					white: '#FFFFFF'
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
				sans: ['Inter', 'Poppins', 'Space Grotesk', 'system-ui', 'sans-serif'],
				heading: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
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
				'8xl': ['6rem', { lineHeight: '1' }],
				'9xl': ['8rem', { lineHeight: '1' }],
			},
			
			borderRadius: {
				'none': '0',
				'sm': '0.25rem',
				'DEFAULT': '0.5rem',
				'md': '0.75rem',
				'lg': '1rem',
				'xl': '1.5rem',
				'2xl': '2rem',
				'3xl': '3rem',
				'full': '9999px'
			},
			
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem'
			},
			
			boxShadow: {
				'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
				'soft-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
				'glow': '0 0 20px rgba(99, 102, 241, 0.15)',
				'glow-lg': '0 0 30px rgba(99, 102, 241, 0.2)'
			},
			
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.3s ease-out',
				'slide-down': 'slideDown 0.3s ease-out',
				'scale-in': 'scaleIn 0.2s ease-out',
				'bounce-gentle': 'bounceGentle 2s infinite',
				'float': 'float 3s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite alternate'
			},
			
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				slideUp: {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				slideDown: {
					'0%': { transform: 'translateY(-10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				scaleIn: {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				bounceGentle: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				glow: {
					'0%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.1)' },
					'100%': { boxShadow: '0 0 30px rgba(99, 102, 241, 0.2)' }
				}
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
