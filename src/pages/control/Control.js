import React, {useState} from "react";

import {Box, Card, CardMedia, makeStyles, Grid} from "@material-ui/core"
import { Container} from "@material-ui/core";
import ContainerDimensions from "react-container-dimensions";
import {StaticMap} from 'react-map-gl';

import DeckGL from '@deck.gl/react';
import { PointCloudLayer } from '@deck.gl/layers'
import { COORDINATE_SYSTEM, MapView } from '@deck.gl/core';
import {PCDLoader} from '@loaders.gl/pcd';

import RosSubViz from "../../components/RosSub/RosSubViz";

import lidar from '../../0.pcd';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoia2thLW5hIiwiYSI6ImNrcmJ2dGR0NDR3cWkzMHJ1d3R5eW1uOXoifQ.pDGlZ7BuCc1qd4cCHqnu0w';
const MY_MAP_STYLE = 'mapbox://styles/kka-na/ckrbxk1fd0z5z18ljxdswgu1s';

const useStyles = makeStyles((theme) => ({
    box1: {
        maxwidth: "calc(100% - 720px)",
        height: "800px",
    },

    card: {
        maxWidth: 720,
        backgroundColor: '#292c37',
        color: '#fffff3',
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    
}));


const INITIAL_VIEW_STATE = {
    longitude: 126.6569095,
    latitude: 37.45039321,
    position: [0,0,1],
    pitch: 45,
    bearing: -45, //heading 
    zoom: 19,
};

const Control = () => {
    const classes = useStyles();
    const [receiveMsg, setReceiveMsg] = useState([]);
    const [receiveImg, setReceiveImg] = useState([]);

    const addROS_msg = (msg) => { setReceiveMsg(msg);};
    const addROS_img = (img) => { setReceiveImg(img);};

    const layer = new PointCloudLayer({
        id: 'pointcloud_data',
        data: lidar,
        coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
        coordinateOrigin: [126.656955, 37.450585],
        modelMatrix: 
            [-0.906, 0.422, 0,  0, 
             -0.422, -0.906, 0,  0, 
             0, 0, 1, 0,
             0, 0, 0, 1],

        radiusPixel: 5,
        pickable: true,
        getNormal:[-1,1,0],
        getColor: [49,255,200],
        opacity: 1.0,
        pointSize: 1,
        loaders: [PCDLoader]
    });


    return( 
        <Box m={3} mt={1} >
            <RosSubViz addROS_msg={addROS_msg} addROS_img={addROS_img}/>

            <Box mt={1}></Box>
            <Grid container spacing={1}>
                <Grid item xs={8}>
                    <Container className={classes.box1}>
                        <ContainerDimensions>
                            <DeckGL
                                initialViewState={INITIAL_VIEW_STATE}
                                controller={true} 
                                layers={[layer]}
                            > 
                            <MapView>
                                    <StaticMap mapStyle={MY_MAP_STYLE} mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
                                </MapView>
                               
                            </DeckGL>
                        </ContainerDimensions>
                    </Container>
                </Grid>
                <Grid item xs={4} sm container>
                    <Grid item xs container direction="column">
                        <Grid item xs>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.media}
                                    image={receiveImg.src}
                                />
                            </Card> 
                        </Grid>
                    </Grid>
                </Grid>
            </Grid> 

        </Box>
    );
};

export default Control;


//                                          
                    

// _getModel(gl) {
//     // a triangle that minimally cover the unit circle
//     const positions = [];
//     for (let i = 0; i < 3; i++) {
//       const angle = (i / 3) * Math.PI * 2;
//       positions.push(Math.cos(angle) * 2, Math.sin(angle) * 2, 0);
//     }
/*
 <View id = "map">
                                    <StaticMap mapStyle={MY_MAP_STYLE} mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
                                </View>
*/

//     return new Model(
//       gl,
//       Object.assign({}, this.getShaders(), {
//         id: this.props.id,
//         geometry: new Geometry({
//           drawMode: GL.TRIANGLES,
//           attributes: {
//             positions: new Float32Array(positions)
//           }
//         }),
//         isInstanced: true
//       })
//     );
//   }