import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { theContext } from "../MyContext/MyContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CatSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 6,
    autoplay: true,
    autoplaySpeed: 2000,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setToken } = useContext(theContext);
  const token = localStorage.getItem("token");

  async function getCatSlider() {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCategories(res.data.data);
    } catch (err) {
      console.error("Error", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCatSlider();
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12  pb-10">
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
        </div>
      ) : (
        <Slider {...settings}>
          {categories?.map((cat) => (
            <div key={cat._id} className="px-2">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <img
                  src={cat.image}
                  className="h-48 w-full object-cover"
                  alt={cat.name}
                />
                <div className="p-2 text-center">
                  <h4 className="font-semibold text-base sm:text-lg text-green-700">
                    {cat.name}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
