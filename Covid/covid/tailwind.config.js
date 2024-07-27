/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@shadcn/ui/dist/**/*.js", // Assurez-vous d'inclure les fichiers de la bibliothèque
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
