/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**.ts'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
