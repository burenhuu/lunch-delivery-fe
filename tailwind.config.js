const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Rubik", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                "gradient-start": "rgba(255, 190, 120, 1)",
                "gradient-end": "rgba(255, 122, 31, 1)",
                main: "rgba(30, 35, 53, 1)",
                gray: "rgba(100, 115, 130, 1)",
            },
            fontSize: {
                sm: ["14px", "16px"],
                xs: ["12px", "14px"],
                smaller: ["10px", "12px"],
                base: ["16px", "19px"],
            },
            gap: {
                1.25: "5px",
                3.75: "15px",
            },
            padding: {
                1.25: "5px",
                3.75: "15px",
            },
            borderRadius: {
                "2.5xl": "20px",
                md: "10px",
            },
            boxShadow: {
                delivery: "5px 5px 10px 0px rgba(30, 35, 53, 0.05)",
            },
            spacing: {
                3.75: "15px",
            },
            zIndex: {
                max: "99999",
            },
        },
    },
    plugins: [
        require("tailwind-scrollbar-hide"),
        require("@tailwindcss/line-clamp"),
    ],
};
