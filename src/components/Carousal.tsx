"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const defaultSettings = {
  infinite: true,
  slidesToShow: 1,
  centerMode: true,
  slidesToScroll: 2,
  autoplay: true,
  autoplaySpeed: 300,
  arrows: false,
  swipe: true,
  dots: true,
  pauseOnHover: true,
};

export default function Carousel({ initialSettings = defaultSettings }) {
  const [settings, setSettings] = useState(initialSettings);

  return (
    <div>
      <Slider {...settings}>
        <div className="w-full">
          <img className="w-full" src="assets/c1.jpeg" alt="carousel" />
        </div>
        <div>
          <img className="w-full" src="assets/c2.jpeg" alt="carousel" />
        </div>
        <div>
          <img className="w-full" src="assets/c3.jpeg" alt="carousel" />
        </div>
        <div>
          <img className="w-full" src="assets/c4.jpeg" alt="carousel" />
        </div>
        <div>
          <img className="w-full" src="assets/c5.jpeg" alt="carousel" />
        </div>
        <div>
          <img className="w-full" src="assets/c6.jpeg" alt="carousel" />
        </div>
      </Slider>
    </div>
  );
}
