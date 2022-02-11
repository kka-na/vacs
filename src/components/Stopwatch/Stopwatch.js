import React from "react";

export default function Stopwatch(props){
    return(
        <div>
            <span>
                {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
            </span>
            <span>
                {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}.
            </span>
            <span>
                {("0" + ((props.time / 10) % 100)).slice(-2)}
            </span>
        </div>
    )
}