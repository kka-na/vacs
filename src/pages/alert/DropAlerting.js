import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";

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
  const [gifs, setGIFs] = useState();
  let lane_gif = "/gifs/lane.gif";
  let auto_gif = "gifs/autopilot.gif";
  let manual_gif = "gifs/manual.gif";
  let decrease_gif = "gifs/decrease.gif";
  let increase_gif = "gifs/increase.gif";

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
    } else {
      handleClose();
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
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}
    >
      <img src={gifs} alt="placeholder" />
    </Backdrop>
  );
};

export default DropAlerting;