import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  grid: {
    display: "flex",
    marginTop: "0.5rem",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "1.5rem",
  },
  card: {
    color: "#fffff3",
    alignItems: "center",
    boxShadow: "none",
  },
  media: {
    width: "95%",
  },
  name: {
    backgroundColor: "#0c1024",
    color: "#fffff3",
    fontSize: "1.5rem",
  },
}));
