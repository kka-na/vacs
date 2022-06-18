import { Grid, Box, makeStyles, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import MorphismButton from "../MorphismButton/MorphismButton";

const Styles = makeStyles((theme) => ({
  text: {
    textAlign: "center",
    marginTop:"2.2rem",
    marginBottom: "2rem",
    color: "#fff",
    fontSize: "1.8rem",
  },
  center: {
    marginBottom: "10%",
  },
}));

function GPSAccuracy(element) {
  const classes = Styles();
  const [RTK, setRTK] = useState("RTK Not Fixed");
  const [rtkClass, setRTKClass] = useState("square_basic");
  const [acc, setAcc] = useState(Number(0.0));

  useEffect(() => {
    if (element.state.x === 0) {
      setRTK("RTK Not Fixed");
      setRTKClass("square_not");
    } else if (element.state.x === 1) {
      setRTK("RTK Fixed");
      setRTKClass("square_good");
    } else {
      setRTK("RTK State");
      setRTKClass("square_basic");
    }
    setAcc(Number(element.state.y).toFixed(3));
  }, [element.state]);

  return (
    <div>
      <Box className={classes.center}>
        <MorphismButton name={RTK} class_name={rtkClass} />
      </Box>
      <Box className={classes.text}>
        GPS
        <br />
        Accuracy
        <br />
        {acc} m
      </Box>
    </div>
  );
}

export default GPSAccuracy;
