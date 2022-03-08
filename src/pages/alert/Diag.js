import { ThemeProvider } from "@emotion/react";
import Button from "@mui/material/Button";
import maintheme from "../../mainTheme";

function Diag(element) {
  return (
    <ThemeProvider theme={maintheme}>
      <Button
        sx={{
          position: "absolute",
          top: element.y,
          left: element.x,
          width: 75,
          height: 50,
        }}
        color={element.error ? "error" : "success"}
        variant="contained"
      >
        {element.name}
      </Button>
    </ThemeProvider>
  );
}

export default Diag;
