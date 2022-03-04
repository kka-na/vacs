import React from "react";
import { Box, Typography } from "@material-ui/core";

const Footer = () => {
  return (
    <footer display="flex" align="center" height="100px">
      <h4 style={{ color: "#fff", fontSize: "20px" }}>
        Copyright.2022 A.Eye team @ CVLab of INHA University
      </h4>
      <img src="/pngs/aeye.png" width="100px" alt="aeyelogo" />
    </footer>
  );
};

export default Footer;
