/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#245B43', // Dark Green
          deep: '#1B4633',
          light: '#2F6B4F',   
          lighter: '#3D7A59',
          hover: '#183D2D',   
          subtle: '#EAF3EE',  
        },
        cream: {
          DEFAULT: '#FFF9ED',
          soft: '#F8F1DF',
          warm: '#F5EBD4',
          card: '#FCFAF6',
        },
        beige: {
          DEFAULT: '#E9D8B7',
          border: '#E2D7C3',
          light: '#F4EFE6',
        },
        wood: {
          DEFAULT: '#B9824B',
          light: '#C99662',
          dark: '#8C5A2B',
        },
        accent: {
          DEFAULT: '#E59F3F', // Warm Gold/Amber
          light: '#F8C784',
          hover: '#C27E25',
          subtle: '#FFF5E6',
        },
        background: '#F8F4EC', // Cream/Off-white
        card: '#FCFAF6',
        text: {
          main: '#26382F',    // Chữ màu xanh đen đậm
          muted: '#66736B',   // Chữ phụ màu xanh xám
        }
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        handwriting: ['Itim', 'Caveat', 'cursive'],
        caveat: ['Dancing Script', 'Caveat', 'cursive'],
        script: ['Dancing Script', 'cursive'],
        quicksand: ['Quicksand', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'bento': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 10px 40px -10px rgba(0, 0, 0, 0.08)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.07)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 100%)',
      },
      keyframes: {
        shine: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        shine: 'shine 1.5s infinite',
      }
    },
  },
  plugins: [],
}
