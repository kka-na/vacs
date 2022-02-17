import React, {useState} from "react";
import ROSLIB from 'roslib'
import {Grid, TextField, Box} from '@material-ui/core'
import ControlStyles from './ControlStyles.ts'
import {ToggleButton, ToggleButtonGroup} from '@mui/material'

const SetValueControl =(props) =>{
    const classes = ControlStyles();
    const [modes, setModes] = useState([]);
    const [btns, setBtns] = useState([]);
    const [values, setValues] = useState([]);
    const [isSub, setIsSub] = useState(false);
    
    const modesChange = (event, mode) =>{
        setModes(mode);
    }
    const valuesChange = (event, value)=>{
        setValues(value);
    }
    const btnChange = (event, btn) =>{
        setBtns(btn);
    }
    if(!isSub && props.sub){
        setIsSub(true);
    }
    if(isSub && !props.sub){
        setIsSub(false);
    }
    return(
        <Grid item xs container direction="column" className={classes.set_value} spacing={1}>
            <ToggleButtonGroup exclusive orientation="vertical" value={modes} onChange={modesChange} className={classes.mode_toggle_button_group} fullWidth>
                <ToggleButton className={classes.mode_toggle_button} value={0}>Manual Mode</ToggleButton>
                <ToggleButton className={classes.mode_toggle_button} value={1}>Autopilot Mode</ToggleButton> 
                <ToggleButton className={classes.mode_toggle_button} value={2}>Test Mode</ToggleButton>
                <ToggleButton className={classes.mode_toggle_button} value={3}>License Mode</ToggleButton> 
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
            <Box mt={1}></Box>
            <ToggleButtonGroup orientation="vertical" value={btns} onChange={btnChange} className={classes.toggle_button_group} fullWidth>
                <ToggleButton className={classes.toggle_button} value='apply'>Apply</ToggleButton>
                <ToggleButton className={classes.toggle_button} value='aeb'>AEB</ToggleButton> 
            </ToggleButtonGroup>
        </Grid>
    )
}

export default SetValueControl;