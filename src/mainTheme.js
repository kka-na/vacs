import { createTheme } from "@material-ui/core";

const mainTheme = createTheme({
    palette:{
      primary: {
        main: '#3b7bea',
      },
      secondary: {
        main: '#6569d7',
      },
      error: {
        main: '#fe86e3',
      },
      warning: {
        main: '#fe86e3',
      },
      info: {
        main: '#ffff80',
      },
      success: {
        main: '#85dcf5',
      },
    },
});

export default mainTheme;
