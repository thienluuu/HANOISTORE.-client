import React from "react";

import "./SliderShow.scss";

import BannerImg from "../../../../assets/banner-img.png";
import BannerImg1 from "../../../../assets/products/earbuds-prod-4.webp";
import BannerImg2 from "../../../../assets/products/speaker-prod-3.webp";
import BannerImg3 from "../../../../assets/products/w8.webp";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderShow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  return (
    <div className="slider">
      <Slider {...settings}>
        <div className="slider-item">
          <img className="banner-img" src={BannerImg} alt="" />
        </div>
        <div>
          <img className="banner-img" src={BannerImg1} alt="" />
        </div>
        <div>
          <img className="banner-img" src={BannerImg2} alt="" />
        </div>
        <div>
          <img className="banner-img" src={BannerImg3} alt="" />
        </div>
      </Slider>
    </div>
  );
};

export default SliderShow;
