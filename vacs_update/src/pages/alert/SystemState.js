import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import MorphismButton from "../../components/MorphismButton/MorphismButton";
import { Box } from "@material-ui/core";

function SystemState(element) {
  const [styleClasses, setStyleClasses] = useState([
    "basic33",
    "basic33",
    "basic33",
  ]);

  useEffect(() => {
    let temp = styleClasses;
    element.state.map((state, index) => {
      temp[index] = state ? "pink33" : "basic33";
    });
    setStyleClasses(temp);
  }, [element.state]);

  return (
    <Grid>
      <Grid sx={{ display: "flex", position: "relative" }}>
        <MorphismButton
          name="Sensing"
          class_name={styleClasses[0]}
        ></MorphismButton>
        <Box sx={{ mr: "0.5rem" }}></Box>
        <MorphismButton
          name="Perception"
          class_name={styleClasses[1]}
        ></MorphismButton>
        <Box sx={{ mr: "0.5rem" }}></Box>
        <MorphismButton
          name="Decision"
          class_name={styleClasses[2]}
        ></MorphismButton>
      </Grid>
    </Grid>
  );
}

export default SystemState;
