import React, { useState } from "react";
import ButtonStyles from "./PalleteStyles";
import { Grid, Box, Button } from "@material-ui/core";

const Pallete = () => {
  const classes = ButtonStyles();
  const [btn1, setBtn1] = useState("#14182d");
  const [btn1s, setBtn1s] = useState("false");
  const [btn2, setBtn2] = useState("#274F8A");
  const [btn2s, setBtn2s] = useState("false");
  const [btn3, setBtn3] = useState("#3b7bea");
  const [btn3s, setBtn3s] = useState("false");
  const [btn4, setBtn4] = useState("#85def5");
  const [btn4s, setBtn4s] = useState("false");
  const [btn5, setBtn5] = useState("#6569d7");
  const [btn5s, setBtn5s] = useState("false");
  const [btn6, setBtn6] = useState("#362577");
  const [btn6s, setBtn6s] = useState("false");
  const [btn7, setBtn7] = useState("#fe86e3");
  const [btn7s, setBtn7s] = useState("false");

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
  const handleBtn3 = () => {
    if (!btn3s) {
      setBtn3("#3b7bea");
      setBtn3s(!btn3s);
    } else {
      setBtn3("(59,123,234)");
      setBtn3s(!btn3s);
    }
  };
  const handleBtn4 = () => {
    if (!btn4s) {
      setBtn4("#85def5");
      setBtn4s(!btn4s);
    } else {
      setBtn4("(133,222,245)");
      setBtn4s(!btn4s);
    }
  };
  const handleBtn5 = () => {
    if (!btn5s) {
      setBtn5("#6569d7");
      setBtn5s(!btn5s);
    } else {
      setBtn5("(101,105,215)");
      setBtn5s(!btn5s);
    }
  };
  const handleBtn6 = () => {
    if (!btn6s) {
      setBtn6("#362577");
      setBtn6s(!btn6s);
    } else {
      setBtn6("(54,37,119)");
      setBtn6s(!btn6s);
    }
  };
  const handleBtn7 = () => {
    if (!btn7s) {
      setBtn7("#fe86e3");
      setBtn7s(!btn7s);
    } else {
      setBtn7("(254,134,226)");
      setBtn7s(!btn7s);
    }
  };
  return (
    <Grid item xs={12} className={classes.grid}>
      <Box sx={{ ml: "1rem" }}></Box>
      <Box>
        <p>Color Pallete</p>
        <Button
          className={classes.button1}
          onClick={handleBtn1}
          variant="contained"
        >
          {btn1}
        </Button>
        <Button
          className={classes.button2}
          onClick={handleBtn2}
          variant="contained"
        >
          {btn2}
        </Button>
        <Button
          className={classes.button3}
          onClick={handleBtn3}
          variant="contained"
        >
          {btn3}
        </Button>
        <Button
          className={classes.button4}
          onClick={handleBtn4}
          variant="contained"
        >
          {btn4}
        </Button>
        <Button
          className={classes.button5}
          onClick={handleBtn5}
          variant="contained"
        >
          {btn5}
        </Button>
        <Button
          className={classes.button6}
          onClick={handleBtn6}
          variant="contained"
        >
          {btn6}
        </Button>
        <Button
          className={classes.button7}
          onClick={handleBtn7}
          variant="contained"
        >
          {btn7}
        </Button>
      </Box>
    </Grid>
  );
};

export default Pallete;
