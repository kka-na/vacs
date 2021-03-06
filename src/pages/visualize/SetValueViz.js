import React, { useState } from "react";
import ROSLIB from "roslib";
import { Grid, Button, TextField, Box } from "@material-ui/core";
import VizStyles from "./VizStyles";
import Mode from "../../components/RosTopics/Mode";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const ros = new ROSLIB.Ros({
  url: "ws://localhost:9090",
});

const modeTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/mode",
  messageType: "geometry_msgs/Vector3",
});
const lksTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/lks_state",
  messageType: "std_msgs/Bool",
});
const sbbTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/sbb_state",
  messageType: "std_msgs/Bool",
});
const btn1Topic = new ROSLIB.Topic({
  ros: ros,
  name: "/btn1_state",
  messageType: "std_msgs/Bool",
});
const btn2Topic = new ROSLIB.Topic({
  ros: ros,
  name: "/btn2_state",
  messageType: "std_msgs/Bool",
});
const btn3Topic = new ROSLIB.Topic({
  ros: ros,
  name: "/btn3_state",
  messageType: "std_msgs/Bool",
});
const btn4Topic = new ROSLIB.Topic({
  ros: ros,
  name: "/btn4_state",
  messageType: "std_msgs/Bool",
});
const swaCurTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/swa_current_val",
  messageType: "geometry_msgs/Vector3",
});
const swaComTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/swa_command_val",
  messageType: "geometry_msgs/Vector3",
});
const accCurTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/acc_current_val",
  messageType: "geometry_msgs/Vector3",
});
const accComTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/acc_command_val",
  messageType: "geometry_msgs/Vector3",
});
const latlngTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/lat_lng_val",
  messageType: "geometry_msgs/Vector3",
});
const rpyTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/rpy_val",
  messageType: "geometry_msgs/Vector3",
});

