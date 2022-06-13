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

// const unstableLaneTopic = new ROSLIB.Topic({
//   ros: ros,
//   name: "/unstable_lane",
//   messageType: "std_msgs/Bool",
// });
const laneWarnTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/lane_warn",
  messageType: "std_msgs/Int8",
});

const canSwitchTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/can_switch",
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
    if (mode === null) {
      mode_n = modes;
    } else if (Number(modes) === 0 && Number(mode) === 1 && isWarn) {
      // isWarn is true when sensor, system, extop has error
      setIsYellowWarn(true);
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
    { id: 1, value: false }, //Sensor Anomalies
    { id: 2, value: false }, //Emergy Stop
    { id: 3, value: false }, //System Anomalies
    {id:4, value:false},
    {id:5, value:false},
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
      if (msg_num != 2 && array[2] != 1) {
        warns[msg_num - 1].value = true;
      }
      if (warns.some((w) => w.value === true)) {
        //There are more than one error within sensor, system, estop
        setIsWarn(true);
      }
      if (mode_num === 1) {
        // There are any error and when in Autopilot mode
        if (msg_num != 2 && array[2] != 1) {
          setIsRedWarn(true);
        }
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

    // //New Added
    // unstableLaneTopic.subscribe(function (message) {
    //   let ulane = Number(message.data);
    //   let temp = [];
    //   temp.push(ulane);
    //   warnDrop(temp, 3);
    // });

    //if car on the lane ( 30% )
    laneWarnTopic.subscribe(function (message) {
      let temp = message.data;
      if (Number(temp) === 1) {
        if (mode_num === 1) {
          setIsLaneWarn(true);
        }
      } else {
        setIsLaneWarn(false);
      }
    });
    //if TOR request ( normal : 0, intput : 1
    canSwitchTopic.subscribe(function (message) {
      warnDrop(message.data, 5);
    });
  }

  if (isSub && !props.sub) {
    setIsSub(false);
    modeTopic.unsubscribe();
    sensorStateTopic.unsubscribe();
    systemStateTopic.unsubscribe();
    emergyStopTopic.unsubscribe();
    //unstableLaneTopic.unsubscribe();
    laneWarnTopic.unsubscribe();
    canSwitchTopic.unsubscribe();
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
