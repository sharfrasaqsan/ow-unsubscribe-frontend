import React from "react";
import Logo from "../OW-Logo.svg";
import Vector from "../circle-check.svg";
import "./success.css";

const unsubscribesuccess = () => {
  return (
    <div className="container">
      <img src={Logo} alt="Oscar Wylee" />
      <div className="title">Notification Unsubscribe</div>
      <div className="success-container">
        <img src={Vector} alt="Vector" className="success-check" />
        <div className="success-title">Unsubscribed successfully.</div>
        <div className="success-description">
          You are no longer receive notifications from oscarwylee.com.au
        </div>
      </div>
      <p className="return">
        <a href="https://oscarwylee.com.au/">Return to oscarwylee.com.au</a>
      </p>
    </div>
  );
};

export default unsubscribesuccess;
