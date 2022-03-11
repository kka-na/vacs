import React, { useState } from "react";
import ROSLIB from "roslib";
import AlertStyles from "./AlertStyles";
import { Paper } from "@mui/material";

import Diag from "./Diag";

const ros = new ROSLIB.Ros({ url: "ws://localhost:9090" });
const sensorStateTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/sensor_state",
  messageType: "std_msgs/Int8MultiArray",
});

function SetDiag(props) {
  const classes = AlertStyles();
  const [isSub, setIsSub] = useState(false);
  const [error, setError] = useState([false, false, false, false, false]);
  const [trigger, setTrigger] = useState(0);

  if (!isSub && props.sub) {
    setIsSub(true);
    sensorStateTopic.subscribe(function (message) {
      let temp = error;
      message.data.map((element, index) => {
        temp[index] = element == 1 ? true : false;
      });
      setTrigger((trigger) => trigger + 1);
      setError(temp);
    });
  }
  if (isSub && !props.sub) {
    setIsSub(false);
    sensorStateTopic.unsubscribe();
  }

  const renderButtons = () => {
    if (props.sub) {
      return (
        <Paper className={classes.diag_paper}>
          <Diag x="32%" y="41%" name="Wide Camera" error={error[0]}></Diag>
          <Diag x="52.5%" y="41%" name="Narrow Camera" error={error[1]}></Diag>
          <Diag x="42.5%" y="53%" name="LiDAR" error={error[2]}></Diag>
          <Diag x="42.5%" y="68%" name="IMU" error={error[3]}></Diag>
          <Diag x="42.5%" y="83%" name="INS" error={error[4]}></Diag>
        </Paper>
      );
    } else {
      return (
        <Paper className={classes.diag_paper_undefined}>
          <Diag x="32%" y="41%" name="Wide Camera"></Diag>
          <Diag x="52.5%" y="41%" name="Narrow Camera"></Diag>
          <Diag x="42.5%" y="53%" name="LiDAR"></Diag>
          <Diag x="42.5%" y="68%" name="IMU"></Diag>
          <Diag x="42.5%" y="83%" name="INS"></Diag>
        </Paper>
      );
    }
  };

  return <>{renderButtons()}</>;
}

export default SetDiag;

{
  /* <Diag
  x="44.5%"
  y="38%"
  name="Camera1"
  error={error[0]}
  id={trigger}
></Diag> */
}
