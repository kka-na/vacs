import React, {useState} from "react";

import {Box, Grid} from "@material-ui/core"
import SideRos from "../../components/RosSub/SideRos";
import RosSubAlert from "../../components/RosSub/RosSubAlert";
import SetValueControl from "./SetValueControl"
import SetState from "./SetState";
import SideViz from "./SideViz";


const Control = () => {
    const [getSub, setSub] = useState(false);
    const addSub = (bool) => { setSub(bool);};

    return( 
        <Box m={3} mt={1} >
            <RosSubAlert addSub={addSub}/>
            <Box mt={1}></Box>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <SideRos sub={getSub}/>
                </Grid>
                <Grid item xs={2}>
                    <SetValueControl sub={getSub}/>
                </Grid>
                <Grid item xs={6}>
                    <SetState sub={getSub} />
                </Grid>
                <Grid item xs={3}>
                    <SideViz sub={getSub} />
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