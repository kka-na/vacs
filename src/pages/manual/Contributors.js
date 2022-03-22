import React, { useState } from "react";
import ContribStyles from "./ContribStyles";
import { Grid, Box, Typography } from "@material-ui/core";

const Contributors = () => {
  const classes = ContribStyles();
  const [btn1, setBtn1] = useState("#14182d");
  const [btn1s, setBtn1s] = useState("false");
  const [btn2, setBtn2] = useState("#274F8A");
  const [btn2s, setBtn2s] = useState("false");

  const handleBtn1 = () => {
    if (!btn1s) {
      setBtn1("#14182d");
      setBtn1s(!btn1s);
    } else {
      setBtn1("(20,24,45)");
      setBtn1s(!btn1s);
    }
  };
  const handleBtn2 = () => {
    if (!btn2s) {
      setBtn2("#274F8A");
      setBtn2s(!btn2s);
    } else {
      setBtn2("(39,79,138)");
      setBtn2s(!btn2s);
    }
  };

  return (
    <div>
      <Grid container xs className={classes.grid}>
        <Box sx={{ ml: "1rem" }}></Box>
        <p>Contributors</p>
      </Grid>
      <Grid item xs={12} className={classes.grid}>
        <Box sx={{ ml: "1rem" }}></Box>
        <Box sx={{ ml: "1rem" }}></Box>
        <Box className={classes.icon}>
          <img src={"/pngs/alien2.png"} alt="alien2"></img>
        </Box>
        <Typography className={classes.name} display="inline">
          Kana, Kim
          <br />
          M.S. Student @INHA Univ. <br />
          kka-na@inha.edu
        </Typography>
        <Box sx={{ mr: "5.5rem" }}></Box>
        <Box className={classes.icon}>
          <img src={"/pngs/alien1.png"} alt="alien1"></img>
        </Box>
        <Typography className={classes.name} display="inline">
          Hyungjin, Han
          <br />
          M.S. Student @INHA Univ. <br />
          hjhan@inha.edu
        </Typography>
      </Grid>
    </div>
  );
};

export default Contributors;
