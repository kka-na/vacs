/* global kakao */
import React, { useState } from "react";
import ROSLIB from "roslib";
import ControlStyles from "./ControlStyles.js";
import { Grid, CardMedia, Box } from "@material-ui/core";
// import { Map, MapMarker, MapTypeId } from "react-kakao-maps-sdk";
import DeckMap from "../../components/DeckMap/DeckMap";

const ros = new ROSLIB.Ros({ url: "ws://localhost:9090" });
const cam0Topic = new ROSLIB.Topic({
  ros: ros,
  name: "/img_compressed",
  messageType: "sensor_msgs/CompressedImage",
});
const gpsTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/gps",
  messageType: "geometry_msgs/Vector3",
});

const SideViz = (props) => {
  const classes = ControlStyles();
  const [receiveCam0, setReceiveCam0] = useState([]);
  const [isSub, setIsSub] = useState(false);
  const [position, setPosition] = useState({
    center: { lat: 37.450585, lng: 126.656955 },
    isPanto: false,
  });

  if (!isSub && props.sub) {
    setIsSub(true);
    cam0Topic.subscribe(function (message) {
      let image = new Image();
      image.src = "data:image/jpg;base64," + message.data;
      setReceiveCam0(image);
    });
    gpsTopic.subscribe(function (message) {
      setPosition({
        center: { lat: message.x, lng: message.y },
        isPanto: false,
      });
    });
  }

  if (isSub && !props.sub) {
    setIsSub(false);
    cam0Topic.unsubscribe();
    gpsTopic.unsubscribe();
  }

  return (
    <Grid item xs container direction="column" spacing={2}>
      <CardMedia
        component="img"
        className={classes.media}
        image={receiveCam0.src}
      />
      <Box className={classes.map} flex>
        <DeckMap sub={props.sub} />
      </Box>
    </Grid>
  );
};

export default SideViz;

/*
<Map center={position.center} isPanto={position.isPanto} style={{height:"0",paddingBottom:'100%'}} level={3}>
    <MapMarker position={position.center}/>
    <MapTypeId type={kakao.maps.MapTypeId.TRAFFIC}/>
</Map>
    */
