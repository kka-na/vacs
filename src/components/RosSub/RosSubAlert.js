import React from 'react'
import ROSLIB from 'roslib'
import { Box, Button} from '@material-ui/core'
import SharedStyles from './SharedStyles.ts'

const ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090'
});

const listner = new ROSLIB.Topic({
    ros: ros,
    name: '/listener',
    messageType: 'std_msgs/String'
});

const listner2 = new ROSLIB.Topic({
    ros: ros,
    name: '/usb_cam/image_raw/compressed',
    messageType: 'sensor_msgs/CompressedImage'
});

const RosSubAlert = ({addROS_msg,addROS_img}) => {
    const classes = SharedStyles();
    
    const ROSGet = () => {
        listner.subscribe(function(message){
            addROS_msg(message.data);
        });
        listner2.subscribe(function(message){
            let image = new Image();
            image.src = "data:image/jpg;base64," + message.data;
            addROS_img(image);
        });
    };
    const ROSInit = () => {
        listner.unsubscribe();
        listner2.unsubscribe();
    };

    return (
        <Box className={classes.box}>
            <Button className={classes.button} onClick={ROSGet} variant="contained">
                Subscribe
            </Button> 
            <Button className={classes.button} onClick={ROSInit} variant="contained">
                UnSubscribe
            </Button>
        </Box>
    )
}

export default RosSubAlert
