import React, {useEffect, useState} from "react";
import moment from 'moment'
import { makeStyles } from "@material-ui/core";

const Styles = makeStyles((theme)=>({
    time:{
        color: '#fff',
        fontSize: '16px',
    }
}));
 
const api = {
    base : "https://api.openweathermap.org/data/2.5/"
};

export default function Weather(){
    const classes = Styles();
    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
    const [weather, setWeather] = useState([]);

    let timer = null;
    const [time, setTime] = useState(moment());
    useEffect(()=>{timer = setInterval(()=>{setTime(moment());},1000);
                    return()=>{clearInterval(timer);};},[]);

    useEffect(() => {
        const fetchData = async() =>{
            navigator.geolocation.getCurrentPosition(function(position){
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            });
            await fetch(`${api.base}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_OPENWEATHER_KEY}`)
            .then(res => res.json())
            .then(result => {setWeather(result) 
                console.log(result);});
        }
        fetchData();
    }, [lat, long])

    return (
        <div className={classes.time}>
            {(typeof weather.main != 'undefined') ? (
                <div>
                    {time.format('YYYY.MM.DD HH:mm:ss ddd')}  {weather.name} {weather.main.temp}&deg;C {weather.weather[0].main}
                </div>
            ):(
                <div></div>
            )}
        </div>
    );
}