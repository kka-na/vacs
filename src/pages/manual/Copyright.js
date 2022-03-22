import React from "react";
import ContribStyles from "./ContribStyles";

import { Box, Typography } from "@material-ui/core";

const Copyright = () => {
  const classes = ContribStyles();
  return (
    <div>
      <Box sx={{ mt: " 1rem" }} />
      <Box className={classes.icon2}>
        <img src={"/pngs/cvlab.png"} alt="cvlab"></img>
        <Box sx={{ mr: " 3rem" }} />
        <img src={"/pngs/aeye.png"} alt="aeye"></img>
        <Box sx={{ mr: " 3rem" }} />
        <img src={"/pngs/inha.png"} alt="inha"></img>
      </Box>
      <Typography className={classes.name2}>
        Computer Vision Lab. @ Inha Universityh. Dept of Information and
        Communications Engineering
        <br />
        100, Inha-ro, Michuhol-gu, Incheon, Republic of Korea
        <br />
        Copyright. 2022 CVLab All rights Reserved
      </Typography>
    </div>
  );
};

export default Copyright;
