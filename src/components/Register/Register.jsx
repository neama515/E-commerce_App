import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {
  let navigate = useNavigate();
  const [errorApi, setErrorApi] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name cannot exceed 50 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/,
        "Password must be 8–15 characters, include uppercase, lowercase, number, and special char."
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    phone: Yup.string()
      .matches(/^01[1250][0-9]{8}$/, "Invalid Egyptian phone number")
      .required("Phone is required"),
  });

  const formikRegister = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
    onSubmit: submitData,
    validationSchema,
  });

  function submitData(values) {
    setIsLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, {
        name: values.fullname,
        email: values.email,
        password: values.password,
        rePassword: values.confirmPassword,
        phone: values.phone,
      })
      .then((res) => {
        navigate("/login");
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          setErrorApi(error.response.data.message);
        } else {
          console.error("Axios error:", error.message);
        }
        setIsLoading(false);
      });
  }

  return (
    <div className="px-4 sm:px-10 pt-20 md:px-20 lg:px-32 py-10 relative">
      {isLoading && (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-60 z-50 flex justify-center items-center">
          <div className="animate-spin h-12 w-12 rounded-full border-4 border-green-700 border-t-transparent"></div>
        </div>
      )}
      <h2 className="text-2xl font-bold mb-6 text-center">Register Now</h2>

      {errorApi && (
        <div className="p-4 text-sm text-red-800 bg-red-100 rounded mb-5 text-center">
          {errorApi}
        </div>
      )}

      <form onSubmit={formikRegister.handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="fullname"
            className="block mb-1 font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            value={formikRegister.values.fullname}
            onBlur={formikRegister.handleBlur}
            onChange={formikRegister.handleChange}
            className="w-full border border-gray-300 rounded p-2.5 focus:outline-none focus:ring focus:ring-green-300"
            placeholder="e.g., Ahmed Mohamed"
          />
          {formikRegister.errors.fullname &&
            formikRegister.touched.fullname && (
              <p className="text-red-600 text-sm mt-1">
                {formikRegister.errors.fullname}
              </p>
            )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-1 font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formikRegister.values.email}
            onBlur={formikRegister.handleBlur}
            onChange={formikRegister.handleChange}
            className="w-full border border-gray-300 rounded p-2.5 focus:outline-none focus:ring focus:ring-green-300"
            placeholder="name@example.com"
          />
          {formikRegister.errors.email && formikRegister.touched.email && (
            <p className="text-red-600 text-sm mt-1">
              {formikRegister.errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-1 font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formikRegister.values.password}
            onBlur={formikRegister.handleBlur}
            onChange={formikRegister.handleChange}
            className="w-full border border-gray-300 rounded p-2.5 focus:outline-none focus:ring focus:ring-green-300"
          />
          {formikRegister.errors.password &&
            formikRegister.touched.password && (
              <p className="text-red-600 text-sm mt-1">
                {formikRegister.errors.password}
              </p>
            )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block mb-1 font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={formikRegister.values.confirmPassword}
            onBlur={formikRegister.handleBlur}
            onChange={formikRegister.handleChange}
            className="w-full border border-gray-300 rounded p-2.5 focus:outline-none focus:ring focus:ring-green-300"
          />
          {formikRegister.errors.confirmPassword &&
            formikRegister.touched.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">
                {formikRegister.errors.confirmPassword}
              </p>
            )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block mb-1 font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={formikRegister.values.phone}
            onBlur={formikRegister.handleBlur}
            onChange={formikRegister.handleChange}
            className="w-full border border-gray-300 rounded p-2.5 focus:outline-none focus:ring focus:ring-green-300"
            placeholder="01xxxxxxxxx"
          />
          {formikRegister.errors.phone && formikRegister.touched.phone && (
            <p className="text-red-600 text-sm mt-1">
              {formikRegister.errors.phone}
            </p>
          )}
        </div>

        <button
          disabled={
            !formikRegister.isValid || !formikRegister.dirty || isLoading
          }
          type="submit"
          className={`w-full sm:w-auto px-6 py-3 rounded text-white text-sm font-semibold transition ${
            !formikRegister.isValid || !formikRegister.dirty || isLoading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isLoading ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            "Register Now"
          )}
        </button>
      </form>
    </div>
  );
}
