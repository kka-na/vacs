import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  map: {
    height: "30rem",
    padding: "0",
    width: "100%",
  },
  mode_toggle_button_group: {
    "& .MuiToggleButtonGroup-grouped": {
      borderRadius: "4px !important",
    },
  },
  mode_toggle_button: {
    "&.MuiToggleButton-root": {
      fontFamily: "Rajdhani, sans-serif",
      fontSize: "1.6rem",
      height: "6.5rem",
      backgroundColor: "#0c1024",
      color: "#fff",
      borderRadius: "4px",
      boxShadow: "5px 5px 7px #05060e, -5px -5px 7px #131a3a",
      "&.Mui-selected": {
        backgroundColor: "#85def5",
        borderRadius: "4px",
        boxShadow: "5px 5px 7px #05060e, -5px -5px 7px #131a3a",
        color: "#0c1024",
        "&:hover": {
          backgroundColor: "#85def5",
          borderRadius: "4px",
          boxShadow: "5px 5px 7px #05060e, -5px -5px 7px #131a3a",
          color: "#0c1024",
        },
      },
    },
  },
  diag_paper: {
    background:
      'url("/gifs/red_car.gif") no-repeat center center, linear-gradient(rgba(12,16,36,1), rgba(12,16,36,1))',
    position: "relative",
    height: "100%",
  },
  diag_paper_stop: {
    background:
      'url("/pngs/red_car_lane.png") no-repeat center center, linear-gradient(rgba(12,16,36,1), rgba(12,16,36,1))',
    position: "relative",
    height: "100%",
  },
  diag_paper_undefined: {
    background:
      'url("/pngs/red_car.png") no-repeat center center, linear-gradient(rgba(12,16,36,1), rgba(12,16,36,1))',
    position: "relative",
    height: "100%",
  },
}));
