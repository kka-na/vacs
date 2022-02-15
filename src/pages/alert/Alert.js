import React, {useState} from "react";
import {Box, Grid} from "@material-ui/core"
import RosSubAlert from "../../components/RosSub/RosSubAlert";
import SideRos from "../../components/RosSub/SideRos";
import SetWarning from "./SetWarning";

const Alert = () => {
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
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={7}>
                    <SetWarning sub={getSub}/>
                </Grid>
            </Grid> 
        </Box>
    );
};

export default Alert;