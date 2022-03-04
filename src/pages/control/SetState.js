import React, {useState} from "react";
import ROSLIB from 'roslib'
import {Grid } from '@material-ui/core'
import ControlStyles from './ControlStyles.ts'
import {ToggleButton, ToggleButtonGroup} from '@mui/material'
import VelState from "./VelState";
import ToggleSets from "./ToggleSets";
import PlannerState from "./PlannerState";


const ros = new ROSLIB.Ros({  url: 'ws://localhost:9090'});

const velocityStateTopic = new ROSLIB.Topic({ ros:ros, name: '/velocity_state', messageType: 'geometry_msgs/Vector3',});
const scenarioTopic = new ROSLIB.Topic({ros: ros, name: '/scenario', messageType:'geometry_msgs/Vector3'});
const accTopic = new ROSLIB.Topic({ros:ros, name:'/acc_state', messageType:'std_msgs/Bool'});
const epsTopic = new ROSLIB.Topic({ros:ros, name:'/eps_state', messageType:'std_msgs/Bool'});
const ignoreTopic = new ROSLIB.Topic({ros:ros, name:'/ignore_state', messageType:'std_msgs/Bool'});
const blankTopic = new ROSLIB.Topic({ros:ros, name:'/blank_state', messageType:'std_msgs/Bool'});
const stopTopic = new ROSLIB.Topic({ros:ros, name:'/stop_state', messageType:'std_msgs/Bool'});
const stopAtTopic = new ROSLIB.Topic({ros:ros, name:'/stop_at_state', messageType:'std_msgs/Bool'});
const keepLaneTopic = new ROSLIB.Topic({ros:ros, name:'/keep_lane_state', messageType:'std_msgs/Bool'});
const prepLeftTopic = new ROSLIB.Topic({ros:ros, name:'/prep_left_state', messageType:'std_msgs/Bool'});
const prepRightTopic = new ROSLIB.Topic({ros:ros, name:'/prep_right_state', messageType:'std_msgs/Bool'});
const lcLeftTopic = new ROSLIB.Topic({ros:ros, name:'/lc_left_state', messageType:'std_msgs/Bool'});
const lcRightTopic = new ROSLIB.Topic({ros:ros, name:'/lc_right_state', messageType:'std_msgs/Bool'});
const readyTopic = new ROSLIB.Topic({ros:ros, name:'/ready_state', messageType:'std_msgs/Bool'});
const gPlanTopic = new ROSLIB.Topic({ros:ros, name:'/g_plan_state', messageType:'std_msgs/Bool'});
const bPlanTopic = new ROSLIB.Topic({ros:ros, name:'/b_plan_state', messageType:'std_msgs/Bool'});
const vPlanTopic = new ROSLIB.Topic({ros:ros, name:'/v_plan_state', messageType:'std_msgs/Bool'});
const wPlanTopic = new ROSLIB.Topic({ros:ros, name:'/w_plan_state', messageType:'std_msgs/Bool'});
const bothPlanTopic = new ROSLIB.Topic({ros:ros, name:'/both_plan_state', messageType:'std_msgs/Bool'});
const emptyTopic = new ROSLIB.Topic({ros:ros, name:'/empty_state', messageType:'std_msgs/Bool'});

