import React, { useEffect, useState } from "react";
import WarnMessageStyles from "./WarnMessageStyles";
import { Card } from "@material-ui/core";
import { CardContent, Typography } from "@mui/material";

const WarnMessage = (element) => {
  const classes = WarnMessageStyles();
  const [styleClass, setStyleClass] = useState(classes.basic_card);
  const [messages, setMessages] = useState([
    "Stable State",
    "Sensor Anomalies Detected",
    "Emergency Stop Request",
    "System Anomalies Detected",
    "Another Anomalied Detected",
  ]);
  const [messageIdx, setMessageIdx] = useState(0);
  useEffect(() => {
    let temp = styleClass;
    temp = element.type === 0 ? classes.basic_card : classes.warn_card;
    setStyleClass(temp);
    setMessageIdx(element.type);
  }, [element.type]);

  return (
    <Card className={styleClass}>
      <CardContent>
        <Typography sx={{ fontSize: 40, align: "center" }}>
          {messages[messageIdx]}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WarnMessage;
