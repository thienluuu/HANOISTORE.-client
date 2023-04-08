import React from "react";

import "./Footer.scss";
import { FaLocationArrow, FaMobile, FaEnvelope } from "react-icons/fa";
import Payment from "../../assets/payments.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="col">
          <div className="title">About</div>
          <div className="text">
            HANOISTORE is very pleased to serve you. We are committed here
            Committed to bringing the best products and services to other
            products The store always updates the latest product models
            according to the trend direction of the times to suit all ages.
          </div>
        </div>
        <div className="col">
          <div className="title">Contact</div>
          <div className="item">
            <FaLocationArrow />
            <div className="text">Duong Ha,Gia Lam,Ha Noi Capital</div>
          </div>
          <div className="item">
            <FaMobile />
            <div className="text">Hotline:0327021357</div>
          </div>
          <div className="item">
            <FaEnvelope />
            <div className="text">Email:thienM199x@gmail.com</div>
          </div>
        </div>
        <div className="col">
          <div className="title">Categories</div>
          <span className="text">Headphones</span>
          <span className="text">Smart Watches</span>
          <span className="text">Bluetooth Speakers</span>
          <span className="text">WireLess Earbuds</span>
          <span className="text">Home Theatre</span>
          <span className="text">Projector</span>
        </div>
        <div className="col">
          <div className="title">Pages</div>
          <span className="text">Home</span>
          <span className="text">About</span>
          <span className="text">Privacy Policy</span>
          <span className="text">Returns</span>
          <span className="text">Terms & Conditions</span>
          <span className="text">Contact Us</span>
        </div>
      </div>
      <div className="bottom-bar">
        <div className="bottom-bar-content">
          <div className="text">
            HANOISTORE 2023 CREATED BY CRISS. PREMIUM E-COMMERCE SOLUTIONS.
          </div>
          <img src={Payment} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
