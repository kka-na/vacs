import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Sound from "react-sound";

const DropWarning = ({ isRedWarn, isYellowWarn }) => {
  // setYellow
  window.soundManager.setup({ debugMode: false });
  const [open, setOpen] = useState(0);
  const [play, setPlay] = useState(Sound.status.STOPPED);
  const [gifs, setGIFs] = useState();
  let red_gif = "/gifs/red.gif";
  let yellow_gif = "/gifs/yellow.gif";

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
      setGIFs(yellow_gif);
      handleToggle();
    } else {
      handleClose();
    }
  }, [isYellowWarn]);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      // onClick={handleClose}
    >
      <img src={gifs} alt="placeholder" />
      <Sound url="/wavs/alarm.wav" playStatus={play} loop={true} />
    </Backdrop>
  );
};

export default DropWarning;
