import ContainerDimensions from "react-container-dimensions";
import ROSLIB from "roslib";
import Map, { Marker } from "react-map-gl";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1Ijoia2thLW5hIiwiYSI6ImNrcmJ2dGR0NDR3cWkzMHJ1d3R5eW1uOXoifQ.pDGlZ7BuCc1qd4cCHqnu0w"; //+ process.env.REACT_APP_MAPBOX_KEY;
const MY_MAP_STYLE = "mapbox://styles/kka-na/ckrbxk1fd0z5z18ljxdswgu1s";

const ros = new ROSLIB.Ros({ url: "ws://localhost:9090" });
const gpsTopic = new ROSLIB.Topic({
  ros: ros,
  name: "/gps",
  messageType: "geometry_msgs/Vector3",
});

const Styles = makeStyles((theme) => ({
  marker: {
    backgroundColor: "#C81F30",
    width: "1.8rem",
    height: "1.8rem",
    borderRadius: "50%",
  },
}));

export default function DeckMap(props) {
  const classes = Styles();
  const [isSub, setIsSub] = useState(false);
  const [position, setPosition] = useState({
    latitude: 37.450585,
    longitude: 126.656955,
  });
  const [viewport, setViewport] = useState({
    latitude: 37.450585,
    longitude: 126.656955,
    pitch: 45,
    bearing: -65,
    zoom: 17,
  });
  if (!isSub && props.sub) {
    setIsSub(true);
    gpsTopic.subscribe(function (message) {
      setPosition({ latitude: message.x, longitude: message.y });
      setViewport({
        latitude: message.x,
        longitude: message.y,
        pitch: viewport.pitch,
        bearing: -65,
        zoom: viewport.zoom,
      });
    });
  }
  if (isSub && !props.sub) {
    setIsSub(false);
    gpsTopic.unsubscribe();
  }

  return (
    <ContainerDimensions>
      <Map
        {...viewport}
        mapStyle={MY_MAP_STYLE}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        <Marker {...position}>
          <div className={classes.marker}></div>
          {/* <img src="/pngs/red_car.png" width="25px" height="50px" /> */}
        </Marker>
      </Map>
    </ContainerDimensions>
  );
}

/*
<ContainerDimensions>
    <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true}>
        <MapView>
            <StaticMap mapStyle={MY_MAP_STYLE} mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
        </MapView>
    </DeckGL>
</ContainerDimensions>
*/
