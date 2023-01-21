import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    keys: ["xs", "sm", "ms", "md", "lg", "xl"],
    values: { xs: 320, sm: 600, ms: 720, md: 900, lg: 1200, xl: 1536 },
    unit: "px",
  },
  direction: "ltr",
  palette: {
    mode: "light",
    common: { black: "#000", white: "#fff", lightGrey: "#E9EDFC" },
    primary: {
      light: "#2a9d8f",
      lighter: "#5cbfb3",
      main: "#287271",
      littleDark: "#1f5c5b",
      dark: "#264653",
      contrastText: "white",
    },
    secondary: {
      main: "#f4a261",
      light: "#efb366",
      dark: "#e76f51",
      contrastText: "#000",
    },
    special: {
      main: "#F9F8F8",
      extraLight: "#CDD3CE",
      light: "#BBB5BD",
      dark: "#65366e",
      extraDark: "#301934",
      alternative: "#D23F57",
      contrastText: "black",
    },
    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
      contrastText: "#fff",
    },
    warning: {
      main: "#ed6c02",
      light: "#ff9800",
      dark: "#e65100",
      contrastText: "#fff",
    },
    info: {
      main: "#0288d1",
      light: "#03a9f4",
      dark: "#01579b",
      contrastText: "#fff",
    },
    success: {
      main: "#2e7d32",
      light: "#4caf50",
      dark: "#1b5e20",
      contrastText: "#fff",
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#f5f5f5",
      A200: "#eeeeee",
      A400: "#bdbdbd",
      A700: "#616161",
      dark: "#616161",
      darkChannel: "97 97 97",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
      disabled: "rgba(0, 0, 0, 0.38)",
      primaryChannel: "0 0 0",
      secondaryChannel: "0 0 0",
    },
    divider: "rgba(0, 0, 0, 0.12)",
    background: { paper: "#fff", default: "#fff" },
    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.04)",
      hoverOpacity: 0.04,
      selected: "rgba(0, 0, 0, 0.08)",
      selectedOpacity: 0.08,
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(0, 0, 0, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
      activeChannel: "0 0 0",
    },
  },
  components: {
    MuiIcon: {
      defaultProps: {
        // Replace the `material-icons` default value.
        fontSize: "large",
        baseClassName: "material-icons-two-tone",
      },
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: '"Graphik", "Inter","Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontFamily:
        '"Graphik", "Inter","Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 300,
      fontSize: "6rem",
      lineHeight: 1.167,
      letterSpacing: "-0.01562em",
    },
    h2: {
      fontFamily:
        '"Graphik", "Inter","Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 300,
      fontSize: "4.5rem",
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
    h3: {
      fontFamily:
        '"Graphik", "Inter","Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "3.5rem",
      lineHeight: 1.167,
      letterSpacing: "0em",
    },
    h4: {
      fontFamily:
        '"Graphik", "Inter","Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "2.125rem",
      lineHeight: 1.235,
      letterSpacing: "0.00735em",
    },
    h5: {
      fontFamily:
        '"Graphik", "Inter","Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "1.7rem",
      lineHeight: 1.334,
      letterSpacing: "0em",
    },
    h6: {
      fontFamily:
        '"Graphik", "Inter","Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      fontSize: "1.3rem",
      lineHeight: 1.2,
      letterSpacing: "0.0075em",
    },
    subtitle1: {
      fontFamily:
        '"Graphik", "Inter","Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.75,
      letterSpacing: "0.00938em",
    },
    subtitle2: {
      fontFamily:
        '"Graphik", "Inter","Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.57,
      letterSpacing: "0.00714em",
    },
    body1: {
      fontFamily:
        '"Graphik", "Inter","Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
    },
    body2: {
      fontFamily:
        '"Graphik", "Inter","Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.43,
      letterSpacing: "0.01071em",
    },
    button: {
      fontFamily:
        '"Graphik", "Inter","Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.75,
      letterSpacing: "0.02857em",
      textTransform: "uppercase",
    },
    caption: {
      fontFamily:
        '"Graphik", "Inter","Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 1.66,
      letterSpacing: "0.03333em",
    },
    overline: {
      fontFamily:
        '"Graphik", "Inter","Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 2.66,
      letterSpacing: "0.08333em",
      textTransform: "uppercase",
    },
  },
});

export default theme;
