import React, {useEffect, useState} from "react";
import { Grid, ToggleButton, ToggleButtonGroup} from '@mui/material';
import ControlStyles from './ControlStyles.ts'

function ToggleSets(element){
    const classes = ControlStyles();
    const getToggles = () =>{
        const toggleList = element.toggles.map((name) => {
            return(<ToggleButton className={classes.scenario_toggle_button} value={name}>{name}</ToggleButton>)
        });
        return toggleList;
    }
    return(
        <ToggleButtonGroup exclusive={element.exclusive} value={element.toggleValues} onChange={element.toggleChange} className={classes.scenario_toggle_button_group} fullWidth>
            {getToggles()}
        </ToggleButtonGroup>
    );
}

export default ToggleSets

/*
<ToggleButton className={classes.scenario_toggle_button} value={1}>1</ToggleButton>
<ToggleButton className={classes.scenario_toggle_button} value={2}>2</ToggleButton> 
<ToggleButton className={classes.scenario_toggle_button} value={3}>3</ToggleButton>
<ToggleButton className={classes.scenario_toggle_button} value={4}>4</ToggleButton> 
<ToggleButton className={classes.scenario_toggle_button} value={5}>5</ToggleButton>
<ToggleButton className={classes.scenario_toggle_button} value={6}>6</ToggleButton> 
    */