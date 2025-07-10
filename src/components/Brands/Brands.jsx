import React, { useContext, useEffect, useState } from "react";
import { theContext } from "../MyContext/MyContext";
import axios from "axios";
import { Modal } from "flowbite-react";
import { cart } from "../CartContext/CartContext";

export default function Brands() {
  let { setToken } = useContext(theContext);
  let token = localStorage.getItem("token");
  const [brands, setBrands] = useState([]);
  const [specificBrand, setSpecificBrand] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  let { getUserCart } = useContext(cart);

  useEffect(() => {
    getUserCart();
  }, []);

  async function getBrands() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setBrands(res.data.data);
      })
      .catch((err) => {
        console.error("Error", err.response?.data || err);
      });
  }

  async function getSpecificBrand(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setSpecificBrand(res.data.data);
      })
      .catch((err) => {
        console.error("Error", err.response?.data || err);
      });
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <h2 className="text-green-700 text-3xl font-bold text-center mt-6">
        All Brands
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 text-center px-4 sm:px-8 py-6">
        {brands?.map((brand) => (
          <div
            key={brand._id}
            onClick={() => {
              setOpenModal(true);
              getSpecificBrand(brand._id);
            }}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:shadow-green-700 cursor-pointer transition"
          >
            <img
              className="rounded-t-lg w-full h-48 object-cover"
              src={brand.image}
              alt={brand.name}
            />
            <div className="p-5">
              <h5 className="text-lg font-bold tracking-tight text-gray-800">
                {brand.name}
              </h5>
            </div>
          </div>
        ))}
      </div>

      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="px-4 sm:px-10 lg:px-80 w-full inset-0"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center text-center">
            <h5 className="text-green-700 text-2xl font-bold">
              {specificBrand.name}
            </h5>
            <img
              className="rounded w-full max-h-72 object-contain"
              src={specificBrand.image}
              alt={specificBrand.name}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
