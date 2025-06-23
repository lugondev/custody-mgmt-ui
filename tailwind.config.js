/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
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
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				'50': 'rgb(var(--primary-50))',
  				'100': 'rgb(var(--primary-100))',
  				'200': 'rgb(var(--primary-200))',
  				'300': 'rgb(var(--primary-300))',
  				'400': 'rgb(var(--primary-400))',
  				'500': 'rgb(var(--primary-500))',
  				'600': 'rgb(var(--primary-600))',
  				'700': 'rgb(var(--primary-700))',
  				'800': 'rgb(var(--primary-800))',
  				'900': 'rgb(var(--primary-900))',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'50': 'rgb(var(--secondary-50))',
  				'100': 'rgb(var(--secondary-100))',
  				'200': 'rgb(var(--secondary-200))',
  				'300': 'rgb(var(--secondary-300))',
  				'400': 'rgb(var(--secondary-400))',
  				'500': 'rgb(var(--secondary-500))',
  				'600': 'rgb(var(--secondary-600))',
  				'700': 'rgb(var(--secondary-700))',
  				'800': 'rgb(var(--secondary-800))',
  				'900': 'rgb(var(--secondary-900))',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			neutral: {
  				'50': 'rgb(var(--neutral-50))',
  				'100': 'rgb(var(--neutral-100))',
  				'200': 'rgb(var(--neutral-200))',
  				'300': 'rgb(var(--neutral-300))',
  				'400': 'rgb(var(--neutral-400))',
  				'500': 'rgb(var(--neutral-500))',
  				'600': 'rgb(var(--neutral-600))',
  				'700': 'rgb(var(--neutral-700))',
  				'800': 'rgb(var(--neutral-800))',
  				'900': 'rgb(var(--neutral-900))'
  			},
  			success: 'rgb(var(--success))',
  			warning: 'rgb(var(--warning))',
  			error: 'rgb(var(--error))',
  			info: 'rgb(var(--info))',
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
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
  			},
  			'fade-in': {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			'fade-out': {
  				'0%': {
  					opacity: '1'
  				},
  				'100%': {
  					opacity: '0'
  				}
  			},
  			'slide-in-from-top': {
  				'0%': {
  					transform: 'translateY(-100%)'
  				},
  				'100%': {
  					transform: 'translateY(0)'
  				}
  			},
  			'slide-in-from-bottom': {
  				'0%': {
  					transform: 'translateY(100%)'
  				},
  				'100%': {
  					transform: 'translateY(0)'
  				}
  			},
  			'slide-in-from-left': {
  				'0%': {
  					transform: 'translateX(-100%)'
  				},
  				'100%': {
  					transform: 'translateX(0)'
  				}
  			},
  			'slide-in-from-right': {
  				'0%': {
  					transform: 'translateX(100%)'
  				},
  				'100%': {
  					transform: 'translateX(0)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in': 'fade-in 0.2s ease-out',
  			'fade-out': 'fade-out 0.2s ease-out',
  			'slide-in-from-top': 'slide-in-from-top 0.3s ease-out',
  			'slide-in-from-bottom': 'slide-in-from-bottom 0.3s ease-out',
  			'slide-in-from-left': 'slide-in-from-left 0.3s ease-out',
  			'slide-in-from-right': 'slide-in-from-right 0.3s ease-out'
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			],
  			mono: [
  				'JetBrains Mono',
  				'Consolas',
  				'monospace'
  			]
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem'
  		},
  		maxWidth: {
  			'8xl': '88rem',
  			'9xl': '96rem'
  		}
  	}
  },
  plugins: [require('tailwindcss-animate')],
}