import React, { useState } from "react";
import ROSLIB from "roslib";
import { Grid, Box, Container } from "@material-ui/core";
import AlertStyles from "./AlertStyles";
import DeckMap from "../../components/DeckMap/DeckMap";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import WarnMessage from "./WarnMessage/WarnMessage";
import SystemState from "./SystemState";
import SetTargetVelocity from "./SetTartgetVelocity/SetTargetVelocity";
import DropWarning from "./DropWarning";
import DropAlerting from "./DropAlerting";

const ros = new ROSLIB.Ros({ url: "ws://localhost:9090" });
const modeTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/mode",
  messageType: "std_msgs/Int8",
});
const modeSetTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/mode_set",
  messageType: "std_msgs/Int8",
});
const sensorStateTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/sensor_state",
  messageType: "std_msgs/Int8MultiArray",
});
const systemStateTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/system_state",
  messageType: "std_msgs/Int8MultiArray",
});
const emergyStopTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/estop",
  messageType: "std_msgs/Int8",
});

const laneWarnTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/lane_warn",
  messageType: "std_msgs/Int8",
});

const torRecordTopic = new ROSLIB.Topic({  // torRecordTopic
  ros: ros,
  name: "/tor_record", // "/tor_record",
  messageType: "std_msgs/Int8", // "std_msgs/Int8",
});

const SetWarning = (props) => {
  const classes = AlertStyles();
  const [isSub, setIsSub] = useState(false);
  const [modes, setModes] = useState(0);
  const [warnState, setWarnState] = useState(0);
  const [isWarn, setIsWarn] = useState(false);
  const [isRedWarn, setIsRedWarn] = useState(false);
  const [isBlueWarn, setIsBlueWarn] = useState(false);
  const [isLaneWarn, setIsLaneWarn] = useState(false);
  const [isAutopilot, setIsAutopilot] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const [systemState, setSystemState] = useState([false, false, false]);

  var mode_num = 0;

  const modesChange = (event, mode) => {
    let mode_n;
    if (mode === null) {
      mode_n = modes;
    } else {
      mode_n = mode;
    }

    if (Number(modes) === 0 && Number(mode_n) === 1) {
      setIsAutopilot(true);
    }
    if (Number(modes) === 1 && Number(mode_n) === 0) {
      setIsManual(true);
    }

    if (mode_num !== mode_n) {
      mode_num = mode_n;
    }

    setModes(mode_n);

    if (isSub) {
      modeSetTopic.publish({ data: mode_n });
    }

    setTimeout(() => {
      setIsAutopilot(false);
      setIsManual(false);
    }, 1000);
  };


  let warns = [
    { id: 1, value: false }, // Sensor Anomalies
    { id: 2, value: false }, // System Anomalies
    { id: 3, value: false }, // Emergy Stop
    { id: 4, value: false }, // Another Anomalies
    { id: 5, value: false }, // TOR Request
    { id: 6, value: false }, // Lane Deaprture
  ];


  function priorityMessage(msg_num){
    for(let i=0; i<6; i++){
      if (i===msg_num){
        continue;
      }
      else{
        if(warns[i].value){
          setWarnState(warns[i].id);
          break;
        }else{
          continue;
        }
      }
    }
  }
  function setElseMessage() {
    for(let i=0; i<6; i++){
      if(!warns[i].value){
        priorityMessage(i);
      }else{
        continue;
      }
    }
  }

  var warn_num = 0;

  const warnDrop = (array, msg_num) => {
    if (array.includes(1)) {
      setWarnState(msg_num);
      warn_num = msg_num;
      warns[msg_num - 1].value = true;
      if (warns.some((w) => w.value === true)) {
        //There are more than one error within sensor, system, estop
        setIsWarn(true);
      }
      if (mode_num === 1) {
        // There are any error and when in Autopilot mode
        if(msg_num ===1 || msg_num === 2 || msg_num === 6){
          setIsRedWarn(true);
        }else{
          setIsBlueWarn(true);
        }
        
      }
    } else {
      warns[msg_num - 1].value = false;
      if (warns.every((w) => w.value === false)) {
        
        setWarnState(0);
        warn_num = 0;
        setIsWarn(false);
        if (mode_num === 1) {
          if(msg_num ===1 || msg_num === 2 || msg_num === 6){
            setIsRedWarn(false);
          }else{
            setIsBlueWarn(false);
          }
        }
      } else if (mode_num === 0) {
        setElseMessage();
      }
    }
  };

  if (!isSub && props.sub) {
    setIsSub(true);

    modeTopic.subscribe(function (message) {
      let mode = parseInt(message.data);

      if (mode_num !== mode) {
        mode_num = mode;
      }

      if (mode === 0 && warn_num === 0) {
        setIsRedWarn(false);
        setIsBlueWarn(false);
      }
      setModes(Number(mode));
    });
    
    sensorStateTopic.subscribe(function (message) {
      warnDrop(message.data, 1);
    });
    systemStateTopic.subscribe(function (message) {
      let temp = message.data;
      warnDrop(temp, 2);
      setSystemState(temp);
    });
    emergyStopTopic.subscribe(function (message) {
      let emergy = Number(message.data);
      let temp = [];
      temp.push(emergy);
      warnDrop(temp, 3);
    });

    //if car on the lane ( 30% )
    laneWarnTopic.subscribe(function (message) {
      let temp = message.data;
      if (Number(temp) === 1) {
        if (mode_num === 1) {
          setIsLaneWarn(true);
        }
      }
      else if (Number(temp) === 2) {
        setIsLaneWarn(false);
        let arr = [];
        arr.push(1);
        warnDrop(arr, 6);
      }
      else {
        let arr = [];
        arr.push(0);
        warnDrop(arr, 6);
        setIsLaneWarn(false);
      }
    });

    //if TOR request ( normal : 0, intput : 1
    torRecordTopic.subscribe(function (message) {
      let tor = Number(message.data);
      let temp = [];
      if (tor != 0){
        tor = 1
      }
      temp.push(tor);
      warnDrop(temp, 5);
    });
  }

  if (isSub && !props.sub) {
    setIsSub(false);
    modeTopic.unsubscribe();
    sensorStateTopic.unsubscribe();
    systemStateTopic.unsubscribe();
    emergyStopTopic.unsubscribe();
    laneWarnTopic.unsubscribe();
    torRecordTopic.unsubscribe();
  }

  return (
    <>
      <DropWarning isRedWarn={isRedWarn} isBlueWarn={isBlueWarn} />
      <DropAlerting
        isLaneWarn={isLaneWarn}
        isAutopilot={isAutopilot}
        isManual={isManual}
      />
      <Grid item xs container spacing={2}>
        <Grid item xs={6}>
          <ToggleButtonGroup
            orientation="vertical"
            value={modes}
            onChange={modesChange}
            className={classes.mode_toggle_button_group}
            exclusive
            fullWidth
          >
            <ToggleButton className={classes.mode_toggle_button} value={0}>
              Manual Mode
            </ToggleButton>
            <Box sx={{ mb: "0.8rem" }}></Box>
            <ToggleButton
              className={classes.mode_toggle_button}
              value={1}
              disabled={isWarn}
            >
              Autopilot Mode
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={6}>
          <SetTargetVelocity sub={props.sub} />
        </Grid>
        <Grid item xs={12}>
          <WarnMessage type={warnState} />
          <SystemState state={systemState} />
        </Grid>
      </Grid>
    </>
  );
};

export default SetWarning;
