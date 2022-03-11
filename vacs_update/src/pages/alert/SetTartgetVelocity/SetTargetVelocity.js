import React, { useState } from "react";
import ROSLIB from "roslib";
import SetTargetVelocityStyles from "./SetTargetVelocityStyles";
import { Grid, Box, Button } from "@material-ui/core";

const ros = new ROSLIB.Ros({ url: "ws://localhost:9090" });
const targetVelTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/target_vel",
  messageType: "std_msgs/Float32",
});

const SetTargetVelocity = (props) => {
  const classes = SetTargetVelocityStyles();
  const [isSub, setIsSub] = useState(false);
  const [targetVel, setTargetVel] = useState(40);

  const decreaseVel = () => {
    if (targetVel > 0) {
      setTargetVel((targetVel) => targetVel - 5);
    }
  };
  const increaseVel = () => {
    if (targetVel < 60) {
      setTargetVel((targetVel) => targetVel + 5);
    }
  };
  const setVel = () => {
    let temp = targetVel;
    if (isSub) {
      targetVelTopic.publish({ data: temp });
    }
  };

  if (!isSub && props.sub) {
    setIsSub(true);
  }
  if (isSub && !props.sub) {
    setIsSub(false);
  }

  return (
    <Grid container>
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
