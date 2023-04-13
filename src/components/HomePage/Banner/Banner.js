import React from "react";

import "./Banner.scss";
import BannerImg from "../../../assets/banner-img.png";
import SliderShow from "./Slider/SliderShow";
const Banner = () => {
  return (
    <div className="hero-banner">
      <div className="content">
        <div className="text-content">
          <h1>SALES</h1>
          <p>Quality never goes of style</p>
          <div className="btns">
            <div className="banner-btn">Read More</div>
            <div className="banner-btn v2">Shop Now</div>
          </div>
        </div>
        <div className="banner-slider">
          <SliderShow />
        </div>
      </div>
    </div>
  );
};

export default Banner;
