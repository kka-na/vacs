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
  messageType: "std_msgs/Int8MultiArray",
});

const torTypeTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/tor_type",
  messageType: "std_msgs/Int8MultiArray",
});

const SetWarning = (props) => {
  const classes = AlertStyles();
  const [isSub, setIsSub] = useState(false);
  const [modes, setModes] = useState(0);
  const [warnState, setWarnState] = useState(0);
  const [isWarn, setIsWarn] = useState(false);
  const [isRedWarn, setIsRedWarn] = useState(false);
  const [isYellowWarn, setIsYellowWarn] = useState(false);
  const [isLaneWarn, setIsLaneWarn] = useState(false);
  const [isAutopilot, setIsAutopilot] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const [systemState, setSystemState] = useState([false, false, false]);

  var mode_num = 0;

  const modesChange = (event, mode) => {
    let mode_n;
    console.log(mode_num);
    if (mode === null) {
      mode_n = modes;
    } else if (Number(modes) === 0 && Number(mode) === 1 && isWarn) {
      // isWarn is true when sensor, system, extop has error
      setIsYellowWarn(true);
      mode_n = modes;
    } else {
      mode_n = mode;
    }
    if (mode_num !== mode_n) {
      if (Number(mode_num) === 0 && Number(mode_n) === 1) {
        console.log("auto");
        setIsAutopilot(true);
      }
      if (Number(mode_num) === 1 && Number(mode_n) === 0) {
        console.log("manual");
        setIsManual(true);
      }
      mode_num = mode_n;
    }

    setModes(mode_n);

    if (isSub) {
      modeSetTopic.publish({ data: mode_n });
    }

    setTimeout(() => {
      setIsAutopilot(false);
      setIsManual(false);
    }, 2000);
  };
  let warns = [
    { id: 1, value: false }, //Sensor Anomalies
    { id: 2, value: false }, //Emergy Stop
    { id: 3, value: false }, //System Anomalies
  ];

  function setElseMessage() {
    if (!warns[0].value) {
      if (warns[2].value) {
        setWarnState(warns[2].id);
      } else if (warns[1].value) {
        setWarnState(warns[1].id);
      }
    } else if (!warns[2].value) {
      if (warns[0].value) {
        setWarnState(warns[0].id);
      } else if (warns[1].value) {
        setWarnState(warns[1].id);
      }
    } else if (!warns[1].value) {
      if (warns[0].value) {
        setWarnState(warns[0].id);
      } else if (warns[2].value) {
        setWarnState(warns[2].id);
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
        setIsRedWarn(true);
      }
    } else {
      warns[msg_num - 1].value = false;
      if (warns.every((w) => w.value === false)) {
        setWarnState(0);
        warn_num = 0;
        setIsWarn(false);
        setIsYellowWarn(false);
        if (mode_num === 1) {
          setIsRedWarn(false);
        }
      } else {
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
      console.log(warn_num);
      if (mode === 0 && warn_num === 0) {
        setIsRedWarn(false);
      }
      setModes(Number(mode));
    });
    sensorStateTopic.subscribe(function (message) {
      warnDrop(message.data, 1);
    });
    systemStateTopic.subscribe(function (message) {
      let temp = message.data;
      warnDrop(temp, 3);
      setSystemState(temp);
    });
    emergyStopTopic.subscribe(function (message) {
      let emergy = Number(message.data);
      let temp = [];
      temp.push(emergy);
      warnDrop(temp, 2);
    });

    //New Added
    //if car on the lane ( 30% )
    laneWarnTopic.subscribe(function (message) {
      let temp = message.data;
      if (temp.includes(1)) {
        if (mode_num == 1) {
          setIsLaneWarn(true);
        }
      } else {
        setIsLaneWarn(false);
      }
    });
    //if TOR request ( normal : 0, intput : 1
    torTypeTopic.subscribe(function (message) {
      let temp = message.data;
      if (temp.includes(1)) {
        if (mode_num == 1) {
          setIsYellowWarn(true);
        }
      } else {
        setIsYellowWarn(false);
      }
    });
  }

  if (isSub && !props.sub) {
    setIsSub(false);
    modeTopic.unsubscribe();
    sensorStateTopic.unsubscribe();
    systemStateTopic.unsubscribe();
    emergyStopTopic.unsubscribe();
    laneWarnTopic.unsubscribe();
    torTypeTopic.unsubscribe();
  }

  return (
    <>
      <DropWarning isRedWarn={isRedWarn} isYellowWarn={isYellowWarn} />
      <DropAlerting
        isLaneWarn={isLaneWarn}
        isAutopilot={isAutopilot}
        isManual={isManual}
      />
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
            <ToggleButton
              className={classes.mode_toggle_button}
              value={1}
              disabled={isWarn}
            >
              Autopilot Mode
            </ToggleButton>
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
          <Container className={classes.map} maxWidth="lg">
            <DeckMap sub={props.sub} />
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default SetWarning;

/*


<ToggleButton className={classes.mode_toggle_button} value={2}>
  Test Mode
</ToggleButton>
<ToggleButton className={classes.mode_toggle_button} value={3}>
  License Mode
</ToggleButton> 

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
    else if(!bool){if(array.includes(value)){array = array.filter(item=>item!=value);} setWarns(array); }
    console.log(array);
};value);} setWarns(array);}
    else if(!bool){if(array.includes(value)){array = array.filter(item=>item!=value);} setWarns(array); }
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
