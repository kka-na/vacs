import React, { useEffect, useState } from "react";
import {
  ToggleButton,
  Grid,
  Checkbox,
  FormControlLabel,
  ToggleButtonGroup,
} from "@mui/material";
import SharedStyles from "./SharedStyles";
import Weather from "../Weather/Weather";
import Stopwatch from "../Stopwatch/Stopwatch";

const RosSubViz = ({ addSub }) => {
  const classes = SharedStyles();
  const [chkLogging, setChkLogging] = useState(false);
  const [time, setTime] = useState(0);
  const [sub, setSub] = useState(false);

  const handleLogging = (event) => {
    setChkLogging(true);
  };

  useEffect(() => {
    let interval = null;
    if (chkLogging && sub) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [sub]);

  const handleChange = (event, newSub) => {
    setSub(newSub);
    if (newSub) {
      setTime(0);
      addSub(true);
    } else {
      addSub(false);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3} className={classes.text}>
        <Weather />
      </Grid>
      <Grid item xs={5}></Grid>
      <Grid item xs={1} className={classes.stopwatch_text}>
        <Stopwatch time={time} />
      </Grid>
      <Grid item xs={1} className={classes.text}>
        <FormControlLabel
          control={
            <Checkbox style={{ color: "#fff" }} onChange={handleLogging} />
          }
          label="Logging"
        />
      </Grid>
      <Grid item xs={2} className={classes.grid}>
        <ToggleButtonGroup
          className={classes.toggle_button_group}
          value={sub}
          exclusive
          onChange={handleChange}
          fullWidth
        >
          <ToggleButton className={classes.toggle_button} value={true}>
            Subscribe
          </ToggleButton>

          <ToggleButton className={classes.toggle_button} value={false}>
            Unsubscribe
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
};

export default RosSubViz;
