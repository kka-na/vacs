import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Sound from "react-sound";

const DropWarning = ({ isRedWarn, isBlueWarn, isAEBWarn }) => {
  window.soundManager.setup({ debugMode: false });
  const [open, setOpen] = useState(0);
  const [play, setPlay] = useState(Sound.status.STOPPED);
  const [gifs, setGIFs] = useState();
  const [wavs, setWAVs] = useState();
  const [show, setShow] = useState(true);
  let red_gif = "/gifs/red.gif";
  let blue_gif = "/gifs/blue.gif";
  let aeb_gif = "/gifs/aeb.gif";
  let warn_wav = "/wavs/alarm.wav";
  let aeb_wav = "/wavs/aeb.wav"

  const handleClose = () => {
    setOpen(false);
    setPlay(Sound.status.STOPPED);
  };

  const handleToggle = () => {
    setOpen(!open);
    setPlay(Sound.status.PLAYING);
  };

  useEffect(() => {
    if (isRedWarn) {
      setGIFs(red_gif);
      setWAVs(warn_wav)
      handleToggle();
    } else {
      handleClose();
    }
    setTimeout(()=>{
      setShow(false)
    },5000);
  }, [isRedWarn]);

  useEffect(() => {
    if (isBlueWarn) {
      setGIFs(blue_gif);
      setWAVs(warn_wav)
      handleToggle();
    } else {
      handleClose();
    }
    setTimeout(()=>{
      setShow(false)
    },5000);
  }, [isBlueWarn]);

  useEffect(()=>{
    if(isAEBWarn){
      setGIFs(aeb_gif);
      setWAVs(aeb_wav)
      handleToggle();
    }else{
      handleClose();
    }
    setTimeout(()=>{
      setShow(false)
    },5000);
  }, [isAEBWarn]);

  return (
    <Backdrop
      sx={{ backgroundColor: "rgba(0, 0, 0, 0.3)", color: "#fff",zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      // onClick={handleClose}
    >
      <Sound url={wavs} playStatus={play} loop={true} />
      <img src={gifs} display={show? 'inherit' : 'none'} alt="placeholder" />
    </Backdrop>
  );
};

export default DropWarning;
