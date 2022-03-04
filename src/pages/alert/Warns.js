import React, {useEffect, useState} from "react";
import { Grid} from '@mui/material';
import MorphismButton from '../../components/MorphismButton/MorphismButton';

function Warns(element){
    const [styleClasses, setStyleClasses] = useState(['basic16','basic16','basic16','basic16','basic16','basic16','basic16','basic16','basic16','basic16','basic16', 'basic16']);
    
    useEffect(()=>{
        let temp = styleClasses;
        element.state.map((state, index) => {
            temp[index] = state ? 'pink16' : 'basic16';
        });
        setStyleClasses(temp);
    },[element.state]);

    return(
        <Grid>
            <Grid sx={{display:'flex', position:'relative'}}>
                <MorphismButton name="btn1" class_name = {styleClasses[0]}></MorphismButton>
                <MorphismButton name="btn2" class_name = {styleClasses[1]}></MorphismButton>
                <MorphismButton name="btn3" class_name = {styleClasses[2]}></MorphismButton>
                <MorphismButton name="btn4" class_name = {styleClasses[3]}></MorphismButton>
                <MorphismButton name="btn5" class_name = {styleClasses[4]}></MorphismButton>
                <MorphismButton name="btn6" class_name = {styleClasses[5]}></MorphismButton>
            </Grid>
            <Grid sx={{display:'flex', position:'relative'}}>
                <MorphismButton name="btn7" class_name = {styleClasses[6]}></MorphismButton>
                <MorphismButton name="btn8" class_name = {styleClasses[7]}></MorphismButton>
                <MorphismButton name="btn9" class_name = {styleClasses[8]}></MorphismButton>
                <MorphismButton name="btn10" class_name = {styleClasses[9]}></MorphismButton>
                <MorphismButton name="btn11" class_name = {styleClasses[10]}></MorphismButton>
                <MorphismButton name="btn12" class_name = {styleClasses[11]}></MorphismButton>
            </Grid>
        </Grid>
        
    )
}

export default Warns