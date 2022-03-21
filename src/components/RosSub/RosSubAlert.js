import React, { useEffect, useState, useRef } from "react";
import ROSLIB from "roslib/src/RosLib";
import { ToggleButton, Grid, ToggleButtonGroup, Button } from "@mui/material";
import Mode from "../../components/RosTopics/Mode";
import SharedStyles from "./SharedStyles";
import Weather from "../Weather/Weather";

const ros = new ROSLIB.Ros({
  url: "ws://localhost:9090",
});

const modeTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/mode",
  messageType: "std_msgs/Int8",
});

const RosSubAlert = ({ addSub }) => {
  const classes = SharedStyles();
  const [receiveMode, setReceiveMode] = useState([]);
  const [sub, setSub] = useState(false);

  const handleChange = (event, newSub) => {
    let sub_n;
    if (newSub === null) {
      sub_n = sub;
    } else if (newSub) {
      sub_n = newSub;
      addSub(true);
      modeTopic.subscribe(function (message) {
        setReceiveMode(message.data);
      });
    } else if (!newSub) {
      sub_n = newSub;
      addSub(false);
      modeTopic.unsubscribe();
    }
    setSub(sub_n);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3} className={classes.text}>
        <Weather />
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={4} className={classes.mode_text}>
        <Mode mode={receiveMode} />
      </Grid>
      <Grid item xs={2}></Grid>
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

export default RosSubAlert;
