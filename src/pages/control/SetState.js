import React, {useState} from "react";
import ROSLIB from 'roslib'
import {Grid, TextField, Box, Container, Paper} from '@material-ui/core'
import ControlStyles from './ControlStyles.ts'
import {Card, ToggleButton, ToggleButtonGroup} from '@mui/material'
import { LineChart, Line, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";

const ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090'
});

const velocityStateTopic = new ROSLIB.Topic({
    ros:ros,
    name: '/velocity_state',
    messageType: 'geometry_msgs/Vector3',
});

const SetState = (props)=>{
    const classes = ControlStyles();
    const [isSub, setIsSub] = useState(false);
    const [scenarios, setScenarios] = useState([]);
    const [controls, setControls] = useState([]);
    const [plans, setPlans] = useState([]);
    const [pstates, setPstates] = useState([]);
    const [velocityStates, setVelocityStates] = useState([]);

    const scenariosChange = (event, scenario) =>{
        setScenarios(scenario);
    }
    const controlsChange = (event, control) => {
        setControls(control);
    }
    const plansChange = (event, plan) => {
        setPlans(plan);
    }

    if(!isSub && props.sub){
        setIsSub(true);
        const velocity_array = [{time: 0.0, current: 0, target: 0,}];
        let count = 0;
        velocityStateTopic.subscribe(function(message){
            count += 1;
            if(count >= 10){
                velocity_array.splice(0,1);
            }
            velocity_array.push({
                time: message.x/100,
                current: message.y,
                target: message.z,});
            setVelocityStates(velocity_array);
        });
    }
    if(isSub && !props.sub){
        setIsSub(false);
        velocityStateTopic.unsubscribe();
        setVelocityStates([]);                 
    }

    return(
        <Grid item xs container direction="column" spacing={1}>
            <Grid item xs={12} className={classes.state_text}>
                <div>Scenario</div>
            </Grid>
            <ToggleButtonGroup exclusive value={scenarios} onChange={scenariosChange} className={classes.scenario_toggle_button_group} fullWidth>
                <ToggleButton className={classes.scenario_toggle_button} value={1}>1</ToggleButton>
                <ToggleButton className={classes.scenario_toggle_button} value={2}>2</ToggleButton> 
                <ToggleButton className={classes.scenario_toggle_button} value={3}>3</ToggleButton>
                <ToggleButton className={classes.scenario_toggle_button} value={4}>4</ToggleButton> 
                <ToggleButton className={classes.scenario_toggle_button} value={5}>5</ToggleButton>
                <ToggleButton className={classes.scenario_toggle_button} value={6}>6</ToggleButton> 
            </ToggleButtonGroup>
            <Grid item xs={12} className={classes.state_text}>
                <div>Control</div>
            </Grid>
            <ToggleButtonGroup value={controls} onChange={controlsChange} className={classes.scenario_toggle_button_group} fullWidth>
                <ToggleButton className={classes.scenario_toggle_button} value='acc'>ACC</ToggleButton>
                <ToggleButton className={classes.scenario_toggle_button} value='eps'>EPS</ToggleButton> 
                <ToggleButton className={classes.scenario_toggle_button} value='ignore'>Ignore</ToggleButton>
                <ToggleButton className={classes.scenario_toggle_button} value='-'>-</ToggleButton> 
                <ToggleButton className={classes.scenario_toggle_button} value='-'>-</ToggleButton>
                <ToggleButton className={classes.scenario_toggle_button} value='-'>-</ToggleButton> 
            </ToggleButtonGroup>
            <Grid item xs={12} className={classes.state_text}>
                <div>Behaviour Plan</div>
            </Grid>
            <ToggleButtonGroup value={plans} onChange={plansChange} className={classes.scenario_toggle_button_group} fullWidth>
                <ToggleButton className={classes.scenario_toggle_button} value='stop'>Stop</ToggleButton>
                <ToggleButton className={classes.scenario_toggle_button} value='stop_at'>Stop at</ToggleButton> 
                <ToggleButton className={classes.scenario_toggle_button} value='keep_lane'>Keep Lane Cruise</ToggleButton>
                <ToggleButton className={classes.scenario_toggle_button} value='prep_lc_left'>Prepare LC Left</ToggleButton> 
                <ToggleButton className={classes.scenario_toggle_button} value='prep_lc_right'>Prepare LC Right</ToggleButton>
                <ToggleButton className={classes.scenario_toggle_button} value='lc_left'>LC Left</ToggleButton> 
                <ToggleButton className={classes.scenario_toggle_button} value='lc_right'>LC Right</ToggleButton>
            </ToggleButtonGroup>
            <Grid item xs container >
                <Grid item xs={6}>
                    <Grid item xs={12} className={classes.state_text}>
                        <div>Velocity Plan</div>
                    </Grid>
                    <ResponsiveContainer width="100%" height={320}>
                        <LineChart data={velocityStates} margin={{top: 10, left:-30, right:20,}}>
                            <XAxis dataKey="time" color="#fff" domain={[0, 1.0]}/>
                            <YAxis color="#fff" domain={[20, 60]}/>
                            <Legend />
                            <Line type="basis" dataKey="current" stroke="#6569d7" dot={false}/>
                            <Line type="basis" dataKey="target" stroke="#86def5" dot={false}/>
                        </LineChart>
                    </ResponsiveContainer>
                </Grid>
                <Grid item xs={6}>
                    <Grid item xs={12} className={classes.state_text}>
                        <div>Planner State</div>
                    </Grid>
                    <ToggleButtonGroup value={pstates} className={classes.pstate_toggle_button_group} fullWidth>
                        <ToggleButton className={classes.pstate_toggle_button} value='ready'>Ready</ToggleButton>
                        <ToggleButton className={classes.pstate_toggle_button} value='global_plan'>Global Planning</ToggleButton> 
                    </ToggleButtonGroup>
                    <ToggleButtonGroup value={pstates} className={classes.pstate_toggle_button_group} fullWidth>
                        <ToggleButton className={classes.pstate_toggle_button} value='behaviour_plan'>Behaviour Planning</ToggleButton>
                        <ToggleButton className={classes.pstate_toggle_button} value='velocity_plan'>Velocity Planning</ToggleButton> 
                    </ToggleButtonGroup>
                    <ToggleButtonGroup value={pstates} className={classes.pstate_toggle_button_group} fullWidth>
                        <ToggleButton className={classes.pstate_toggle_button} value='waypoint_plan'>Waypoint Planning</ToggleButton>
                        <ToggleButton className={classes.pstate_toggle_button} value='both_plan'>Both Planning</ToggleButton> 
                    </ToggleButtonGroup>
                    <ToggleButtonGroup value={pstates} className={classes.pstate_toggle_button_group} fullWidth>
                        <ToggleButton className={classes.pstate_toggle_button} value='-'>-</ToggleButton>
                        <ToggleButton className={classes.pstate_toggle_button} value='-'>-</ToggleButton> 
                    </ToggleButtonGroup>
                    <ToggleButtonGroup value={pstates} className={classes.pstate_toggle_button_group} fullWidth>
                        <ToggleButton className={classes.pstate_toggle_button} value='-'>-</ToggleButton>
                        <ToggleButton className={classes.pstate_toggle_button} value='-'>-</ToggleButton> 
                    </ToggleButtonGroup>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default SetState;