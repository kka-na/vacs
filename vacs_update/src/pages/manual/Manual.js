import React from "react";
import ManualStyles from "./ManualStyles";
import { Grid, Box } from "@material-ui/core";

const Manual = () => {
  const classes = ManualStyles();
  return (
    <Grid item xs container>
      <Grid item xs={6} className={classes.grid}>
        <Box sx={{ ml: "1rem" }}></Box>
        <Box>
          <p>Visualize Mode</p>
          <img className={classes.media} src={"/pngs/visualization.png"} />
        </Box>
      </Grid>
      <Grid item xs={6} className={classes.grid}>
        <Box sx={{ ml: "1rem" }}></Box>
        <Box>
          <p>Alert Mode</p>
          <img className={classes.media} src={"/pngs/alert.png"} />
        </Box>
      </Grid>
      <Grid item xs={6} className={classes.grid}>
        <Box sx={{ ml: "1rem" }}></Box>
        <Box>
          <p>Control Mode</p>
          <img className={classes.media} src={"/pngs/control.png"} />
        </Box>
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
};

export default Manual;
