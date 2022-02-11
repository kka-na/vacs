import React from "react";
import { makeStyles } from "@material-ui/core";
import { BatteryAlert, Battery20, Battery30, Battery50, Battery60, Battery80, Battery90, BatteryFull, BatteryStd} from "@material-ui/icons";

const Styles = makeStyles((theme)=>({
    battery:{
        paddingTop: "1rem",
        fontSize:"5em",
    },
    battery_text:{
        textAlign:'center',
        marginTop: "-0.2rem",
        fontSize:"0.8em",
    }
}))

export default function Battery(props){
    const classes = Styles();
    const battery = Math.floor(props.battery*100);
    const renderBattery =() =>{
        if(battery >= 0 && battery <= 5){
            return <BatteryAlert className={classes.battery}/>
        }else if(battery > 5 && battery <= 20){
            return <Battery20 className={classes.battery} />
        }else if(battery > 20 && battery <= 30){
            return <Battery30 className={classes.battery} />
        }else if(battery > 30 && battery <= 50){
            return <Battery50 className={classes.battery} />
        }else if(battery > 50 && battery <= 60){
            return <Battery60 className={classes.battery} />
        }else if(battery > 60 && battery <= 80){
            return <Battery80 className={classes.battery} />
        }else if(battery > 80 && battery <= 90){
            return <Battery90 className={classes.battery} />
        }else if(battery > 90 && battery <= 100){
            return <BatteryFull className={classes.battery} />
        }else{
            return <BatteryFull className={classes.battery} />
        }
    }
    return(
        <div>
            {renderBattery()}<p className={classes.battery_text}>{battery}%</p>
        </div>
    )
}