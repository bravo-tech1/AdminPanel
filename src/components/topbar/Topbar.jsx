import React from "react";
import "./topbar.css";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">BravoAdmin</span>
        </div>
        <div className="toRight">
          <span className="logo" width={"15%"}>
            <img src={require("./logo.png")} alt="logo" width={"150px"} />
          </span>
        </div>
      </div>
    </div>
  );
}
