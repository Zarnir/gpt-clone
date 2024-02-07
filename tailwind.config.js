import colors from 'tailwindcss/colors';

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      slate: colors.slate,
      purple: colors.violet,
      yellow: colors.amber,
      pink: colors.fuchsia,
      blue: colors.blue,
      red: colors.red,
      green: {
        50: '#f2ffee',
        100: '#deffd7',
        200: '#c0ffb2',
        300: '#8eff76',
        400: '#53f533',
        500: '#2cde09',
        600: '#20c500',
        700: '#1a9104',
        800: '#1a710a',
        900: '#155d0a',
        950: '#00522c',
      },
    },
    extend: {
      colors: { 
        primary: "var(--bg-[#00522c])",
        "primary-opacity": withOpacity("--bg-[#00522c]-opacity"),
        secondary: "var(--bg-white)",
        accent: withOpacity("--accent-color"),
        "accent-hover": withOpacity("--accent-color-hover"),
        "accent-faded": "var(--accent-color-faded)",
        muted: "var(--font-muted)",
      },
      textColor: {
        primary: "var(--font-[#00522c])",
        muted: "var(--font-muted)",
        placeholder: "var(--font-placeholder)",
        inverted: "var(--font-inverted)",
        accent: withOpacity("--accent-color"),
        "accent-hover": withOpacity("--accent-color-hover"),
      },
      backgroundColor: {
        primary: "var(--bg-[#00522c])",
        "primary-opacity": withOpacity("--bg-[#00522c]-opacity"),
        secondary: "var(--bg-white)",
        "secondary-opacity": withOpacity("--bg-secondary-opacity"),
        accent: withOpacity("--accent-color"),
        "accent-hover": withOpacity("--accent-color-hover"),
        "accent-faded": "var(--accent-color-faded)",
        transparent: "transparent",
      },
      ringColor: {
        accent: withOpacity("--accent-color"),
        transparent: "transparent",
      },
      gradientColorStops: {
        "accent-primary": "var(--accent-[#00522c])",
        "accent-secondary": "var(--accent-white)",
      },
      borderColor: {
        primary: "var(--border-[#00522c])",
        "primary-hover": "var(--border-[#00522c]-hover)",
        muted: "var(--border-muted)",
        accent: withOpacity("--accent-color"),
        "accent-faded": "var(--accent-color-faded)",
        transparent: "transparent",
      },
      borderWidth: {
        sm: "1px",
        md: "2px",
      },
      screens: {
        mobile: "320px",
        tablet: "960px",
        desktop: "1280px",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
