import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  map: {
    height: "0",
    paddingBottom: "56.25%",
  },
  card: {
    backgroundColor: "#0f152e",
    color: "#fffff3",
    height: "0",
    paddingBottom: "56.25%",
    boxShadow: "5px 5px 7px #05060e",
  },
  media: {
    width: "100%",
    height: "auto",
    aspectRatio: "16 / 9",
    boxShadow: "5px 5px 7px #05060e",
  },
  card_lidar: {
    color: "#fffff3",
    height: "33rem",
    boxShadow: "5px 5px 7px #05060e",
  },
  toggle_button_group: {
    "& .MuiToggleButtonGroup-grouped": {
      margin: "0.5rem",
      borderRadius: "4px !important",
      height: "4rem",
    },
  },
  toggle_button: {
    "&.MuiToggleButton-root": {
      fontFamily: "Rajdhani, sans-serif",
      fontSize: "1.2rem",
      backgroundColor: "#0c1024",
      color: "#fff",
      borderRadius: "4px",
      boxShadow: "5px 5px 7px #05060e, -5px -5px 7px #131a3a",
      "&:hover": {
        backgroundColor: "#3b7bea",
        borderRadius: "4px",
        boxShadow: "5px 5px 7px #05060e, -5px -5px 7px #131a3a",
        color: "#fff",
      },
      "&.Mui-selected": {
        backgroundColor: "#85def5",
        borderRadius: "4px",
        boxShadow: "5px 5px 7px #05060e, -5px -5px 7px #131a3a",
        color: "#0c1024",
        "&:hover": {
          backgroundColor: "#0c1024",
          borderRadius: "4px",
          boxShadow: "5px 5px 7px #05060e, -5px -5px 7px #131a3a",
          color: "#3b7bea",
        },
      },
    },
  },
  pub_button: {
    fontFamily: "Rajdhani, sans-serif",
    fontSize: "1.2rem",
    backgroundColor: "#0c1024",
    color: "#fff",
    marginTop: "0.5rem",
    borderRadius: "4px",
    height: "4rem",
    boxShadow: "5px 5px 7px #05060e, -5px -5px 7px #131a3a",
    "&:hover": {
      backgroundColor: "#6569d7",
      borderRadius: "4px",
      boxShadow: "5px 5px 7px #05060e, -5px -5px 7px #131a3a",
      color: "#0c1024",
    },
  },
  set_value: {
    display: "flex",
    verticalAlign: "middle",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "1.8em",
  },
  full_button: {
    marginTop: "1.2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input_grid: {
    marginTop: "0.2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text_field: {
    marginBottom: "0.3rem",
    width: "100%",
    "& label": {
      color: "white",
      fontSize: "1.2rem",
    },
    "& label.Mui-focused": {
      color: "#3b7bea",
    },
    "& .MuiInputBase-root": {
      color: "white",
      height: "4rem",
      fontSize: "1.2rem",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "1px solid rgba(255,255,255,.7)",
      },
      "&:hover fieldset": {
        borderColor: "#3b7bea",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3b7bea",
      },
    },
  },
}));
