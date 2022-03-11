/* global kakao */
import React, { useState } from "react";
import ROSLIB from "roslib";
import VizStyles from "./VizStyles";
import { Grid, CardMedia, Card, Box } from "@material-ui/core";
// import { Map, MapMarker, MapTypeId } from "react-kakao-maps-sdk";
import PointCloudView from "../../components/PointCloud/PointCloudView";
import DeckMap from "../../components/DeckMap/DeckMap";

const ros = new ROSLIB.Ros({ url: "ws://localhost:9090" });

const cam0Topic = new ROSLIB.Topic({
  ros: ros,
  name: "/gmsl_camera/dev/video0/compressed",
  messageType: "sensor_msgs/CompressedImage",
});
const cam1Topic = new ROSLIB.Topic({
  ros: ros,
  name: "/gmsl_camera/dev/video1/compressed",
  messageType: "sensor_msgs/CompressedImage",
});
const gpsTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/gps",
  messageType: "geometry_msgs/Vector3",
});

const SetViz = (props) => {
  const classes = VizStyles();
  const [receiveCam0, setReceiveCam0] = useState([]);
  const [receiveCam1, setReceiveCam1] = useState([]);
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
    cam1Topic.subscribe(function (message) {
      let image = new Image();
      image.src = "data:image/jpg;base64," + message.data;
      setReceiveCam1(image);
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
    cam1Topic.unsubscribe();
    gpsTopic.unsubscribe();
  }

  return (
    <div>
      <Grid item xs container spacing={1}>
        <Grid item xs={4}>
          <CardMedia
            component="img"
            className={classes.media}
            image={receiveCam0.src}
          />
        </Grid>
        <Grid item xs={4}>
          <Box className={classes.map} flex>
            <DeckMap sub={props.sub} />
          </Box>
        </Grid>
        {/*<Grid item xs={4}>
           <CardMedia
            component="img"
            className={classes.media}
            image={receiveCam0.src}
          /> 
        </Grid>*/}
        <Grid item xs={4}>
          <CardMedia
            component="img"
            className={classes.media}
            image={receiveCam1.src}
          />
        </Grid>
        <Grid item xs={12} className={classes.card_lidar}>
          <PointCloudView sub={props.sub} />
        </Grid>
      </Grid>
    </div>
  );
};

export default SetViz;

/*
<Map
            center={position.center}
            isPanto={position.isPanto}
            style={{ height: "0", paddingBottom: "100%" }}
            level={3}
          >
            <MapMarker position={position.center} />
            <MapTypeId type={kakao.maps.MapTypeId.TRAFFIC} />
          </Map>

*/

//<Container className={classes.map}>
//<ContainerDimensions>
//    <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true}>
//        <MapView controller={false}>
//            <StaticMap mapStyle={MY_MAP_STYLE} mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}/>
//        </MapView>
//    </DeckGL>
//</ContainerDimensions>
//</Container>

/*
<Map center={{lat:receiveLat, lng:receiveLong}} >
    <MapMarker position={{lat:receiveLat, lng:receiveLong}}></MapMarker>
</Map>
*/
