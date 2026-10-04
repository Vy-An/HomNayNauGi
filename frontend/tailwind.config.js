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
          DEFAULT: '#123C28', // Deep Forest Green (Từ ảnh thiết kế)
          light: '#2E6649',   
          hover: '#0C2D1C',   
          subtle: '#E8F1EC',  
        },
        accent: {
          DEFAULT: '#E59F3F', // Warm Gold/Amber (Màu vàng nhấn)
          light: '#F8C784',
          hover: '#C27E25',
          subtle: '#FFF5E6',
        },
        background: '#F6F3EC', // Cream/Off-white (Nền ấm)
        card: '#FCFBF7',
        text: {
          main: '#123C28',    // Chữ màu xanh đen
          muted: '#526B5E',   // Chữ phụ màu xanh xám
        }
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
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
