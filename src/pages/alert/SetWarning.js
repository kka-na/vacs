import React, { useState } from "react";
import ROSLIB from "roslib";
import { Grid, Box, Container } from "@material-ui/core";
import AlertStyles from "./AlertStyles";
import DeckMap from "./DeckMap";
import {
  CardContent,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import WarnMessage from "./WarnMessage/WarnMessage";
import SystemState from "./SystemState";
import SetTargetVelocity from "./SetTartgetVelocity/SetTargetVelocity";

const ros = new ROSLIB.Ros({ url: "ws://localhost:9090" });
const modeTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/mode",
  messageType: "geometry_msgs/Vector3",
});
const modeSetTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/mode_set",
  messageType: "geometry_msgs/Vector3",
});
const diagTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/diag",
  messageType: "std_msgs/Int8MultiArray",
});

const SetWarning = (props) => {
  const classes = AlertStyles();
  const [isSub, setIsSub] = useState(false);
  const [modes, setModes] = useState();
  const [warnState, setWarnState] = useState(0);
  const [systemState, setSystemState] = useState([false, false, false]);
  //const [trigger, setTrigger] = useState(0);
  const modesChange = (event, mode) => {
    let mode_num = parseInt(mode);
    setModes(mode_num);
    if (isSub) {
      modeSetTopic.publish({ x: mode_num, y: 0, z: 0 });
    }
  };

  if (!isSub && props.sub) {
    setIsSub(true);
    modeTopic.subscribe(function (message) {
      setModes(message.x);
    });

    diagTopic.subscribe(function (message) {
      if (message.data.includes(1)) {
        setWarnState(1);
      }
    });
  }

  if (isSub && !props.sub) {
    setIsSub(false);
    modeTopic.unsubscribe();
    diagTopic.unsubscribe();
  }

  return (
    <>
      <Grid item xs container spacing={2}>
        <Grid item xs={4}>
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
            <ToggleButton className={classes.mode_toggle_button} value={1}>
              Autopilot Mode
            </ToggleButton>

            {/* <ToggleButton className={classes.mode_toggle_button} value={2}>
              Test Mode
            </ToggleButton>
            <ToggleButton className={classes.mode_toggle_button} value={3}>
              License Mode
            </ToggleButton> */}
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={4}>
          <SetTargetVelocity sub={props.sub} />
        </Grid>
        <Grid item xs={4}>
          <WarnMessage type={warnState} />
          <SystemState state={systemState} />
        </Grid>
        <Grid item xs={12}>
          <Container className={classes.map} fullWidth>
            <DeckMap sub={props.sub} />
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default SetWarning;

/*
import Warns from "./Warns";
const btnStateTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/btn_state",
  messageType: "std_msgs/Int8MultiArray",
});
const [warns, setWarns] = useState([false,false,false,false,false,false,false,false,false,false,false,false,]);
<Warns state={warns} id={trigger} />
btnStateTopic.subscribe(function (message) {
  let temp = message.data;
  if (temp.includes(1)) {
    setWarnState(3);
  }
  setWarns(temp);
  setTrigger((trigger) => trigger + 1);
});
btnStateTopic.unsubscribe();

const warningTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/warning_state",
  messageType: "geometry_msgs/Vector3",
});
warningTopic.subscribe(function (message) {
      setWarningState(message.x);
    });
warningTopic.unsubscribe();

const btn1StateTopic = new ROSLIB.Topic({ros: ros, name: '/btn1_state', messageType: 'std_msgs/Bool'});
const btn2StateTopic = new ROSLIB.Topic({ros: ros, name: '/btn2_state', messageType: 'std_msgs/Bool'});
const btn3StateTopic = new ROSLIB.Topic({ros: ros, name: '/btn3_state', messageType: 'std_msgs/Bool'});
const btn4StateTopic = new ROSLIB.Topic({ros: ros, name: '/btn4_state', messageType: 'std_msgs/Bool'});
const btn5StateTopic = new ROSLIB.Topic({ros: ros, name: '/btn5_state', messageType: 'std_msgs/Bool'});
const btn6StateTopic = new ROSLIB.Topic({ros: ros, name: '/btn6_state', messageType: 'std_msgs/Bool'});
const [warns, setWarns] = useState([]);

const funcState = (bool, value) =>{
    let array = warns;let array = warns;
    if(bool){if(!array.includes(value)){array.push(value);} setWarns(array);}
    else if(!bool){if(array.includes(value)){array = array.filter(item=>item!==value);} setWarns(array); }
    console.log(array);
};value);} setWarns(array);}
    else if(!bool){if(array.includes(value)){array = array.filter(item=>item!==value);} setWarns(array); }
    console.log(array);
};

btn1StateTopic.subscribe(function(message){funcState(message.data, 'btn1')});
btn2StateTopic.subscribe(function(message){funcState(message.data, 'btn2')});
btn3StateTopic.subscribe(function(message){funcState(message.data, 'btn3')});
btn4StateTopic.subscribe(function(message){funcState(message.data, 'btn4')});
btn5StateTopic.subscribe(function(message){funcState(message.data, 'btn5')});
btn6StateTopic.subscribe(function(message){funcState(message.data, 'btn6')});

btn1StateTopic.unsubscribe();
btn2StateTopic.unsubscribe();
btn3StateTopic.unsubscribe();
btn4StateTopic.unsubscribe();
btn5StateTopic.unsubscribe();
btn6StateTopic.unsubscribe();

<ToggleButtonGroup value={warns} className={classes.warn_toggle_button_group} exclusive fullWidth>
    <ToggleButton className={classes.warn_toggle_button} value='btn1'>BTN</ToggleButton>
    <ToggleButton className={classes.warn_toggle_button} value='btn2'>BTN</ToggleButton> 
    <ToggleButton className={classes.warn_toggle_button} value='btn3'>BTN</ToggleButton>
    <ToggleButton className={classes.warn_toggle_button} value='btn4'>BTN</ToggleButton>
    <ToggleButton className={classes.warn_toggle_button} value='btn5'>BTN</ToggleButton>
    <ToggleButton className={classes.warn_toggle_button} value='btn6'>BTN</ToggleButton>  
</ToggleButtonGroup>

*/
