import React, { useState } from "react";
import ROSLIB from "roslib";
import { Box, Grid } from "@material-ui/core";
import SharedStyles from "./SharedStyles";
import Gear from "../RosTopics/Gear";
import SignalLights from "../RosTopics/SignalLight";
import Battery from "../RosTopics/Battery";

const ros = new ROSLIB.Ros({ url: "ws://localhost:9090" });
const velTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/can_vel",
  messageType: "std_msgs/Int8",
});
const gearTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/can_gear",
  messageType: "std_msgs/Int8",
});
// const signalTopic = new ROSLIB.Topic({
//   ros: ros,
//   name: "/signal_light",
//   messageType: "std_msgs/Int8",
// });
// const batteryTopic = new ROSLIB.Topic({
//   ros: ros,
//   name: "/battery",
//   messageType: "std_msgs/Int8",
// });
// const carTempTopic = new ROSLIB.Topic({
//   ros: ros,
//   name: "/car_temperature",
//   messageType: "std_msgs/Int8",
// });

const SideRos = (props) => {
  const classes = SharedStyles();
  const [receiveVel, setReceiveVel] = useState([]);
  const [receiveGear, setReceiveGear] = useState([]);
  // const [receiveSignal, setReceiveSignal] = useState([]);
  // const [receiveBattery, setReceiveBattery] = useState([]);
  // const [receiveCarTemp, setReceiveCarTemp] = useState([]);
  const [isSub, setIsSub] = useState(false);

  let vel_text_class = classes.vel_default;
  let gear_text_class = classes.gear_default;

  if (!isSub && props.sub) {
    setIsSub(true);
    velTopic.subscribe(function (message) {
      setReceiveVel(message.data);
    });
    gearTopic.subscribe(function (message) {
      setReceiveGear(message.data);
    });
    // signalTopic.subscribe(function (message) {
    //   setReceiveSignal(message.data);
    // });
    // batteryTopic.subscribe(function (message) {
    //   setReceiveBattery(message.data);
    // });
    // carTempTopic.subscribe(function (message) {
    //   setReceiveCarTemp(message.data);
    // });
  }
  if (isSub && !props.sub) {
    setIsSub(false);
    velTopic.unsubscribe();
    gearTopic.unsubscribe();
    // signalTopic.unsubscribe();
    // batteryTopic.unsubscribe();
    // carTempTopic.unsubscribe();
  }

  return (
    <Grid item xs container direction="column" className={classes.side}>
      <Grid item xs className={vel_text_class}>
        {receiveVel} km/h
      </Grid>
      <Box sx={{ mb: "2rem" }}></Box>
      <Grid item xs className={gear_text_class}>
        <Gear gear={receiveGear} />
      </Grid>
      {/* <Grid item xs>
        <SignalLights signal={receiveSignal} />
      </Grid>
      <Grid item xs>
        <Battery battery={receiveBattery} />
      </Grid>
      <Grid item xs className={classes.temp_text}>
        {receiveCarTemp}&deg;C
      </Grid> */}
    </Grid>
  );
};

export default SideRos;
