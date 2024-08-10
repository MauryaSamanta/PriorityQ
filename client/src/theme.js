// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#EDEDED",
    100: "#D1D1D1",
    200: "#B5B5B5",
    300: "#999999",
    400: "#7D7D7D",
    500: "#616161",
    600: "#454545",
    700: "#292929",
    800: "#1D1D1D",
    900: "#121212", // Almost black
    1000: "#0A0A0A",
    1010: "#000000",
  },
  primary: {
    50: "#F3F0FF",
    100: "#E0DCFF",
    200: "#C7BCFF",
    300: "#AE9CFF",
    400: "#8E75FF",
    500: "#635acc", // Central vibrant color
    600: "#4D4599",
    700: "#382F66",
    800: "#211933",
    900: "#110C1A",
  },
  secondary: {
    50: "#E8F4FF",
    100: "#CCE7FF",
    200: "#99CFFF",
    300: "#66B8FF",
    400: "#3390FF",
    500: "#ffffff", // Bright blue for contrast
    600: "#0051CC",
    700: "#003899",
    800: "#002066",
    900: "#001033",
  },
  accent: {
    50: "#FFF1E6",
    100: "#FFD7B8",
    200: "#FFB089",
    300: "#FF8A5B",
    400: "#FF6433",
    500: "#FF3E00", // Bright orange for accent
    600: "#CC3200",
    700: "#992600",
    800: "#661900",
    900: "#330C00",
  },
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              dark: colorTokens.primary[200],
              main: colorTokens.primary[500],
              light: colorTokens.primary[700],
            },
            secondary: {
              dark: colorTokens.secondary[200],
              main: colorTokens.secondary[500],
              light: colorTokens.secondary[700],
            },
            accent: {
              dark: colorTokens.accent[200],
              main: colorTokens.accent[500],
              light: colorTokens.accent[700],
            },
            neutral: {
              dark: colorTokens.grey[300],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[600],
              medium: colorTokens.grey[700],
              light: colorTokens.grey[800],
            },
            background: {
              default: colorTokens.grey[900],
              alt: colorTokens.grey[1000],
              widgets: colorTokens.grey[800],
            },
          }
        : {
            primary: {
              dark: colorTokens.primary[600],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
            },
            secondary: {
              dark: colorTokens.secondary[600],
              main: colorTokens.secondary[500],
              light: colorTokens.secondary[50],
            },
            accent: {
              dark: colorTokens.accent[600],
              main: colorTokens.accent[500],
              light: colorTokens.accent[50],
            },
            neutral: {
              dark: colorTokens.grey[600],
              main: colorTokens.grey[400],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[200],
              light: colorTokens.grey[50],
            },
            background: {
              default: colorTokens.grey[10],
              alt: colorTokens.grey[0],
            },
          }),
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
