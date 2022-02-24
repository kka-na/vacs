import ContainerDimensions from "react-container-dimensions";
import { DeckGL } from "@deck.gl/react";
import { FlyToInterpolator, MapView } from "@deck.gl/core";
import ROSLIB from "roslib";
import { makeStyles } from "@material-ui/core";
import Map, { Marker } from 'react-map-gl';
import { useEffect, useState } from "react";
import car_marker from './car.png';

const MAPBOX_ACCESS_TOKEN = 'pk.'+process.env.REACT_APP_MAPBOX_KEY;
const MY_MAP_STYLE = 'mapbox://styles/kka-na/ckrbxk1fd0z5z18ljxdswgu1s';

const ros = new ROSLIB.Ros({ url: 'ws://localhost:9090'});
const gpsTopic = new ROSLIB.Topic({ros: ros, name:'/gps', messageType:'geometry_msgs/Vector3'});

const Styles = makeStyles((theme)=>({
    marker:{
        backgroundColor: "#85def5",
        width: '0.8rem',
        height: '2rem',
        border: 'none',
    }
}));

export default function DeckMap(props){
    const classes = Styles();
    const [isSub, setIsSub] = useState(false);
    const [position, setPosition] = useState({latitude: 37.450585, longitude: 126.656955});
    const [viewport, setViewport] = useState({latitude: 37.450585, longitude: 126.656955, pitch: 45,bearing: -65, zoom: 17,});
    if(!isSub && props.sub){
        setIsSub(true);
        gpsTopic.subscribe(function(message){
            setPosition({latitude:message.x, longitude: message.y});
            setViewport({latitude:message.x, longitude: message.y,pitch: viewport.pitch,bearing: -65, zoom: viewport.zoom,});
        });
    }
    if(isSub && !props.sub){
        setIsSub(false);
        gpsTopic.unsubscribe();
    }

    return(
        <ContainerDimensions>
            <Map {...viewport} mapStyle={MY_MAP_STYLE} mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} 
                onViewportChange={(viewport)=>{setViewport(viewport);}}
                transitionDuration={400}
                transitionInterpolator={new FlyToInterpolator()}
            >
                <Marker {...position}>
                    <img src={car_marker} width="50px" height="50px" />
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