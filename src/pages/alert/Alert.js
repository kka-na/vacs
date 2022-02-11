import React, {useState} from "react";

import {Box, Card, CardMedia, makeStyles, Grid} from "@material-ui/core"
import { Container} from "@material-ui/core";
import RosSubAlert from "../../components/RosSub/RosSubAlert";

const useStyles = makeStyles((theme) => ({
    box1: {
        maxwidth: "calc(100% - 720px)",
        height: "800px",
    },

    card: {
        maxWidth: 720,
        backgroundColor: '#0f152e',
        color: '#fffff3',
    },
    media: {
        height: 380,
    },
}));


const Alert = () => {
    const classes = useStyles();
    const [receiveMsg, setReceiveMsg] = useState([]);
    const [receiveImg, setReceiveImg] = useState([]);

    const addROS_msg = (msg) => { setReceiveMsg(msg);};
    const addROS_img = (img) => { setReceiveImg(img);};

    return( 
        <Box m={3} mt={1} >
            <RosSubAlert addROS_msg={addROS_msg} addROS_img={addROS_img}/>
            <Box mt={1}></Box>
            <Grid container spacing={1}>
                <Grid item xs={8}>
                    <Container className={classes.box1}>
                    </Container>
                </Grid>
                <Grid item xs={4} sm container>
                    <Grid item xs container direction="column">
                        <Grid item xs>
                            <Card className={classes.card}>
                                <CardMedia
                                    component="img"
                                    className={classes.media}
                                    image={receiveImg.src}
                                />
                            </Card> 
                        </Grid>
                    </Grid>
                </Grid>
            </Grid> 
        </Box>
    );
};

export default Alert;