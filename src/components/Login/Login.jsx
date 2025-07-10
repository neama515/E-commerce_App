import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { theContext } from "../MyContext/MyContext";

export default function Login() {
  let navigate = useNavigate();
  const [errorApi, setErrorApi] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useContext(theContext);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/,
        "Password must be 8–15 characters and include uppercase, lowercase, digit, and special character."
      )
      .required("Password is required"),
  });

  const formikRegister = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: submitData,
  });

  function submitData(values) {
    setIsLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          setErrorApi(error.response.data.message);
        } else {
          setErrorApi("Login failed. Please try again.");
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative px-4">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <i className="fas fa-spin fa-spinner text-3xl text-white"></i>
        </div>
      )}

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="font-bold text-2xl text-center mb-6 text-green-700">
          Login
        </h2>

        {errorApi && (
          <div
            className="p-3 text-sm text-red-800 bg-red-100 rounded mb-4"
            role="alert"
          >
            {errorApi}
          </div>
        )}

        <form onSubmit={formikRegister.handleSubmit} className="space-y-5">
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
              {...formikRegister.getFieldProps("email")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-green-500 focus:border-green-500"
              placeholder="name@example.com"
            />
            {formikRegister.touched.email && formikRegister.errors.email && (
              <p className="mt-1 text-sm text-red-600">
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
              {...formikRegister.getFieldProps("password")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-green-500 focus:border-green-500"
              placeholder="••••••••"
            />
            {formikRegister.touched.password &&
              formikRegister.errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {formikRegister.errors.password}
                </p>
              )}
          </div>

          <div className="flex items-center justify-between">
            <Link
              to="/ForgetPassword"
              className="text-green-700 text-sm hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={
              !formikRegister.isValid || !formikRegister.dirty || isLoading
            }
            className={`w-full py-2.5 rounded-lg text-white text-center font-medium ${
              !formikRegister.isValid || !formikRegister.dirty || isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isLoading ? (
              <i className="fas fa-spin fa-spinner"></i>
            ) : (
              "Login Now"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
