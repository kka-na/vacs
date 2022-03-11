import { createTheme } from "@material-ui/core";

const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#3b7bea",
    },
    secondary: {
      main: "#0c1024", //#fffff3
    },
    error: {
      main: "#ff2659",
    },
    warning: {
      main: "#fe86e3",
    },
    info: {
      main: "#ffff80",
    },
    success: {
      main: "#42f5ba",
    },
  },
});

export default mainTheme;
