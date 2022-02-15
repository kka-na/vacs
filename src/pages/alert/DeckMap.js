import ContainerDimensions from "react-container-dimensions";
import { DeckGL } from "@deck.gl/react";
import { FlyToInterpolator, MapView } from "@deck.gl/core";
import { makeStyles } from "@material-ui/core";
import Map, { Marker } from 'react-map-gl';
import { useState } from "react";
import car_marker from './car.png';

const MAPBOX_ACCESS_TOKEN = 'pk.'+process.env.REACT_APP_MAPBOX_KEY;
const MY_MAP_STYLE = 'mapbox://styles/kka-na/ckrbxk1fd0z5z18ljxdswgu1s';

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
    const [viewport, setViewport] = useState({
        longitude: 126.6569095,
        latitude: 37.45039321,
        pitch: 45,
        position: [0,0,1],
        bearing: -65, //heading 
        zoom: 17,
    });
    return(
        <ContainerDimensions>
            <Map {...viewport} mapStyle={MY_MAP_STYLE} mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} 
                onViewportChange={(viewport)=>{
                    setViewport(viewport);
                }}
                transitionDuration={400}
                transitionInterpolator={new FlyToInterpolator()}
            >
                <Marker latitude={37.4503921} longitude={126.656905}>
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