const SetValueViz = (props) => {
  const classes = VizStyles();
  const [receiveMode, setReceiveMode] = useState([]);
  const [isSub, setIsSub] = useState(false);
  const [btns, setBtns] = useState([]);
  const [lks, setLKS] = useState(false);
  const [sbb, setSBB] = useState(false);
  const [btn1, setBTN1] = useState(false);
  const [btn2, setBTN2] = useState(false);
  const [btn3, setBTN3] = useState(false);
  const [btn4, setBTN4] = useState(false);
  const [swaCur, setSWACur] = useState(0.0);
  const [swaCom, setSWACom] = useState(0.0);
  const [accCur, setACCCur] = useState(0.0);
  const [accCom, setACCCom] = useState(0.0);
  const [lat, setLat] = useState(0.0);
  const [lng, setLng] = useState(0.0);
  const [roll, setRoll] = useState(0.0);
  const [pitch, setPitch] = useState(0.0);
  const [yaw, setYaw] = useState(0.0);

  const swaCurChange = (event) => {
    setSWACur(parseFloat(event.target.value));
  };
  const swaComChange = (event) => {
    setSWACom(parseFloat(event.target.value));
  };
  const accCurChange = (event) => {
    setACCCur(parseFloat(event.target.value));
  };
  const accComChange = (event) => {
    setACCCom(parseFloat(event.target.value));
  };
  const latChange = (event) => {
    setLat(parseFloat(event.target.value));
  };
  const lngChange = (event) => {
    setLng(parseFloat(event.target.value));
  };
  const rollChange = (event) => {
    setRoll(parseFloat(event.target.value));
  };
  const pitchChange = (event) => {
    setPitch(parseFloat(event.target.value));
  };
  const yawChange = (event) => {
    setYaw(parseFloat(event.target.value));
  };

  const btnChange = (event, btn) => {
    setBtns(btn);
    if (isSub) {
      if (!lks && btn.includes("lks")) {
        lksTopic.publish({ data: true });
        setLKS(true);
      }
      if (!sbb && btn.includes("sbb")) {
        sbbTopic.publish({ data: true });
        setSBB(true);
      }
      if (!btn1 && btn.includes("btn1")) {
        btn1Topic.publish({ data: true });
        setBTN1(true);
      }
      if (!btn2 && btn.includes("btn2")) {
        btn2Topic.publish({ data: true });
        setBTN2(true);
      }
      if (!btn3 && btn.includes("btn3")) {
        btn3Topic.publish({ data: true });
        setBTN3(true);
      }
      if (!btn4 && btn.includes("btn4")) {
        btn4Topic.publish({ data: true });
        setBTN4(true);
      }
    }
    if (isSub) {
      if (lks && !btn.includes("lks")) {
        lksTopic.publish({ data: false });
        setLKS(false);
      }
      if (sbb && !btn.includes("sbb")) {
        sbbTopic.publish({ data: false });
        setSBB(false);
      }
      if (btn1 && !btn.includes("btn1")) {
        btn1Topic.publish({ data: false });
        setBTN1(false);
      }
      if (btn2 && !btn.includes("btn2")) {
        btn2Topic.publish({ data: false });
        setBTN2(false);
      }
      if (btn3 && !btn.includes("btn3")) {
        btn3Topic.publish({ data: false });
        setBTN3(false);
      }
      if (btn4 && !btn.includes("btn4")) {
        btn4Topic.publish({ data: false });
        setBTN4(false);
      }
    }
  };

  const pubClick = () => {
    if (isSub) {
      swaCurTopic.publish({ x: swaCur, y: 0.0, z: 0.0 });
      swaComTopic.publish({ x: swaCom, y: 0.0, z: 0.0 });
      accCurTopic.publish({ x: accCur, y: 0.0, z: 0.0 });
      accComTopic.publish({ x: accCom, y: 0.0, z: 0.0 });
      latlngTopic.publish({ x: lat, y: lng, z: 0.0 });
      rpyTopic.publish({ x: roll, y: pitch, z: yaw });
    }
  };

  if (!isSub && props.sub) {
    setIsSub(true);
    modeTopic.subscribe(function (message) {
      setReceiveMode(message.x);
    });
  }
  if (isSub && !props.sub) {
    setIsSub(false);
    modeTopic.unsubscribe();
  }

  return (
    <Grid item xs container direction="column" className={classes.set_value}>
      <Grid item xs>
        <Mode mode={receiveMode} />
      </Grid>
      <Box mt={1}></Box>
      <ToggleButtonGroup
        value={btns}
        onChange={btnChange}
        className={classes.toggle_button_group}
        fullWidth
      >
        <ToggleButton className={classes.toggle_button} value="lks">
          LKS
        </ToggleButton>
        <ToggleButton className={classes.toggle_button} value="btn1">
          BTN
        </ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        value={btns}
        onChange={btnChange}
        className={classes.toggle_button_group}
        fullWidth
      >
        <ToggleButton className={classes.toggle_button} value="sbb">
          SBB
        </ToggleButton>
        <ToggleButton className={classes.toggle_button} value="btn2">
          BTN
        </ToggleButton>
      </ToggleButtonGroup>
      {/* <ToggleButtonGroup
        value={btns}
        onChange={btnChange}
        className={classes.toggle_button_group}
        fullWidth
      >
        <ToggleButton className={classes.toggle_button} value="btn3">
          BTN
        </ToggleButton>
        <ToggleButton className={classes.toggle_button} value="btn4">
          BTN
        </ToggleButton>
      </ToggleButtonGroup> */}
      <Grid item xs className={classes.input_grid}>
        <TextField
          label="SWA(current)"
          onChange={swaCurChange}
          variant="outlined"
          className={classes.text_field}
        />
      </Grid>
      <Grid item xs className={classes.input_grid}>
        <TextField
          label="SWA(command)"
          onChange={swaComChange}
          variant="outlined"
          className={classes.text_field}
        />
      </Grid>
      <Grid item xs className={classes.input_grid}>
        <TextField
          label="ACC(current)"
          onChange={accCurChange}
          variant="outlined"
          className={classes.text_field}
        />
      </Grid>
      <Grid item xs className={classes.input_grid}>
        <TextField
          label="ACC(command)"
          onChange={accComChange}
          variant="outlined"
          className={classes.text_field}
        />
      </Grid>
      <Grid item xs className={classes.input_grid}>
        <TextField
          label="Latitude"
          onChange={latChange}
          variant="outlined"
          className={classes.text_field}
        />
        <TextField
          label="Longitude"
          onChange={lngChange}
          variant="outlined"
          className={classes.text_field}
        />
      </Grid>
      <Grid item xs className={classes.input_grid}>
        <TextField
          label="Roll"
          onChange={rollChange}
          variant="outlined"
          className={classes.text_field}
        />
        <TextField
          label="Ptich"
          onChange={pitchChange}
          variant="outlined"
          className={classes.text_field}
        />
        <TextField
          label="Yaw"
          onChange={yawChange}
          variant="outlined"
          className={classes.text_field}
        />
      </Grid>
      <Button
        className={classes.pub_button}
        onClick={pubClick}
        variant="contained"
        fullWidth
      >
        Set Value
      </Button>
    </Grid>
  );
};

export default SetValueViz;
