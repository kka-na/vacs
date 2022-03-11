import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons"

const Styles = makeStyles((theme)=>({
    lights:{
        paddingRight:"15px"
    },
    left_on:{
        paddingRight:"15px",
        color:"#85dcf5"
    },
    right_on:{
        color:"#85dcf5"
    }
}
))

export default function SignalLights(props){
    const classes = Styles();
    return(
        <div>
            {(()=>{
                switch(props.signal){
                    case 0:
                        return  <Grid item xs container direction="row" >
                                    <ArrowBack className={classes.left_on}/>
                                    <ArrowForward />
                                </Grid>
                    case 1:
                        return  <Grid item xs container direction="row" >
                                    <ArrowBack className={classes.lights}/>
                                    <ArrowForward className={classes.right_on}/>
                                </Grid>
                    case 2:
                        return  <Grid item xs container direction="row" >
                                    <ArrowBack className={classes.left_on}/>
                                    <ArrowForward className={classes.right_on}/>
                                </Grid>
                    default:
                        return <Grid item xs container direction="row" >
                                    <ArrowBack className={classes.lights}/>
                                    <ArrowForward/>
                                </Grid>
                }
            })()}
        </div>
    )
}