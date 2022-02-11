import {makeStyles} from "@material-ui/core";

export default makeStyles((theme)=>({
    box:{
        float:"right",
        marginBottom: "5px",
    },
    grid:{
        display: 'flex',
    },
    button1: {
        fontFamily: "Rajdhani, sans-serif",
        fontSize: "1rem",
        backgroundColor: '#0c1024',
        color: '#fff',
        borderRadius: '4px',
        boxShadow:'5px 5px 7px #05060e, -5px -5px 7px #131a3a',
        '&:hover': {
            backgroundColor: '#274f8a',
            borderRadius: '4px',
            boxShadow:'5px 5px 7px #05060e, -5px -5px 7px #131a3a',
            color: '#fff',},
        '&:active': {
            backgroundColor: '#274f8a',
            borderRadius: '4px',
            boxShadow:'5px 5px 7px #05060e, -5px -5px 7px #131a3a',
            color:'#fff',},
        '&:focus':{
            backgroundColor: '#274f8a',
            borderRadius: '4px',
            boxShadow:'5px 5px 7px #05060e, -5px -5px 7px #131a3a',
            color:'#fff',},
    },
    toggle_button_group:{
        '& .MuiToggleButtonGroup-grouped': {
            margitnRigh: '0.5rem',
            borderRadius: '4px !important',
          },
    },
    toggle_button: {
        '&.MuiToggleButton-root':{
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "1rem",
            backgroundColor: '#0c1024',
            color: '#fff',
            borderRadius: '4px',
            boxShadow:'5px 5px 7px #05060e, -5px -5px 7px #131a3a',
            '&:hover': {
                backgroundColor: '#3b7bea',
                borderRadius: '4px',
                boxShadow:'5px 5px 7px #05060e, -5px -5px 7px #131a3a',
                color: '#fff',},
            '&.Mui-selected': {
                backgroundColor: '#274f8a',
                borderRadius: '4px',
                boxShadow:'5px 5px 7px #05060e, -5px -5px 7px #131a3a',
                color: '#fff',},
        },
        
    },
    text:{
        display:'flex',
        verticalAlign: 'middle',
        alignItems: 'center',
        color: '#fff',
    },
    stopwatch_text:{
        display:'flex',
        verticalAlign: 'middle',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
    },
    side:{
        display:'flex',
        verticalAlign: 'middle',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontSize: '1.2em',
    },
    temp_text:{
        marginTop: "0.5rem",
    },
    empty:{
        paddingTop:"10em",
    },
}));