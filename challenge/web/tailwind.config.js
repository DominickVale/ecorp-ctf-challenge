/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: ["class"],
    theme: {
        // golden ratio
        fontSize: {
            "xs": ".7rem", // 0.618rem would be too small (9px)
            "sm": "1rem",
            "base": "1.618rem",
            "lg": "2.618rem",
            "xl": "4.236rem",
            "2xl": "6.854rem",
            "3xl": "11.09rem",
        },
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                background: {
                    light: "#F1F1F1",
                    dark: "#181818"
                },
                foreground: "hsl(var(--foreground))",
            },
            gridTemplateColumns: {
                // Simple 16 column grid
                'golden': '80px repeat(13, 1fr) 80px',
                'golden-inner': 'repeat(13, 1fr)',
            },
            gridTemplateRows: {
                'golden': '57px 1fr'
            },
            gridColumnEnd: {
                '13': '13',
                '14': '14',
                '15': '15',
            },
            borderWidth: {
                '1': '1px',
            }
        },
    },
    plugins: [],
};