const SetState = (props)=>{
    const classes = ControlStyles();
    const [isSub, setIsSub] = useState(false);
    const [scenarios, setScenarios] = useState([]);
    const scenarioToggles = [1,2,3,4,5,6];
    const [controls, setControls] = useState([]);
    const controlToggles = ['acc', 'eps', 'ignore', 'blank', 'blank', 'blank'];
    const [acc, setACC] = useState(false);
    const [eps, setEps] = useState(false);
    const [ignore, setIgnore] = useState(false);
    const [blank, setBlank] = useState(false);
    const [stop, setStop] = useState(false);
    const [stopAt, setStopAt] = useState(false);
    const [keepLane, setKeepLane] = useState(false);
    const [prepLeft, setPrepLeft] = useState(false);
    const [prepRight, setPrepRight] = useState(false);
    const [lcLeft, setLcLeft] = useState(false);
    const [lcRight, setLcRight] = useState(false);
    const [plans, setPlans] = useState([]);
    const planToggles = (['stop', 'stopAt', 'keepLane', 'prepLeft', 'prepRight', 'lcLeft', 'lcRight']);
    const [pstates, setPstates] = useState([]);
    const [velocityStates, setVelocityStates] = useState([{time: 0.0, current: 0, target: 0}]);

    const scenariosChange = (event, scenario) =>{
        const scenario_num = parseInt(scenario);
        setScenarios(scenario);
        if(isSub){
            scenarioTopic.publish({x:scenario_num, y:0, z:0});
        }
    }

    const controlsChange = (event, control) => {
        setControls(control);
        if(isSub){
            if(!acc && control.includes('acc')){accTopic.publish({data:true}); setACC(true);};
            if(!eps && control.includes('eps')){epsTopic.publish({data:true}); setEps(true);};
            if(!ignore && control.includes('ignore')){ignoreTopic.publish({data:true}); setIgnore(true);};
            if(!blank && control.includes('blank')){blankTopic.publish({data:true}); setBlank(true);};
        }
        if(isSub){
            if(acc && !control.includes('acc')){accTopic.publish({data:false}); setACC(false);};
            if(eps && !control.includes('eps')){epsTopic.publish({data:false}); setEps(false);};
            if(ignore && !control.includes('ignore')){ignoreTopic.publish({data:false}); setIgnore(false);};
            if(blank && !control.includes('blank')){blankTopic.publish({data:false}); setBlank(false);};
        }
    }
    const plansChange = (event, plan) => {
        setPlans(plan);
        if(isSub){
            if(!stop && plan.includes('stop')){stopTopic.publish({data:true}); setStop(true);};
            if(!stopAt && plan.includes('stopAt')){stopAtTopic.publish({data:true}); setStopAt(true);};
            if(!keepLane && plan.includes('keepLane')){keepLaneTopic.publish({data:true}); setKeepLane(true);};
            if(!prepLeft && plan.includes('prepLeft')){prepLeftTopic.publish({data:true}); setPrepLeft(true);};
            if(!prepRight && plan.includes('prepRight')){prepRightTopic.publish({data:true}); setPrepRight(true);};
            if(!lcLeft && plan.includes('lcLeft')){lcLeftTopic.publish({data:true}); setLcLeft(true);};
            if(!lcRight && plan.includes('lcRight')){lcRightTopic.publish({data:true}); setLcRight(true);};
        }
        if(isSub){
            if(stop && !plan.includes('stop')){stopTopic.publish({data:false}); setStop(false);};
            if(stopAt && !plan.includes('stopAt')){stopAtTopic.publish({data:false}); setStopAt(false);};
            if(keepLane && !plan.includes('keepLane')){keepLaneTopic.publish({data:false}); setKeepLane(false);};
            if(prepLeft && !plan.includes('prepLeft')){prepLeftTopic.publish({data:false}); setPrepLeft(false);};
            if(prepRight && !plan.includes('prepRight')){prepRightTopic.publish({data:false}); setPrepRight(false);};
            if(lcLeft && !plan.includes('lcLeft')){lcLeftTopic.publish({data:false}); setLcLeft(false);};
            if(lcRight && !plan.includes('lcRight')){lcRightTopic.publish({data:false}); setLcRight(false);};
        }
    }

    const funcPStates = (bool, value) => {
        let array = pstates;
        if(bool){ if(!array.includes(value)){array.push(value);} setPstates(array); }
        else if(!bool){if(array.includes(value)){array = array.filter(item=>item!==value);} setPstates(array); }
    }
    
    const funcVelStates = (array, count, data) => {
        if(count >= 10){ array.splice(0,1); }
        array.push({ time: data.x/100, current: data.y, target: data.z,});
        setVelocityStates(array);
    }
    if(!isSub && props.sub){
        setIsSub(true);
        let count = 0;
        let velocity_array = [{time: 0.0, current: 0, target: 0,}];
        velocityStateTopic.subscribe(function(message){
            count += 1;
            funcVelStates(velocity_array, count, message);
        });
        readyTopic.subscribe(function(message){ funcPStates(message.data, 'ready'); });
        gPlanTopic.subscribe(function(message){ funcPStates(message.data, 'g_plan'); });
        bPlanTopic.subscribe(function(message){ funcPStates(message.data, 'b_plan'); });
        vPlanTopic.subscribe(function(message){ funcPStates(message.data, 'v_plan'); });
        wPlanTopic.subscribe(function(message){ funcPStates(message.data, 'w_plan'); });
        bothPlanTopic.subscribe(function(message){ funcPStates(message.data, 'both_plan'); });
        emptyTopic.subscribe(function(message){ funcPStates(message.data, 'empty'); });
    }

    if(isSub && !props.sub){
        setIsSub(false);
        velocityStateTopic.unsubscribe();
        readyTopic.unsubscribe();
        gPlanTopic.unsubscribe();
        bPlanTopic.unsubscribe();
        vPlanTopic.unsubscribe();
        wPlanTopic.unsubscribe();
        bothPlanTopic.unsubscribe();
        emptyTopic.unsubscribe();
        setVelocityStates([]);                 
    }

    return(
        <Grid item xs container direction="column" spacing={1}>
            <Grid item xs={12} className={classes.state_text}>
                <div>Scenario</div>
            </Grid>
            <ToggleSets exclusive={true} toggleValues={scenarios} toggleChange={scenariosChange} toggles={scenarioToggles}/>
            <Grid item xs={12} className={classes.state_text}>
                <div>Control</div>
            </Grid>
            <ToggleSets exclusive={false} toggleValues={controls} toggleChange={controlsChange} toggles={controlToggles} />
            <Grid item xs={12} className={classes.state_text}>
                <div>Behaviour Plan</div>
            </Grid>
            <ToggleSets exclusive={false} toggleValues={plans} toggleChange={plansChange} toggles={planToggles} />
            <Grid item xs container >
                <Grid item xs={6}>
                    <Grid item xs={12} className={classes.state_text}>
                        <div>Velocity Plan</div>
                    </Grid>
                    <VelState velocityStates={velocityStates}/>
                </Grid>
                <Grid item xs={6}>
                    <Grid item xs={12} className={classes.state_text}>
                        <div>Planner State</div>
                    </Grid>
                    <PlannerState state={pstates}/>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default SetState;

/*
<ToggleButtonGroup exclusive value={scenarios} onChange={scenariosChange} className={classes.scenario_toggle_button_group} fullWidth>
    <ToggleButton className={classes.scenario_toggle_button} value={1}>1</ToggleButton>
    <ToggleButton className={classes.scenario_toggle_button} value={2}>2</ToggleButton> 
    <ToggleButton className={classes.scenario_toggle_button} value={3}>3</ToggleButton>
    <ToggleButton className={classes.scenario_toggle_button} value={4}>4</ToggleButton> 
    <ToggleButton className={classes.scenario_toggle_button} value={5}>5</ToggleButton>
    <ToggleButton className={classes.scenario_toggle_button} value={6}>6</ToggleButton> 
</ToggleButtonGroup>

<ToggleButtonGroup value={pstates} className={classes.pstate_toggle_button_group} fullWidth>
    <ToggleButton className={classes.pstate_toggle_button} value='ready' >Ready</ToggleButton>
    <ToggleButton className={classes.pstate_toggle_button} value='g_plan'>Global Planning</ToggleButton> 
</ToggleButtonGroup>
<ToggleButtonGroup value={pstates} className={classes.pstate_toggle_button_group} fullWidth>
    <ToggleButton className={classes.pstate_toggle_button} value='b_plan'>Behaviour Planning</ToggleButton>
    <ToggleButton className={classes.pstate_toggle_button} value='v_plan'>Velocity Planning</ToggleButton> 
</ToggleButtonGroup>
<ToggleButtonGroup value={pstates} className={classes.pstate_toggle_button_group} fullWidth>
    <ToggleButton className={classes.pstate_toggle_button} value='w_plan'>Waypoint Planning</ToggleButton>
    <ToggleButton className={classes.pstate_toggle_button} value='both_plan'>Both Planning</ToggleButton> 
</ToggleButtonGroup>
<ToggleButtonGroup value={pstates} className={classes.pstate_toggle_button_group} fullWidth>
    <ToggleButton className={classes.pstate_toggle_button} value='empty'> - </ToggleButton>
    <ToggleButton className={classes.pstate_toggle_button} value='empty'> - </ToggleButton> 
</ToggleButtonGroup>
<ToggleButtonGroup value={pstates} className={classes.pstate_toggle_button_group} fullWidth>
    <ToggleButton className={classes.pstate_toggle_button} value='empty'> - </ToggleButton>
    <ToggleButton className={classes.pstate_toggle_button} value='empty'> - </ToggleButton> 
</ToggleButtonGroup>

*/