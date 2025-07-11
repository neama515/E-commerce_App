import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { theContext } from "../MyContext/MyContext";
import { cart } from "../CartContext/CartContext";

export default function Categories() {
  let { getUserCart } = useContext(cart);
  let { setToken } = useContext(theContext);
  let token = localStorage.getItem("token");

  const [categories, setCategories] = useState([]);
  const [catName, setCatName] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subLoading, setSubLoading] = useState(false);

  async function getCategories() {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCategories(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error", err.response?.data || err);
        setLoading(false);
      });
  }

  async function getSubCat(CatId) {
    setSubLoading(true);
    axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/categories/${CatId}/subcategories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setSubCategories(res.data.data);
        setSubLoading(false);
      })
      .catch((err) => {
        console.error("Error", err.response?.data || err);
        setSubLoading(false);
      });
  }
  async function getSpecificSubCat(subCatId) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories/${subCatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error", err.response?.data || err);
        if (err.response?.data?.errors) {
          console.error("Validation Errors:", err.response.data.errors);
        }
      });
  }
  useEffect(() => {
    getUserCart();
    getCategories();
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full h-[70vh] flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-700 border-t-transparent"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 pt-20 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-10 lg:px-28 gap-5">
          {categories?.map((ob) => (
            <a
              key={ob._id}
              href="#sec"
              onClick={(e) => {
                e.preventDefault(); 
                if (typeof setCatName === "function") setCatName(ob.name);
                if (typeof getSubCat === "function") getSubCat(ob._id);

               
                setTimeout(() => {
                  const secElement = document.getElementById("sec");
                  if (secElement) {
                    secElement.scrollIntoView({ behavior: "smooth" });
                  }
                }, 100); 
              }}
              className="bg-white border h-96 hover:shadow-md hover:shadow-green-700 border-gray-200 rounded-lg shadow-sm flex flex-col"
            >
              <img
                className="rounded-t-lg object-cover w-full h-3/4"
                src={ob.image}
                alt={ob.name}
              />
              <div className="p-3 h-1/4 flex items-center justify-center">
                <h5 className="font-bold text-xl sm:text-2xl text-green-700 text-center">
                  {ob.name}
                </h5>
              </div>
            </a>
          ))}
        </div>
      )}

      {catName && (
        <>
          <h2
            id="sec"
            className="font-bold text-2xl sm:text-3xl text-center mt-10 mb-4 text-green-700"
          >
            {catName + " Subcategories"}
          </h2>

          {subLoading ? (
            <div className="w-full h-40 flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-700 border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-10 lg:px-28 pb-10">
              {subCategories?.map((sub) => (
                <p
                  key={sub._id}
                  className="border border-gray-400 rounded py-3 px-6 text-lg sm:text-xl text-center hover:shadow-md hover:shadow-green-700"
                >
                  {sub.name}
                </p>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
