import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { theContext } from "../MyContext/MyContext";
import { FaStar } from "react-icons/fa";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { setToken } = useContext(theContext);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  async function getSpecificProduct(id) {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setProduct(res.data.data);
    } catch (err) {
      console.error("Error", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getSpecificProduct(id);
  }, [id]);

  if (loading || !product) {
    return (
      <div className="fixed inset-0 z-50 bg-white bg-opacity-60 flex items-center justify-center">
        <div className="border-4 border-green-600 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-28 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="w-full">
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-full h-auto max-h-[500px] object-contain rounded-lg shadow"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-800">{product.title}</h3>
          <p className="text-gray-600">{product.description}</p>

          <div className="flex justify-between items-center text-sm font-medium text-gray-700">
            {product.priceAfterDiscount ? (
              <div>
                <span className="line-through text-red-600 mr-2">
                  {product.price} EGP
                </span>
                <span className="text-green-700">
                  {product.priceAfterDiscount} EGP
                </span>
              </div>
            ) : (
              <p>{product.price} EGP</p>
            )}
            <p className="flex items-center gap-1">
              <FaStar className="text-yellow-400" />
              {product.ratingsAverage}
            </p>
          </div>

          <button className="w-full sm:w-[80%] bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-lg transition duration-200">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
