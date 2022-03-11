import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function VelState(props) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart
        data={props.velocityStates}
        margin={{ top: 10, left: -30, right: 20 }}
      >
        <XAxis dataKey="time" color="#fff" domain={[0, 1.0]} />
        <YAxis color="#fff" domain={[20, 60]} />
        <Legend />
        <Line type="basis" dataKey="current" stroke="#6569d7" dot={false} />
        <Line type="basis" dataKey="target" stroke="#86def5" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
