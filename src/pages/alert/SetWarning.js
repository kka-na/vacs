import React,{useState} from "react";
import ROSLIB from "roslib";
import { Grid, Card, Container} from "@material-ui/core";
import AlertStyles from "./AlertStyles.ts";
import DeckMap from "./DeckMap";
import { CardContent, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'

const ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090'
});

const modeTopic = new ROSLIB.Topic({
    ros: ros,
    name: '/mode',
    messageType: 'geometry_msgs/Twist'
});

const warningTopic = new ROSLIB.Topic({
    ros: ros,
    name: '/warning_message',
    messageType: 'std_msgs/String'
})

const SetWarning =(props)=>{
    const classes = AlertStyles();
    const [isSub, setIsSub] = useState(false);
    const [modes, setModes] = useState([]);
    const [warns, setWarns] = useState([]);
    const [warningMessage, setWarningMessage] = useState('warning message');

    const modesChange = (event, mode) =>{
        setModes(mode);
        if(props){
            modeTopic.publish(mode);
        }
    }

    if(props.sub){
        warningTopic.subscribe(function(message){
            setWarningMessage(message);
        });
    }
    if(!props.sub){
        warningTopic.unsubscribe();
    }

    return(
        <>
            <Grid item xs container spacing={2}>
                <Grid item xs={4}>
                <ToggleButtonGroup orientation="vertical" value={modes} onChange={modesChange} className={classes.mode_toggle_button_group} exclusive fullWidth>
                    <ToggleButton className={classes.mode_toggle_button} value={0}>Manual Mode</ToggleButton>
                    <ToggleButton className={classes.mode_toggle_button} value={1}>Autopilot Mode</ToggleButton> 
                    <ToggleButton className={classes.mode_toggle_button} value={2}>Test Mode</ToggleButton>
                    <ToggleButton className={classes.mode_toggle_button} value={3}>License Mode</ToggleButton> 
                </ToggleButtonGroup>
                </Grid>
                <Grid item xs={8}>
                    <Card className={classes.warning_message_card}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20 }}>
                                {warningMessage}
                            </Typography>
                        </CardContent>
                    </Card>
                    <ToggleButtonGroup value={warns} className={classes.warn_toggle_button_group} exclusive fullWidth>
                        <ToggleButton className={classes.warn_toggle_button} value={0}>BTN</ToggleButton>
                        <ToggleButton className={classes.warn_toggle_button} value={1}>BTN</ToggleButton> 
                        <ToggleButton className={classes.warn_toggle_button} value={2}>BTN</ToggleButton>
                        <ToggleButton className={classes.warn_toggle_button} value={3}>BTN</ToggleButton>
                        <ToggleButton className={classes.warn_toggle_button} value={2}>BTN</ToggleButton>
                        <ToggleButton className={classes.warn_toggle_button} value={3}>BTN</ToggleButton>  
                    </ToggleButtonGroup>
                    <ToggleButtonGroup value={warns} className={classes.warn_toggle_button_group} exclusive fullWidth>
                        <ToggleButton className={classes.warn_toggle_button} value={0}>BTN</ToggleButton>
                        <ToggleButton className={classes.warn_toggle_button} value={1}>BTN</ToggleButton> 
                        <ToggleButton className={classes.warn_toggle_button} value={2}>BTN</ToggleButton>
                        <ToggleButton className={classes.warn_toggle_button} value={3}>BTN</ToggleButton>
                        <ToggleButton className={classes.warn_toggle_button} value={2}>BTN</ToggleButton>
                        <ToggleButton className={classes.warn_toggle_button} value={3}>BTN</ToggleButton>  
                    </ToggleButtonGroup>
                </Grid>
                <Grid item xs={12}>
                    <Container className={classes.map}>
                        <DeckMap />
                    </Container>
                </Grid>
            </Grid>
        </>
    )
}

export default SetWarning