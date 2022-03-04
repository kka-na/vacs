import React, { useState } from "react";
import ROSLIB from "roslib";
import AlertStyles from "./AlertStyles";
import Backdrop from "@mui/material/Backdrop";
import Sound from "react-sound";
import { Paper } from "@mui/material";

import Diag from "./Diag";

const ros = new ROSLIB.Ros({ url: "ws://localhost:9090" });
const diagTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/diag",
  messageType: "std_msgs/Int8MultiArray",
});

function SetDiag(props) {
  const classes = AlertStyles();
  const [isSub, setIsSub] = useState(false);
  const [open, setOpen] = useState(0);
  const [play, setPlay] = useState(Sound.status.STOPPED);
  const [error, setError] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [trigger, setTrigger] = useState(0);

  const handleClose = () => {
    setOpen(false);
    setPlay(Sound.status.STOPPED);
  };
  const handleToggle = () => {
    setOpen(!open);
    setPlay(Sound.status.PLAYING);
  };

  if (!isSub && props.sub) {
    setIsSub(true);
    diagTopic.subscribe(function (message) {
      let temp = error;
      message.data.map((element, index) => {
        temp[index] = element == 1 ? true : false;
      });
      if (temp.includes(true)) {
        handleToggle();
      } else {
        handleClose();
      }
      setError(temp);
      setTrigger((trigger) => trigger + 1);
    });
  }
  if (isSub && !props.sub) {
    setIsSub(false);
    diagTopic.unsubscribe();
  }

  return (
    <Paper className={classes.diag_paper}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <img src="gifs/red.gif" alt="placeholder" />
        <Sound url="/wavs/alarm.wav" playStatus={play} loop={true} />
      </Backdrop>
      <Diag
        x="44.5%"
        y="38%"
        name="Camera1"
        error={error[0]}
        id={trigger}
      ></Diag>
      <Diag x="30%" y="43%" name="Camera2" error={error[1]}></Diag>
      <Diag x="59%" y="43%" name="Camera3" error={error[2]}></Diag>
      <Diag x="44.5%" y="55%" name="LiDAR" error={error[3]}></Diag>
      <Diag x="44.5%" y="70%" name="Radar" error={error[4]}></Diag>
      <Diag x="44.5%" y="85%" name="INS" error={error[5]}></Diag>
    </Paper>
  );
}

export default SetDiag;
