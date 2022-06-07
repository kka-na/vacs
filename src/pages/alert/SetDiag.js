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
const velTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/can_vel",
  messageType: "std_msgs/Int8",
});

function SetDiag(props) {
  const classes = AlertStyles();
  const [isSub, setIsSub] = useState(false);
  const [error, setError] = useState([true, true, true, true, true]);
  const [trigger, setTrigger] = useState(0);
  const [redCarClass, setRedCarClass] = useState(classes.diag_paper_undefined);

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
    velTopic.subscribe(function (message) {
      if (message.data > 0) {
        setRedCarClass(classes.diag_paper);
      } else if (message.data <= 0) {
        setRedCarClass(classes.diag_paper_stop);
      }
    });
  }
  if (isSub && !props.sub) {
    setIsSub(false);
    sensorStateTopic.unsubscribe();
    velTopic.unsubscribe();
    setRedCarClass(classes.diag_paper_undefined);
  }

  const renderButtons = () => {
    if (props.sub) {
      return (
        <Paper className={redCarClass}>
          <Diag x="32%" y="41%" name="Wide Camera" error={error[0]}></Diag>
          <Diag x="52.5%" y="41%" name="Narrow Camera" error={error[1]}></Diag>
          <Diag x="42.5%" y="53%" name="LiDAR" error={error[2]}></Diag>
          <Diag x="42.5%" y="68%" name="GPS" error={error[3]}></Diag>
          <Diag x="42.5%" y="83%" name="INS" error={error[4]}></Diag>
          <Diag x="41%" y="1%" name="RADAR" error={error[5]}></Diag>
        </Paper>
      );
    } else {
      return (
        <Paper className={redCarClass}>
          <Diag x="32%" y="41%" name="Wide Camera"></Diag>
          <Diag x="52.5%" y="41%" name="Narrow Camera"></Diag>
          <Diag x="42.5%" y="53%" name="LiDAR"></Diag>
          <Diag x="42.5%" y="68%" name="GPS"></Diag>
          <Diag x="42.5%" y="83%" name="INS"></Diag>
          <Diag x="41%" y="1%" name="RADAR"></Diag>
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
