import React, { useEffect, useState } from "react";
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

  useEffect(() => {
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
  }, [props.sub]);

  return (
    <Paper className={classes.diag_paper}>
      <Diag x="35%" y="43%" name="Wide Camera" error={error[0]}></Diag>
      <Diag x="54%" y="43%" name="Narrow Camera" error={error[1]}></Diag>
      <Diag x="44.5%" y="55%" name="LiDAR" error={error[2]}></Diag>
      <Diag x="44.5%" y="70%" name="IMU" error={error[3]}></Diag>
      <Diag x="44.5%" y="85%" name="INS" error={error[4]}></Diag>
    </Paper>
  );
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
