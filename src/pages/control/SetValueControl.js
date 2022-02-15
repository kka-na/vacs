import React, {useState} from "react";
import ROSLIB from 'roslib'
import {Grid, TextField, Box} from '@material-ui/core'
import ControlStyles from './ControlStyles.ts'
import {ToggleButton, ToggleButtonGroup} from '@mui/material'
import { projectPosition } from "@deck.gl/core/dist/es5/shaderlib/project/project-functions";

const SetValueControl =(props) =>{
    const classes = ControlStyles();
    const [modes, setModes] = useState([]);
    const [btns, setBtns] = useState([]);
    const [values, setValues] = useState([]);
    
    const modesChange = (event, mode) =>{
        setModes(mode);
    }
    const valuesChange = (event, value)=>{
        setValues(value);
    }
    if(props.sub){

    }
    if(!props.sub){

    }
    return(
        <Grid item xs container direction="column" className={classes.set_value}>
            <ToggleButtonGroup value={modes} onChange={modesChange} className={classes.toggle_button_group} fullWidth>
                <ToggleButton className={classes.toggle_button} value={0}>Manual Mode</ToggleButton>
                <ToggleButton className={classes.toggle_button} value={1}>Autopilot Mode</ToggleButton> 
                <ToggleButton className={classes.toggle_button} value={2}>Test Mode</ToggleButton>
                <ToggleButton className={classes.toggle_button} value={3}>License Mode</ToggleButton> 
            </ToggleButtonGroup>
            <Grid item xs className={classes.input_grid}>
                <TextField label="Speed" onChange={valuesChange} variant="outlined" className={classes.text_field}/>
            </Grid>
            <Grid item xs className={classes.input_grid}>
                <TextField label="Steering" onChange={valuesChange} variant="outlined" className={classes.text_field}/>
            </Grid>
            <Grid item xs className={classes.input_grid}>
                <TextField label="ESP Speed" onChange={valuesChange} variant="outlined" className={classes.text_field}/>
            </Grid>
            <Grid item xs className={classes.input_grid}>
                <TextField label="Kp" onChange={valuesChange} variant="outlined" className={classes.text_field}/>
                <TextField label="Ki" onChange={valuesChange} variant="outlined" className={classes.text_field}/>
                <TextField label="Kd" onChange={valuesChange} variant="outlined" className={classes.text_field}/>
            </Grid>
            <ToggleButtonGroup value={btns} onChange={btnChange} className={classes.toggle_button_group} fullWidth>
                <ToggleButton className={classes.toggle_button} value='lks'>LKS</ToggleButton>
                <ToggleButton className={classes.toggle_button} value='btn1'>BTN</ToggleButton> 
            </ToggleButtonGroup>
        </Grid>
    )
}