import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import img1 from "../../Images/img1.jpg";
import img2 from "../../Images/img2.jpg";
import img3 from "../../Images/img3.jpg";
import img4 from "../../Images/img4.jpg";
import img5 from "../../Images/img5.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MainSlider() {
  const [loading, setLoading] = useState(true);

  const images = [img3, img4, img5];

  useEffect(() => {
    const imgPromises = images.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
        })
    );
    Promise.all(imgPromises).then(() => setLoading(false));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="mb-0 lg:mb-28 pb-5 px-4 ">
      {loading ? (
        <div className="flex justify-center items-center h-[500px]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 pt-[70px] md:grid-cols-3 lg:grid-cols-3 gap-4">
          <div className="md:col-span-2 h-[300px] md:h-[500px] pb-0 mb-2 lg:h-[600px]">
            <Slider {...settings}>
              {images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`slide-${index}`}
                  className="object-contain w-full h-[300px] md:h-[500px] lg:h-[600px]"
                />
              ))}
            </Slider>
          </div>
          <div className="flex flex-col gap-2 h-[300px] md:h-[500px] lg:h-[600px]">
            <img
              src={img1}
              alt="img1"
              className="object-cover w-full h-[50%] rounded-md"
            />
            <img
              src={img2}
              alt="img2"
              className="object-cover w-full h-[50%] rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
}
