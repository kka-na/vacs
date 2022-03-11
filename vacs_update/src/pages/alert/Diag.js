import { ThemeProvider } from "@emotion/react";
import Button from "@mui/material/Button";
import maintheme from "../../mainTheme";

function Diag(element) {
  let button_color;
  if (element.error !== undefined) {
    button_color = element.error ? "error" : "success";
  } else {
    button_color = "secondary";
  }
  return (
    <ThemeProvider theme={maintheme}>
      <Button
        sx={{
          position: "absolute",
          top: element.y,
          left: element.x,
          width: 100,
          height: 70,
          fontSize: "1.2rem",
          fontWeight: "600",
        }}
        color={button_color}
        variant="contained"
      >
        {element.name}
      </Button>
    </ThemeProvider>
  );
}

export default Diag;
