import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  box: {
    float: "right",
    marginBottom: "5px",
  },
  grid: {
    display: "flex",
  },
  toggle_button_group: {
    "& .MuiToggleButtonGroup-grouped": {
      marginRight: "1rem",
      borderRadius: "4px !important",
    },
  },
  toggle_button: {
    "&.MuiToggleButton-root": {
      fontFamily: "Rajdhani, sans-serif",
      fontSize: "1rem",
      backgroundColor: "#0c1024",
      color: "#fff",
      height: "4rem",
      padding: "0.5rem",
      borderRadius: "4px",
      boxShadow: "5px 5px 7px #05060e, -5px -5px 7px #131a3a",
      "&:hover": {
        backgroundColor: "#3b7bea",
        borderRadius: "4px",
        boxShadow: "5px 5px 7px #05060e, -5px -5px 7px #131a3a",
        color: "#fff",
      },
      "&.Mui-selected": {
        backgroundColor: "#274f8a",
        borderRadius: "4px",
        boxShadow: "5px 5px 7px #05060e, -5px -5px 7px #131a3a",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#0c1024",
          borderRadius: "4px",
          boxShadow: "5px 5px 7px #05060e, -5px -5px 7px #131a3a",
          color: "#3b7bea",
        },
      },
    },
  },
  text: {
    display: "flex",
    verticalAlign: "middle",
    alignItems: "center",
    fontSize: "20px",
    color: "#fff",
  },
  stopwatch_text: {
    display: "flex",
    verticalAlign: "middle",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    color: "#fff",
  },
  mode_text: {
    display: "flex",
    verticalAlign: "middle",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "1.8rem",
  },
  side: {
    display: "flex",
    verticalAlign: "middle",
    justifyContent: "center",
    alignItems: "center",
  },
  vel_default: {
    color: "#fff",
    fontSize: "2rem",
  },
  gear_default: {
    color: "#fff",
    fontSize: "2rem",
  },
  temp_text: {
    marginTop: "0.5rem",
  },
  empty: {
    paddingTop: "10em",
  },
}));
