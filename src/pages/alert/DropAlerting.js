import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Sound from "react-sound";


const DropAlerting = ({
  isLaneWarn,
  isAutopilot,
  isManual,
  isDecrease,
  isIncrease,
}) => {
  // setYellow
  window.soundManager.setup({ debugMode: false });
  const [open, setOpen] = useState(0);
  const [play, setPlay] = useState(Sound.status.STOPPED);
  const [gifs, setGIFs] = useState();
  let lane_gif = "/gifs/lane.gif";
  let auto_gif = "/gifs/autopilot.gif";
  let manual_gif = "/gifs/manual.gif";
  let decrease_gif = "/gifs/decrease.gif";
  let increase_gif = "/gifs/increase.gif";

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (isLaneWarn) {
      setGIFs(lane_gif);
      handleToggle();
      setPlay(Sound.status.PLAYING);
    } else {
      handleClose();
      setPlay(Sound.status.STOPPED);
    }
  }, [isLaneWarn]);

  useEffect(() => {
    if (isAutopilot) {
      setGIFs(auto_gif);
      handleToggle();
    } else {
      handleClose();
    }
  }, [isAutopilot]);

  useEffect(() => {
    if (isManual) {
      setGIFs(manual_gif);
      handleToggle();
    } else {
      handleClose();
    }
  }, [isManual]);

  useEffect(() => {
    if (isDecrease) {
      setGIFs(decrease_gif);
      handleToggle();
    } else {
      handleClose();
    }
  }, [isDecrease]);

  useEffect(() => {
    if (isIncrease) {
      setGIFs(increase_gif);
      handleToggle();
    } else {
      handleClose();
    }
  }, [isIncrease]);

  return (
    <Backdrop
      sx={{ backgroundColor: "rgba(0, 0, 0, 0.3)", color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}
    >
      <img src={gifs} alt="placeholder" />
      <Sound url="/wavs/alert.wav" playStatus={play}/>
    </Backdrop>
  );
};

export default DropAlerting;
