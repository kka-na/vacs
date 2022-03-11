import React from "react";
import logo from "../../vacs.svg";
import "./Home.css";

import { Link, Route, Routes } from "react-router-dom";
import Manual from "../manual/Manual";

const Home = () => {
  return (
    <div className="Home">
      <header className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <p> Visualize, Alert and Control System </p>
        <Link to="/manual">
          <button className="Start-btn">
            <span>GET STARTED</span>
          </button>
        </Link>
      </header>
      <Routes>
        <Route path="/manual" element={<Manual />} />
      </Routes>
    </div>
  );
};

export default Home;
