import React from "react";
import { makeStyles } from "@material-ui/core";

const Styles = makeStyles((theme)=>({
    gear_text:{
        verticalAlign: 'middle',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontWeight: '700',
        fontSize: '1.125em',
    },
    selected_gear_text:{
        verticalAlign: 'middle',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#85dcf5',
        fontWeight: '700',
    }
}
))

export default function Gear(props){
    const classes = Styles();
    return(
        <div className={classes.gear_text}>
            {(()=>{
                switch(props.gear){
                    case 0:
                        return <div> <p className={classes.selected_gear_text}>P</p><p>R</p><p>N</p><p>D</p> </div>
                    case 1:
                        return <div> <p>P</p><p className={classes.selected_gear_text}>R</p><p>N</p><p>D</p> </div>
                    case 2:
                        return <div> <p>P</p><p>R</p><p className={classes.selected_gear_text}>N</p><p>D</p> </div>
                    case 3:
                        return <div> <p>P</p><p>R</p><p>N</p><p className={classes.selected_gear_text} >D</p> </div>
                    default:
                        return <div> <p>P</p><p>R</p><p>N</p><p>D</p> </div>
                }
            })()}
        </div>
    )
}