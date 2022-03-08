import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import MorphismButton from "../../components/MorphismButton/MorphismButton";

function PlannerState(element) {
  const [styleClasses, setStyleClasses] = useState([
    "basic50",
    "basic50",
    "basic50",
    "basic50",
    "basic50",
    "basic50",
    "basic50",
    "basic50",
    "basic50",
    "basic50",
  ]);
  useEffect(() => {
    let temp = styleClasses;
    element.state.map((state, index) => {
      temp[index] = state ? "purple50" : "basic50";
    });
    setStyleClasses(temp);
  }, [element.state]);

  return (
    <Grid>
      <Grid sx={{ display: "flex", position: "relative" }}>
        <MorphismButton
          name="Ready"
          class_name={styleClasses[0]}
        ></MorphismButton>
        <MorphismButton
          name="Global Planning"
          class_name={styleClasses[1]}
        ></MorphismButton>
      </Grid>
      <Grid sx={{ display: "flex", position: "relative" }}>
        <MorphismButton
          name="Behaviour Planning"
          class_name={styleClasses[2]}
        ></MorphismButton>
        <MorphismButton
          name="Velocity Planning"
          class_name={styleClasses[3]}
        ></MorphismButton>
      </Grid>
      <Grid sx={{ display: "flex", position: "relative" }}>
        <MorphismButton
          name="Waypoint Planning"
          class_name={styleClasses[4]}
        ></MorphismButton>
        <MorphismButton
          name="Both Planning"
          class_name={styleClasses[5]}
        ></MorphismButton>
      </Grid>
      <Grid sx={{ display: "flex", position: "relative" }}>
        <MorphismButton name="-" class_name={styleClasses[6]}></MorphismButton>
        <MorphismButton name="-" class_name={styleClasses[7]}></MorphismButton>
      </Grid>
      <Grid sx={{ display: "flex", position: "relative" }}>
        <MorphismButton name="-" class_name={styleClasses[8]}></MorphismButton>
        <MorphismButton name="-" class_name={styleClasses[9]}></MorphismButton>
      </Grid>
    </Grid>
  );
}

export default PlannerState;
