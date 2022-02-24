import React,{useState} from "react";
import ROSLIB from "roslib";
import { Grid, Card, Container} from "@material-ui/core";
import AlertStyles from "./AlertStyles.ts";
import DeckMap from "./DeckMap";
import { CardContent, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'

const ros = new ROSLIB.Ros({ url: 'ws://localhost:9090'});
const modeTopic = new ROSLIB.Topic({ ros: ros, name: '/mode', messageType: 'geometry_msgs/Vector3' }); 
const modeSetTopic = new ROSLIB.Topic({ ros: ros, name: '/mode_set', messageType: 'geometry_msgs/Vector3' }); 
const warningTopic = new ROSLIB.Topic({ ros: ros, name: '/warning_message', messageType: 'std_msgs/String' });
const btn1StateTopic = new ROSLIB.Topic({ros: ros, name: '/btn1_state', messageType: 'std_msgs/Bool'});
const btn2StateTopic = new ROSLIB.Topic({ros: ros, name: '/btn2_state', messageType: 'std_msgs/Bool'});
const btn3StateTopic = new ROSLIB.Topic({ros: ros, name: '/btn3_state', messageType: 'std_msgs/Bool'});
const btn4StateTopic = new ROSLIB.Topic({ros: ros, name: '/btn4_state', messageType: 'std_msgs/Bool'});
const btn5StateTopic = new ROSLIB.Topic({ros: ros, name: '/btn5_state', messageType: 'std_msgs/Bool'});
const btn6StateTopic = new ROSLIB.Topic({ros: ros, name: '/btn6_state', messageType: 'std_msgs/Bool'});

const SetWarning =(props)=>{
    const classes = AlertStyles();
    const [isSub, setIsSub] = useState(false);
    const [modes, setModes] = useState();
    let [warns, setWarns] = useState([]);
    const [warningMessage, setWarningMessage] = useState('warning message');

    const modesChange = (event, mode) =>{
        const mode_num = parseInt(mode);
        setModes(mode_num);
        if(isSub){
            modeSetTopic.publish({x:mode_num, y:0, z:0});
        }
    }

    if(!isSub && props.sub){
        setIsSub(true);
        warningTopic.subscribe(function(message){ setWarningMessage(message.data); });
        modeTopic.subscribe(function(message){ setModes(message.x);});
        btn1StateTopic.subscribe(function(message){
            if(message.data){ warns.push('btn1'); setWarns(warns);}
            else if(!message.data){ warns = warns.filter(item => item !== 'btn1'); setWarns(warns);}
        });
        btn2StateTopic.subscribe(function(message){
            if(message.data){warns.push('btn2'); setWarns(warns)}
            else if(!message.data){warns = warns.filter(item => item !== 'btn2'); setWarns(warns);}
        });
        btn3StateTopic.subscribe(function(message){
            if(message.data){warns.push('btn3'); setWarns(warns); }
            else if(!message.data){warns = warns.filter(item => item !== 'btn3'); setWarns(warns);}
        });
        btn4StateTopic.subscribe(function(message){
            if(message.data){warns.push('btn4'); setWarns(warns); }
            else if(!message.data){warns = warns.filter(item => item !== 'btn4'); setWarns(warns);}
        });
        btn5StateTopic.subscribe(function(message){
            if(message.data){warns.push('btn5'); setWarns(warns); }
            else if(!message.data){warns = warns.filter(item => item !== 'btn5'); setWarns(warns);}
        });
        btn6StateTopic.subscribe(function(message){
            if(message.data){warns.push('btn6'); setWarns(warns); }
            else if(!message.data){warns = warns.filter(item => item !== 'btn6'); setWarns(warns);}
        });
    }

    if(isSub && !props.sub){
        setIsSub(false);
        warningTopic.unsubscribe();
        modeTopic.unsubscribe();
        btn1StateTopic.unsubscribe();
        btn2StateTopic.unsubscribe();
        btn3StateTopic.unsubscribe();
        btn4StateTopic.unsubscribe();
        btn5StateTopic.unsubscribe();
        btn6StateTopic.unsubscribe();
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
                        <ToggleButton className={classes.warn_toggle_button} value='btn1'>BTN</ToggleButton>
                        <ToggleButton className={classes.warn_toggle_button} value='btn2'>BTN</ToggleButton> 
                        <ToggleButton className={classes.warn_toggle_button} value='btn3'>BTN</ToggleButton>
                        <ToggleButton className={classes.warn_toggle_button} value='btn4'>BTN</ToggleButton>
                        <ToggleButton className={classes.warn_toggle_button} value='btn5'>BTN</ToggleButton>
                        <ToggleButton className={classes.warn_toggle_button} value='btn6'>BTN</ToggleButton>  
                    </ToggleButtonGroup>
                    <ToggleButtonGroup value={warns} className={classes.warn_toggle_button_group} exclusive fullWidth>
                        <ToggleButton className={classes.warn_toggle_button} value='btn7'> - </ToggleButton>
                        <ToggleButton className={classes.warn_toggle_button} value='btn8'> - </ToggleButton> 
                        <ToggleButton className={classes.warn_toggle_button} value='btn9'> - </ToggleButton>
                        <ToggleButton className={classes.warn_toggle_button} value='btn10'> - </ToggleButton>
                        <ToggleButton className={classes.warn_toggle_button} value='btn11'> - </ToggleButton>
                        <ToggleButton className={classes.warn_toggle_button} value='btn12'> - </ToggleButton>  
                    </ToggleButtonGroup>
                </Grid>
                <Grid item xs={12}>
                    <Container className={classes.map} fullWidth>
                        <DeckMap sub={props.sub}/>
                    </Container>
                </Grid>
            </Grid>
        </>
    )
}

export default SetWarning