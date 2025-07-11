import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { cart } from "../CartContext/CartContext";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { cartId } = useContext(cart);

  const [payment, setPayment] = useState("Cash");
  const [isLoading, setIsLoading] = useState(false);

  function handleCashPayment(values) {
    setIsLoading(true);
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress: {
            details: values.details,
            phone: values.phone,
            city: values.city,
          },
        },
        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => {
        navigate("/allorders");
      })
      .catch((error) => {
        console.error("Error:", error.response?.data || error);
      })
      .finally(() => setIsLoading(false));
  }

  function handleOnlinePayment(values) {
    setIsLoading(true);
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        {
          shippingAddress: {
            details: values.details,
            phone: values.phone,
            city: values.city,
          },
        },
        {
          headers: { token },
          params: {
           
              url: "https://neama515.github.io/E-commerce_App/#",
          },
        }
      )
      .then((res) => {
        window.open(res.data.session.url, "_self");
      })
      .catch((error) => {
        console.error("Error:", error.response?.data || error);
      })
      .finally(() => setIsLoading(false));
  }

  function handlePayment(values) {
    payment === "cash"
      ? handleCashPayment(values)
      : handleOnlinePayment(values);
  }

  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number")
      .required("Phone is required"),
    details: Yup.string()
      .min(10, "Minimum 10 characters")
      .max(500, "Maximum 500 characters")
      .required("Details are required"),
    city: Yup.string()
      .min(2, "Minimum 2 characters")
      .max(50, "Maximum 50 characters")
      .required("City is required"),
  });

  const formikPayment = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: handlePayment,
  });

  return (
    <div className="pt-28 lg:pt-32 px-4 sm:px-10 md:px-20">
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-25 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
        </div>
      )}

      <form
        onSubmit={formikPayment.handleSubmit}
        className="flex flex-col gap-6 max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-bold text-center text-green-600">
          Checkout
        </h2>

        <div>
          <label
            htmlFor="details"
            className="text-sm font-medium text-gray-700"
          >
            Address Details
          </label>
          <input
            type="text"
            id="details"
            {...formikPayment.getFieldProps("details")}
            className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
          />
          {formikPayment.touched.details && formikPayment.errors.details && (
            <div className="text-sm text-red-600 mt-1">
              {formikPayment.errors.details}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            {...formikPayment.getFieldProps("phone")}
            className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
          />
          {formikPayment.touched.phone && formikPayment.errors.phone && (
            <div className="text-sm text-red-600 mt-1">
              {formikPayment.errors.phone}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="city" className="text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            {...formikPayment.getFieldProps("city")}
            className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
          />
          {formikPayment.touched.city && formikPayment.errors.city && (
            <div className="text-sm text-red-600 mt-1">
              {formikPayment.errors.city}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={() => setPayment("cash")}
            disabled={!formikPayment.isValid || !formikPayment.dirty}
            type="submit"
            className={`w-full sm:w-1/2 px-4 py-2 rounded text-white font-medium ${
              !formikPayment.isValid || !formikPayment.dirty
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Cash Payment
          </button>

          <button
            onClick={() => setPayment("online")}
            disabled={!formikPayment.isValid || !formikPayment.dirty}
            type="submit"
            className={`w-full sm:w-1/2 px-4 py-2 rounded text-white font-medium ${
              !formikPayment.isValid || !formikPayment.dirty
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Online Payment
          </button>
        </div>
      </form>
    </div>
  );
}
