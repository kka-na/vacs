import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  target_vel: {
    color: "#fff",
    height: "1.5rem",
    marginBottom: "0.5rem",
    display: "flex",
    verticalAlign: "middle",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.2rem",
  },
  vel: {
    color: "#fff",
    height: "4.5rem",
    display: "flex",
    borderBottom: "3px solid #737d8c",
    verticalAlign: "middle",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2.2rem",
  },
  purple33: {
    position: "relative",
    marginTop: "0.8rem",
    height: "6.5rem",
    width: "31.333%",
    fontFamily: "Rajdhani, sans-serif",
    fontSize: "1.2rem",
    borderRadius: "4px",
    boxShadow: "5px 5px 7px #05060e, -5px -5px 7px #131a3a",
    backgroundColor: "#0c1024",
    color: "#fff",
    "&:hover": {
      borderRadius: "4px",
      boxShadow: "5px 5px 7px #05060e, -5px -5px 7px #131a3a",
      backgroundColor: "#6569d7",
      color: "#fff",
    },
  },
}));
