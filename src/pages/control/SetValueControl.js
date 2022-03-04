import React, { useState } from "react";
import ROSLIB from "roslib";
import { Grid, TextField, Box, Button } from "@material-ui/core";
import ControlStyles from "./ControlStyles.ts";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const ros = new ROSLIB.Ros({
  url: "ws://localhost:9090",
});

const modeTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/mode",
  messageType: "geometry_msgs/Vector3",
});
const modeSetTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/mode_set",
  messageType: "geometry_msgs/Vector3",
});
const speedTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/speed",
  messageType: "geometry_msgs/Vector3",
});
const steeringTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/steering",
  messageType: "geometry_msgs/Vector3",
});
const espSpeedTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/esp_speed",
  messageType: "geometry_msgs/Vector3",
});
const pidTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/pid",
  messageType: "geometry_msgs/Vector3",
});

const SetValueControl = (props) => {
  const classes = ControlStyles();
  const [modes, setModes] = useState([]);
  const [isSub, setIsSub] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [steering, setSteering] = useState(0);
  const [espSpeed, setEspSpeed] = useState(0);
  const [kp, setKp] = useState(0);
  const [ki, setKi] = useState(0);
  const [kd, setKd] = useState(0);

  const modesChange = (event, mode) => {
    const mode_num = parseInt(mode);
    setModes(mode_num);
    if (isSub) {
      modeSetTopic.publish({ x: mode_num, y: 0, z: 0 });
    }
  };

  const speedChange = (event) => {
    setSpeed(parseFloat(event.target.value));
  };
  const steeringChange = (event) => {
    setSteering(parseFloat(event.target.value));
  };
  const espSpeedChange = (event) => {
    setEspSpeed(parseFloat(event.target.value));
  };
  const kpChange = (event) => {
    setKp(parseFloat(event.target.value));
  };
  const kiChange = (event) => {
    setKi(parseFloat(event.target.value));
  };
  const kdChange = (event) => {
    setKd(parseFloat(event.target.value));
  };

  const applyClick = () => {
    if (isSub) {
      speedTopic.publish({ x: speed, y: 0, z: 0 });
      steeringTopic.publish({ x: steering, y: 0, z: 0 });
      espSpeedTopic.publish({ x: espSpeed, y: 0, z: 0 });
      pidTopic.publish({ x: kp, y: ki, z: kd });
    }
  };

  const aebClick = () => {};
  if (!isSub && props.sub) {
    setIsSub(true);
    modeTopic.subscribe(function (message) {
      setModes(message.x);
    });
  }
  if (isSub && !props.sub) {
    setIsSub(false);
    modeTopic.unsubscribe();
  }
  return (
    <Grid
      item
      xs
      container
      direction="column"
      className={classes.set_value}
      spacing={1}
    >
      <ToggleButtonGroup
        exclusive
        orientation="vertical"
        value={modes}
        onChange={modesChange}
        className={classes.mode_toggle_button_group}
        fullWidth
      >
        <ToggleButton className={classes.mode_toggle_button} value={0}>
          Manual Mode
        </ToggleButton>
        <ToggleButton className={classes.mode_toggle_button} value={1}>
          Autopilot Mode
        </ToggleButton>
        <ToggleButton className={classes.mode_toggle_button} value={2}>
          Test Mode
        </ToggleButton>
        <ToggleButton className={classes.mode_toggle_button} value={3}>
          License Mode
        </ToggleButton>
      </ToggleButtonGroup>
      <Grid item xs className={classes.input_grid} fullWidth>
        <TextField
          label="Speed"
          onChange={speedChange}
          variant="outlined"
          className={classes.text_field}
        />
      </Grid>
      <Grid item xs className={classes.input_grid} fullWidth>
        <TextField
          label="Steering"
          onChange={steeringChange}
          variant="outlined"
          className={classes.text_field}
        />
      </Grid>
      <Grid item xs className={classes.input_grid} fullWidth>
        <TextField
          label="ESP Speed"
          onChange={espSpeedChange}
          variant="outlined"
          className={classes.text_field}
        />
      </Grid>
      <Grid item xs className={classes.input_grid} fullWidth>
        <TextField
          label="Kp"
          onChange={kpChange}
          variant="outlined"
          className={classes.text_field}
        />
        <TextField
          label="Ki"
          onChange={kiChange}
          variant="outlined"
          className={classes.text_field}
        />
        <TextField
          label="Kd"
          onChange={kdChange}
          variant="outlined"
          className={classes.text_field}
        />
      </Grid>
      <Box mt={1}></Box>
      <Button
        className={classes.apply_button}
        onClick={applyClick}
        variant="contained"
        fullWidth
      >
        Apply
      </Button>
      <Button
        className={classes.apply_button}
        onClick={aebClick}
        variant="contained"
        fullWidth
      >
        AEB
      </Button>
    </Grid>
  );
};

export default SetValueControl;
