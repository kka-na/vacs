import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Sound from "react-sound";

const DropMessage = ({ isRedWarn, isYellowWarn }) => {
  // setYellow
  window.soundManager.setup({ debugMode: false });
  const [open, setOpen] = useState(0);
  const [play, setPlay] = useState(Sound.status.STOPPED);
  const [gifs, setGIFs] = useState();
  let red_gif = "/gifs/red.gif";
  let blue_gif = "/gifs/blue.gif";

  const handleClose = () => {
    setOpen(false);
    setPlay(Sound.status.STOPPED);
  };
  const handleToggle = () => {
    setOpen(!open);
    setPlay(Sound.status.PLAYING);
    //setYellow(false);
  };

  useEffect(() => {
    if (isRedWarn) {
      setGIFs(red_gif);
      handleToggle();
    } else {
      handleClose();
    }
  }, [isRedWarn]);

  useEffect(() => {
    if (isYellowWarn) {
      setGIFs(blue_gif);
      handleToggle();
    } else {
      handleClose();
    }
  }, [isYellowWarn]);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}
    >
      <img src={gifs} alt="placeholder" />
      <Sound url="/wavs/alarm.wav" playStatus={play} loop={true} />
    </Backdrop>
  );
};

export default DropMessage;
