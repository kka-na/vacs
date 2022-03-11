import React from "react";

export default function Mode(props) {
  let mode;
  if (props.mode === 0) {
    //manual
    mode = "Manual";
  } else if (props.mode === 1) {
    //autopilot
    mode = "Autopilot";
  } else if (props.mode === 2) {
    //test
    mode = "Test";
  } else if (props.mode === 3) {
    //license
    mode = "License";
  } else {
    mode = "-";
  }
  return <div>Driving with {mode} Mode</div>;
}
