import { makeStyles } from "@material-ui/core";

export default makeStyles((theme)=>({
    map: {
        height: "30rem",
        marginLeft: "-1.3rem",
        width: "100%",
    },
    warning_message_card: {
        backgroundColor: '#fe86e3',
        marginBottom: "0.5rem",
        color: '#0c1024',
        height: '6.7rem',
        display:'flex',
        verticalAlign: 'middle',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '3rem',
    },
    media: {
        width: '100%',
        height: 'auto',
        aspectRatio: '16 / 9',
    },
    card_lidar:{
        backgroundColor: '#0f152e',
        color: '#fffff3',
        height: '0',
        paddingBottom:"66.66%"
    },
    warn_toggle_button_group:{
        '& .MuiToggleButtonGroup-grouped': {
            margin: '0.5rem',
            marginRight: '0.7rem',
            borderRadius: '4px !important',
          },
    },
    warn_toggle_button: {
        '&.MuiToggleButton-root':{
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "0.8rem",
            backgroundColor: '#0c1024',
            color: '#fff',
            borderRadius: '4px',
            boxShadow:'5px 5px 7px #05060e, -5px -5px 7px #131a3a',
            '&.Mui-selected': {
                backgroundColor: '#fe86e3',
                borderRadius: '4px',
                boxShadow:'5px 5px 7px #05060e, -5px -5px 7px #131a3a',
                color: '#0c1024',
                '&:hover': {
                    backgroundColor: '#0c1024',
                    borderRadius: '4px',
                    boxShadow:'5px 5px 7px #05060e, -5px -5px 7px #131a3a',
                    color: '#fff',},},
        },
        
    },
    mode_toggle_button_group:{
        '& .MuiToggleButtonGroup-grouped': {
            marginBottom: '0.5rem',
            borderRadius: '4px !important',
          },
    },
    mode_toggle_button: {
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
                backgroundColor: '#85def5',
                borderRadius: '4px',
                boxShadow:'5px 5px 7px #05060e, -5px -5px 7px #131a3a',
                color: '#0c1024',
                '&:hover': {
                    backgroundColor: '#0c1024',
                    borderRadius: '4px',
                    boxShadow:'5px 5px 7px #05060e, -5px -5px 7px #131a3a',
                    color: '#3b7bea',},},
        },
        
    },
    set_value:{
        display:'flex',
        verticalAlign: 'middle',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontSize: '1.2em',
    },
    full_button:{
        marginTop:"1.2rem",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input_grid:{
        marginTop:"1.2rem",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}))