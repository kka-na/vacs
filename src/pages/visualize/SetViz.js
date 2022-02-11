/* global kakao */
import React,{useState} from "react";
import ROSLIB from "roslib";
import VizStyles from "./VizStyles.ts";
import { Grid, Card, CardMedia, Container } from "@material-ui/core";

import { Map, MapMarker, MapTypeId } from "react-kakao-maps-sdk";

const ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090'
});

const cam0Topic = new ROSLIB.Topic({
    ros: ros,
    name: '/usb_cam/image_raw/compressed',
    messageType: 'sensor_msgs/CompressedImage'
});

const gpsTopic = new ROSLIB.Topic({
    ros: ros,
    name: '/gps',
    messageType:'geometry_msgs/Twist'
});


const SetViz = (props) => {
    const classes = VizStyles();
    const [receiveCam0, setReceiveCam0] = useState([]);
    const [isSub, setIsSub] = useState(false);
    const [position, setPosition] = useState({
        center:{lat:37.450585, lng: 126.656955},
        isPanto: false,
    });
    
    if(!isSub && props.sub){
        setIsSub(true);
        cam0Topic.subscribe(function(message){
            let image = new Image();
            image.src = "data:image/jpg;base64," + message.data;
            setReceiveCam0(image);
        });
        gpsTopic.subscribe(function(message){
            setPosition({
                center:{lat:message.linear.x, lng: message.linear.y},
                isPanto: true,
            });
        });
    }

    if(isSub && !props.sub){
        setIsSub(false);
        cam0Topic.unsubscribe();
        gpsTopic.unsubscribe();
    }

    return(
        <div>
            <Grid item xs container spacing={1}>
                <Grid item xs={4}>
                    <Card className={classes.card}>
                        <CardMedia component="img" className={classes.media} image={receiveCam0.src}/>
                    </Card> 
                </Grid>
                <Grid item xs={4}>
                    <Card className={classes.card}>
                        <CardMedia component="img" className={classes.media} image={receiveCam0.src}/>
                    </Card> 
                </Grid>
                <Grid item xs={4}>
                    <Card className={classes.card}>
                        <CardMedia component="img" className={classes.media} image={receiveCam0.src}/>
                    </Card> 
                </Grid>
                <Grid item xs={4}>
                    <Map center={position.center} isPanto={position.isPanto} style={{height:"0",paddingBottom:'133.33%'}} level={3}>
                        <MapMarker position={position.center}/>
                        <MapTypeId type={kakao.maps.MapTypeId.TRAFFIC}/>
                    </Map>
                </Grid>
                <Grid item xs={8}>
                    <Card className={classes.card_lidar}>
                        <CardMedia component="img"/>
                    </Card>
                </Grid>
            </Grid>
        </div>
        
    )
}

export default SetViz

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