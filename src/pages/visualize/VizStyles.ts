import { makeStyles } from "@material-ui/core";

export default makeStyles((theme)=>({
    map: {
        height: "0",
        paddingBottom:"133.33%"
    },
    card: {
        backgroundColor: '#0f152e',
        color: '#fffff3',
        height: '0',
        paddingBottom:"56.25%", 
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
        paddingBottom:"60%"
    },
    toggle_button_group:{
        '& .MuiToggleButtonGroup-grouped': {
            margin: '0.5rem',
            borderRadius: '4px !important',
            height: '3rem',
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
    pub_button: {
        fontFamily: "Rajdhani, sans-serif",
        fontSize: "1rem",
        backgroundColor: '#0c1024',
        color: '#fff',
        marginTop: '0.5rem',
        borderRadius: '4px',
        height: '3rem',
        boxShadow:'5px 5px 7px #05060e, -5px -5px 7px #131a3a',
        '&:hover': {
            backgroundColor: '#6569d7',
            borderRadius: '4px',
            boxShadow:'5px 5px 7px #05060e, -5px -5px 7px #131a3a',
            color: '#0c1024',},
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
        marginTop: "0.2rem",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_field:{
        marginBottom: "0.3rem",
        '& label':{
            color:'white',
            fontSize:"0.8rem",
        },
        '& label.Mui-focused':{
            color:'#3b7bea',
        },
        '& .MuiInputBase-root':{
            color:'white',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: '1px solid rgba(255,255,255,.7)',
            },
            '&:hover fieldset': {
              borderColor: '#3b7bea',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3b7bea',
            },
          },
    },
}))