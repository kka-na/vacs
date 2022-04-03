import React, { useState } from "react";
import ROSLIB from "roslib";
import { Box, Grid } from "@material-ui/core";
import SharedStyles from "./SharedStyles";
import Gear from "../RosTopics/Gear";
import SignalLights from "../RosTopics/SignalLight";
import Battery from "../RosTopics/Battery";
import GPSAccuracy from "../RosTopics/GPSAccuracy";

const ros = new ROSLIB.Ros({ url: "ws://localhost:9090" });
// const velTopic = new ROSLIB.Topic({
//   ros: ros,
//   name: "/can_vel",
//   messageType: "std_msgs/Int8",
// });
// const gearTopic = new ROSLIB.Topic({
//   ros: ros,
//   name: "/can_gear",
//   messageType: "std_msgs/Int8",
// });


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

const gpsAccTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/gps_accuracy",
  messageType: "geometry_msgs/Point",
});
const canRecordTopic = new ROSLIB.Topic({
  ros: ros,
  name : "/can_record",
  messageType : "std_msgs/Int16MultiArray",
})

const SideRos = (props) => {
  const classes = SharedStyles();
  const [receiveVel, setReceiveVel] = useState([]);
  const [receiveGear, setReceiveGear] = useState([]);
  // const [receiveSignal, setReceiveSignal] = useState([]);
  // const [receiveBattery, setReceiveBattery] = useState([]);
  // const [receiveCarTemp, setReceiveCarTemp] = useState([]);
  const [isSub, setIsSub] = useState(false);
  const [gpsAccuracy, setGPSAccuracy] = useState([0, 0]);

  if (!isSub && props.sub) {
    setIsSub(true);
    // velTopic.subscribe(function (message) {
    //   setReceiveVel(message.data);
    // });
    // gearTopic.subscribe(function (message) {
    //   setReceiveGear(message.data);
    // });
    // signalTopic.subscribe(function (message) {
    //   setReceiveSignal(message.data);
    // });
    // batteryTopic.subscribe(function (message) {
    //   setReceiveBattery(message.data);
    // });
    // carTempTopic.subscribe(function (message) {
    //   setReceiveCarTemp(message.data);
    // });
    canRecordTopic.subscribe(function(message){
      setReceiveVel(message.data[5]);
      setReceiveGear(message.data[3]);
    });
    gpsAccTopic.subscribe(function (message) {
      setGPSAccuracy(message);
    });
  }
  if (isSub && !props.sub) {
    setIsSub(false);
    // velTopic.unsubscribe();
    // gearTopic.unsubscribe();
    // signalTopic.unsubscribe();
    // batteryTopic.unsubscribe();
    // carTempTopic.unsubscribe();
    gpsAccTopic.unsubscribe();
  }

  return (
    <Grid item xs container direction="column" className={classes.side}>
      <Grid item xs className={classes.vel_default}>
        {receiveVel} km/h
      </Grid>
      <Box sx={{ mb: "2rem" }}></Box>
      <Grid item xs className={classes.gear_default}>
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
      <Grid item xs className={classes.gps_acc}>
        <GPSAccuracy state={gpsAccuracy} />
      </Grid>
    </Grid>
  );
};

export default SideRos;
