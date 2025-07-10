import React, { useState } from "react";
import axios from "axios";
import style from "../../CSS/PasswordHandle/ForgetPassword.module.scss";
import { useNavigate } from "react-router-dom";

export default function VerifyCode() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      resetCode: code,
    };
    console.log("Data being sent to API:", data);

    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        data
      );
      console.log("====================================");
      console.log(response);
      console.log("====================================");
      setMessage(response.data.message);
      setError("");
      navigate("/ResetPassword");
    } catch (err) {
      setError("Error!!!");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex justify-center items-center">
          <i className="fa-solid fa-spinner fa-spin text-4xl text-green-700"></i>
        </div>
      )}

      <div
        className={`${style.forget_password_container} min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 py-8 bg-gray-50`}
      >
        <div
          className={`${style.forget_password_box} w-full max-w-md bg-white p-6 rounded-lg shadow-lg`}
        >
          <div className={`${style.key_icon_container} mt-2 mb-4`}>
            <i className="fa-solid fa-envelope text-2xl text-[#2f5966]"></i>
          </div>
          <h2 className="font-bold mb-2 text-2xl">Verify Code</h2>
          <p className="text-sm mb-5 text-gray-500 text-center">
            Please enter the verification code sent to your email.
          </p>
          <form onSubmit={handleSubmit}>
            <div className={`${style.form_group}`}>
              <label htmlFor="code" className={`${style.label}`}>
                Verification Code
              </label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className={`${style.inputField_pass}`}
                placeholder="Enter Verification Code"
              />
            </div>
            <button
              type="submit"
              className={`${style.send_button} mb-1`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <i className="fa-solid fa-spinner animate-spin"></i>
                </div>
              ) : (
                "Verify"
              )}
            </button>
          </form>
          {message && <p className="mt-2">{message}</p>}
          {error && <p className="text-red-600 mt-1">{error}</p>}
          <a
            href="/login"
            className="text-center text-sm text-gray-500 block mt-4"
          >
            <i className="fa-solid fa-arrow-left"></i> Back to log in
          </a>
        </div>
      </div>
    </>
  );
}
