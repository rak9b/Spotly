/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {}
  },
  plugins: [],
  safelist: [
    'bg-indigo-50', 'text-indigo-600', 'bg-indigo-200', 'text-indigo-700',
    'bg-teal-50', 'text-teal-600',
    'bg-rose-50', 'text-rose-600',
    // Safelist for 3D Bar Chart dynamic colors
    'from-indigo-400', 'to-indigo-600', 'bg-indigo-800', 'bg-indigo-300',
    'from-purple-400', 'to-purple-600', 'bg-purple-800', 'bg-purple-300',
    'from-pink-400', 'to-pink-600', 'bg-pink-800', 'bg-pink-300',
    'from-teal-400', 'to-teal-600', 'bg-teal-800', 'bg-teal-300',
    'from-blue-400', 'to-blue-600', 'bg-blue-800', 'bg-blue-300',
  ]
};
