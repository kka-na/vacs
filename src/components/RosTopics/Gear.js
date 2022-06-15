import React from "react";
import { Box, makeStyles } from "@material-ui/core";

const Styles = makeStyles((theme) => ({
  gear_text: {
    verticalAlign: "middle",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem 1.75rem 1rem 1.75rem",
    marginBottom: "2rem",
    borderRadius: "5rem",
    color: "#fff",
    fontSize: "3rem",
  },
  selected_gear_text: {
    padding: "1rem 1.75rem 1rem 1.75rem",
    marginBottom: "2rem",
    borderRadius: "4px",
    verticalAlign: "middle",
    justifyContent: "center",
    alignItems: "center",
    color: "#fffff3", //42f5ba
    fontSize: "3rem",
    backgroundColor: "#6569d7",
  },
}));

export default function Gear(props) {
  const classes = Styles();
  return (
    <div>
      {(() => {
        switch (props.gear) {
          case 0:
            return (
              <div>
                {" "}
                <Box className={classes.selected_gear_text}>P</Box>
                <Box className={classes.gear_text}>R</Box>
                <Box className={classes.gear_text}>N</Box>
                <Box className={classes.gear_text}>D</Box>{" "}
              </div>
            );
          case 1:
            return (
              <div>
                {" "}
                <Box className={classes.gear_text}>P</Box>
                <Box className={classes.selected_gear_text}>R</Box>
                <Box className={classes.gear_text}>N</Box>
                <Box className={classes.gear_text}>D</Box>{" "}
              </div>
            );
          case 2:
            return (
              <div>
                {" "}
                <Box className={classes.gear_text}>P</Box>
                <Box className={classes.gear_text}>R</Box>
                <Box className={classes.selected_gear_text}>N</Box>
                <Box className={classes.gear_text}>D</Box>{" "}
              </div>
            );
          case 3:
            return (
              <div>
                {" "}
                <Box className={classes.gear_text}>P</Box>
                <Box className={classes.gear_text}>R</Box>
                <Box className={classes.gear_text}>N</Box>
                <Box className={classes.selected_gear_text}>D</Box>{" "}
              </div>
            );
          default:
            return (
              <div>
                {" "}
                <Box className={classes.gear_text}>P</Box>
                <Box className={classes.gear_text}>R</Box>
                <Box className={classes.gear_text}>N</Box>
                <Box className={classes.gear_text}>D</Box>{" "}
              </div>
            );
        }
      })()}
    </div>
  );
}
