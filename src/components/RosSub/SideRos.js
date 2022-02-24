import React, { useState } from 'react'
import ROSLIB from "roslib"
import { Grid } from '@material-ui/core'
import SharedStyles from './SharedStyles.ts'
import Gear from '../RosTopics/Gear'
import SignalLights from '../RosTopics/SignalLight'
import Battery from '../RosTopics/Battery'

const ros = new ROSLIB.Ros({url: 'ws://localhost:9090'});
const velTopic = new ROSLIB.Topic({ros: ros, name: '/vel',messageType: 'geometry_msgs/Vector3'});
const gearTopic = new ROSLIB.Topic({ros: ros,name: '/gear',messageType: 'geometry_msgs/Vector3'});
const signalTopic = new ROSLIB.Topic({ros: ros,name: '/signal_light',messageType: 'geometry_msgs/Vector3'});
const batteryTopic = new ROSLIB.Topic({ros: ros,name: '/battery',messageType: 'geometry_msgs/Vector3'});
const carTempTopic = new ROSLIB.Topic({ros: ros,name: '/car_temperature',messageType: 'geometry_msgs/Vector3'});

const SideRos = (props) => {
    const classes = SharedStyles();
    const [receiveVel, setReceiveVel] = useState([]);
    const [receiveGear, setReceiveGear] = useState([]);
    const [receiveSignal, setReceiveSignal] = useState([]);
    const [receiveBattery, setReceiveBattery] = useState([]);
    const [receiveCarTemp, setReceiveCarTemp] = useState([]);
    const [isSub, setIsSub] = useState(false);

    if (!isSub && props.sub){
        setIsSub(true);
        velTopic.subscribe(function(message){setReceiveVel(message.x);});
        gearTopic.subscribe(function(message){setReceiveGear(message.x);});
        signalTopic.subscribe(function(message){setReceiveSignal(message.x);});
        batteryTopic.subscribe(function(message){setReceiveBattery(message.x);});
        carTempTopic.subscribe(function(message){setReceiveCarTemp(message.x);});
    }
    if (isSub && !props.sub){
        setIsSub(false);
        velTopic.unsubscribe();
        gearTopic.unsubscribe();
        signalTopic.unsubscribe();
        batteryTopic.unsubscribe();
        carTempTopic.unsubscribe();
    }

    return(
        <Grid item xs container direction="column" className={classes.side}>
            <Grid item xs>
                {receiveVel}km/h
            </Grid>
            <Grid item xs>
                <Gear gear={receiveGear}/>
            </Grid>
            <Grid item xs>
                <SignalLights signal={receiveSignal}/>
            </Grid>
            <Grid item xs>
                <Battery battery={receiveBattery} />
            </Grid>
            <Grid item xs className={classes.temp_text}>
                {receiveCarTemp}&deg;C
            </Grid>

        </Grid>
    )
}

export default SideRos