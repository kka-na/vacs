import React, { useState } from "react";
import ROSLIB from "roslib";
import SetTargetVelocityStyles from "./SetTargetVelocityStyles";
import { Grid, Box, Button } from "@material-ui/core";
import SelectInput from "@mui/material/Select/SelectInput";
import DropAlerting from "../DropAlerting";

const ros = new ROSLIB.Ros({ url: "ws://localhost:9090" });
const targetVelTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/target_vel",
  messageType: "std_msgs/Int8",
});

const SetTargetVelocity = (props) => {
  const classes = SetTargetVelocityStyles();
  const [isSub, setIsSub] = useState(false);
  const [isDecrease, setIsDecrease] = useState(false);
  const [isIncrease, setIsIncrease] = useState(false);
  const [targetVel, setTargetVel] = useState(40);
  const [type, setType] = useState(0);

  const decreaseVel = () => {
    if (targetVel > 30) {
      setTargetVel((targetVel) => targetVel - 5);
      setType(1);
    }
  };
  const increaseVel = () => {
    if (targetVel < 60) {
      setTargetVel((targetVel) => targetVel + 5);
      setType(2);
    }
  };
  const setVel = () => {
    let temp = targetVel;
    if (isSub) {
      targetVelTopic.publish({ data: temp });
    }
    if (Number(type) === 1) {
      setIsDecrease(true);
    } else if (Number(type) === 2) {
      setIsIncrease(true);
    }

    setTimeout(() => {
      setIsDecrease(false);
      setIsIncrease(false);
      setType(0);
    }, 500);
  };

  if (!isSub && props.sub) {
    setIsSub(true);
  }
  if (isSub && !props.sub) {
    setIsSub(false);
  }

  return (
    <Grid container>
      <DropAlerting isDecrease={isDecrease} isIncrease={isIncrease} />
      <Grid item xs={12}>
        <div className={classes.target_vel}>Target Velocity</div>
        <div className={classes.vel}>{targetVel} km/h</div>
      </Grid>
      <Grid container direction="row">
        <Button className={classes.purple33} onClick={decreaseVel}>
          Down
        </Button>
        <Box sx={{ mr: "0.5rem" }}></Box>
        <Button className={classes.purple33} onClick={setVel}>
          Set
        </Button>
        <Box sx={{ mr: "0.5rem" }}></Box>
        <Button className={classes.purple33} onClick={increaseVel}>
          Up
        </Button>
      </Grid>
    </Grid>
  );
};

export default SetTargetVelocity;
