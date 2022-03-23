import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";

function SetGPSAcc(element) {
  const [RTK, setRTK] = useState("False");
  const [acc, setAcc] = useState(0);

  useEffect(() => {
    if (element.state.x === 0) {
      setRTK("False");
    } else {
      setRTK("True");
    }
    setAcc(element.state.y);
  }, [element.state]);

  return (
    <Grid item xs container spacing={2}>
      <Grid xs={6}>
        <div style={{ marginLeft: "1rem", color: "#fff", fontSize: "18px" }}>
          RTK Fixed : {RTK}
        </div>
      </Grid>
      <Grid xs={6}>
        <div style={{ color: "#fff", fontSize: "18px" }}>
          GPS Accuracy : {acc} m
        </div>
      </Grid>
    </Grid>
  );
}

export default SetGPSAcc;
