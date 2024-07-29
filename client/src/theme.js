// // color design tokens export
// export const colorTokens = {
//   grey: {
//     0: "#FFFFFF",
//     10: "#F6F6F6",
//     50: "#F0F0F0",
//     100: "#E0E0E0",
//     200: "#C2C2C2",
//     300: "#A3A3A3",
//     400: "#858585",
//     500: "#666666",
//     600: "#4D4D4D",
//     700: "#333333",
//     800: "#1A1A1A",
//     900: "#0A0A0A",
//     1000: "#000000",
//   },
//   primary: {
//     50: "#E6FBFF",
//     100: "#CCF7FE",
//     200: "#99EEFD",
//     300: "#66E6FC",
//     400: "#33DDFB",
//     500: "#00D5FA",
//     600: "#00A0BC",
//     700: "#006B7D",
//     800: "#00353F",
//     900: "#001519",
//   },
// };

// // mui theme settings
// export const themeSettings = (mode) => {
//   return {
//     palette: {
//       mode: mode,
//       ...(mode === "dark"
//         ? {
//             // palette values for dark mode
//             primary: {
//               dark: colorTokens.primary[200],
//               main: colorTokens.primary[500],
//               light: colorTokens.primary[800],
//             },
//             neutral: {
//               dark: colorTokens.grey[100],
//               main: colorTokens.grey[200],
//               mediumMain: colorTokens.grey[300],
//               medium: colorTokens.grey[400],
//               light: colorTokens.grey[700],
//             },
//             background: {
//               default: colorTokens.grey[900],
//               alt: colorTokens.grey[800],
//             },
//           }
//         : {
//             // palette values for light mode
//             primary: {
//               dark: colorTokens.primary[700],
//               main: colorTokens.primary[500],
//               light: colorTokens.primary[50],
//             },
//             neutral: {
//               dark: colorTokens.grey[700],
//               main: colorTokens.grey[500],
//               mediumMain: colorTokens.grey[400],
//               medium: colorTokens.grey[300],
//               light: colorTokens.grey[50],
//             },
//             background: {
//               default: colorTokens.grey[10],
//               alt: colorTokens.grey[0],
//             },
//           }),
//     },
//     typography: {
//       fontFamily: ["Rubik", "sans-serif"].join(","),
//       fontSize: 12,
//       h1: {
//         fontFamily: ["Rubik", "sans-serif"].join(","),
//         fontSize: 40,
//       },
//       h2: {
//         fontFamily: ["Rubik", "sans-serif"].join(","),
//         fontSize: 32,
//       },
//       h3: {
//         fontFamily: ["Rubik", "sans-serif"].join(","),
//         fontSize: 24,
//       },
//       h4: {
//         fontFamily: ["Rubik", "sans-serif"].join(","),
//         fontSize: 20,
//       },
//       h5: {
//         fontFamily: ["Rubik", "sans-serif"].join(","),
//         fontSize: 16,
//       },
//       h6: {
//         fontFamily: ["Rubik", "sans-serif"].join(","),
//         fontSize: 14,
//       },
//     },
//   };
// };
// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0ac990",
    1000: "#000000",
    1010:"#1a1919"
  },
  primary: {
    50: "#FFF9E6",
    100: "#FFF3CC",
    200: "#FFE799",
    300: "#FFDB66",
    400: "#FFCF33",
    500: "#FFC300", // Honeybee
    600: "#CC9B00",
    700: "#997400",
    800: "#664C00",
    900: "#332600",
  },
  secondary: {
    50: "#E6F4E6",
    100: "#CCE9CC",
    200: "#99D399",
    300: "#66BD66",
    400: "#33A733",
    500: "#009100", // Forest green
    600: "#007300",
    700: "#005500",
    800: "#003600",
    900: "#001800",
  },
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              dark: colorTokens.primary[200],
              main: colorTokens.primary[500],
              light: colorTokens.primary[800],
            },
            secondary: {
              dark: colorTokens.secondary[200],
              main: colorTokens.secondary[500],
              light: colorTokens.secondary[800],
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.grey[1010],
              alt: colorTokens.grey[1010],
              widgets:colorTokens.grey[800]
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
            },
            secondary: {
              dark: colorTokens.secondary[700],
              main: colorTokens.secondary[500],
              light: colorTokens.secondary[50],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
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
