/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base:        '#EEE5DB',
        main:        '#553527',
        muted:       '#7A6256',
        accent:      '#3B6544',
        forest:      '#4A8A57',
        testimonial: '#503629',
      },
      fontFamily: {
        display: ['Parkinsans', 'sans-serif'],
        body:    ['Instrument Sans', 'sans-serif'],
      },
      boxShadow: {
        soft:  '0 12px 40px rgba(85, 53, 39, 0.05)',
        hover: '0 20px 50px rgba(85, 53, 39, 0.12)',
        glow:  '0 0 15px rgba(74, 138, 87, 0.5)',
      },
    },
  },
  plugins: [],
};
