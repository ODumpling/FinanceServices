const color = require('tailwindcss/colors')

module.exports = {
    purge: [
        './Pages/**/*.cshtml',
        './Areas/**/*.cshtml',
        './Views/**/*.cshtml'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                cyan: color.cyan
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms'),],
}
