import React, { useState } from "react";
import { Box, Grid } from "@material-ui/core";

import RosSubViz from "../../components/RosSub/RosSubViz";
import SideRos from "../../components/RosSub/SideRos";
import SetValueViz from "./SetValueViz";
import SetViz from "./SetViz";
import Footer from "../../components/Footer/Footer";

const Visualization = () => {
  const [getSub, setSub] = useState(false);

  const addSub = (bool) => {
    setSub(bool);
  };

  return (
    <Box m={3} mt={1}>
      <RosSubViz addSub={addSub} />
      <Box mt={1}></Box>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <SideRos sub={getSub} />
        </Grid>
        <Grid item xs={2}>
          <SetValueViz sub={getSub} />
        </Grid>
        <Grid item xs={9}>
          <SetViz sub={getSub} />
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
};

export default Visualization;
