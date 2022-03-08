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
  name: "/vel",
  messageType: "std_msgs/Int8",
});
const gearTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/gear",
  messageType: "std_msgs/Int8",
});
const signalTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/signal_light",
  messageType: "std_msgs/Int8",
});
const batteryTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/battery",
  messageType: "std_msgs/Int8",
});
const carTempTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/car_temperature",
  messageType: "std_msgs/Int8",
});

const SideRos = (props) => {
  const classes = SharedStyles();
  const [receiveVel, setReceiveVel] = useState([]);
  const [receiveGear, setReceiveGear] = useState([]);
  const [receiveSignal, setReceiveSignal] = useState([]);
  const [receiveBattery, setReceiveBattery] = useState([]);
  const [receiveCarTemp, setReceiveCarTemp] = useState([]);
  const [isSub, setIsSub] = useState(false);

  if (!isSub && props.sub) {
    setIsSub(true);
    velTopic.subscribe(function (message) {
      setReceiveVel(message.data);
    });
    gearTopic.subscribe(function (message) {
      setReceiveGear(message.data);
    });
    signalTopic.subscribe(function (message) {
      setReceiveSignal(message.data);
    });
    batteryTopic.subscribe(function (message) {
      setReceiveBattery(message.data);
    });
    carTempTopic.subscribe(function (message) {
      setReceiveCarTemp(message.data);
    });
  }
  if (isSub && !props.sub) {
    setIsSub(false);
    velTopic.unsubscribe();
    gearTopic.unsubscribe();
    signalTopic.unsubscribe();
    batteryTopic.unsubscribe();
    carTempTopic.unsubscribe();
  }

  return (
    <Grid item xs container direction="column" className={classes.side}>
      <Grid item xs>
        {receiveVel}km/h
      </Grid>
      <Grid item xs>
        <Gear gear={receiveGear} />
      </Grid>
      <Grid item xs>
        <SignalLights signal={receiveSignal} />
      </Grid>
      <Grid item xs>
        <Battery battery={receiveBattery} />
      </Grid>
      <Grid item xs className={classes.temp_text}>
        {receiveCarTemp}&deg;C
      </Grid>
      <Box sx={{ mb: "20rem" }} />
    </Grid>
  );
};

export default SideRos;
