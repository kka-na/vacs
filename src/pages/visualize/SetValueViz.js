import React, { useState } from 'react'
import ROSLIB from "roslib"
import { Grid, Button, TextField, styled, Box} from '@material-ui/core'
import VizStyles from './VizStyles.ts'
import Mode from '../../components/RosTopics/Mode'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'

const ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090'
});

const modeTopic = new ROSLIB.Topic({
    ros: ros,
    name: '/mode',
    messageType: 'geometry_msgs/Twist'
});

const lksTopic = new ROSLIB.Topic({
    ros: ros,
    name: '/lks_state',
    messageType: 'std_msgs/Bool'
});


const SetValueViz = (props) => {
    const classes = VizStyles();
    const [receiveMode, setReceiveMode] = useState([]);
    const [btns, setBtns] = useState([]);
    const [swa, setSWA] = useState(0);

    const handleChange = (event) =>{
        setSWA(event.target.value);
    }

    const btnChange = (event, btn) => {
        setBtns(btn);
        if(btn == "lks"){
            lksTopic.publish(true);
        }
    }

    if(props.sub){
        modeTopic.subscribe(function(message){
            setReceiveMode(message.linear.x);
        });
    }
    if(!props.sub){
        modeTopic.unsubscribe();
    }

    return(
        <Grid item xs container direction="column" className={classes.set_value}>
            <Grid item xs>
                <Mode mode={receiveMode}/>
            </Grid>
            <Box mt={1}></Box>
            <ToggleButtonGroup value={btns} onChange={btnChange} className={classes.toggle_button_group} fullWidth>
                <ToggleButton className={classes.toggle_button} value='lks'>LKS</ToggleButton>
                <ToggleButton className={classes.toggle_button} value='btn1'>BTN</ToggleButton> 
            </ToggleButtonGroup>
            <ToggleButtonGroup value={btns} onChange={btnChange} className={classes.toggle_button_group} fullWidth>
                <ToggleButton className={classes.toggle_button} value='sbb'>SBB</ToggleButton>
                <ToggleButton className={classes.toggle_button} value='btn2'>BTN</ToggleButton> 
            </ToggleButtonGroup>
            <ToggleButtonGroup value={btns} onChange={btnChange} className={classes.toggle_button_group} fullWidth>
                <ToggleButton className={classes.toggle_button} value='btn3'>BTN</ToggleButton>
                <ToggleButton className={classes.toggle_button} value='btn4'>BTN</ToggleButton> 
            </ToggleButtonGroup>
            <Grid item xs className={classes.input_grid}>
                <TextField label="SWA(current)" onChange={handleChange} variant="outlined" className={classes.text_field}/>
                <TextField label="SWA(command)" onChange={handleChange} variant="outlined" className={classes.text_field}/>
            </Grid>
            <Grid item xs className={classes.input_grid}>
                <TextField label="ACC(current)" onChange={handleChange} variant="outlined" className={classes.text_field}/>
                <TextField label="ACC(command)" onChange={handleChange} variant="outlined" className={classes.text_field}/>
            </Grid>
            <Grid item xs className={classes.input_grid}>
                <TextField label="Latitude" onChange={handleChange} variant="outlined" className={classes.text_field}/>
                <TextField label="Longitude" onChange={handleChange} variant="outlined" className={classes.text_field}/>
            </Grid>
            <Grid item xs className={classes.input_grid}>
                <TextField label="Roll" onChange={handleChange} variant="outlined" className={classes.text_field}/>
                <TextField label="Ptich" onChange={handleChange} variant="outlined" className={classes.text_field}/>
                <TextField label="Yaw" onChange={handleChange} variant="outlined" className={classes.text_field}/>
            </Grid>
        </Grid>
    )
}

export default SetValueViz