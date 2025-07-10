import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "../../CSS/PasswordHandle/ForgetPassword.module.scss";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = localStorage.getItem("email");
    if (!email) {
      setError("Email not found. Please try again.");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          email: email,
          newPassword: newPassword,
        }
      );
      setMessage(response.data.message);
      setError("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error!!!");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-20 flex justify-center items-center">
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
            <i className="fa-solid fa-lock text-2xl text-[#2f5966]"></i>
          </div>
          <h2 className="font-bold mb-2 text-2xl">Reset Password</h2>
          <p className="text-sm mb-5 text-gray-500 text-center">
            Please enter your new password.
          </p>
          <form onSubmit={handleSubmit}>
            <div className={`${style.form_group}`}>
              <label htmlFor="newPassword" className={`${style.label}`}>
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className={`${style.inputField_pass}`}
                placeholder="Enter New Password"
              />
            </div>
            <div className={`${style.form_group}`}>
              <label htmlFor="confirmPassword" className={`${style.label}`}>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={`${style.inputField_pass}`}
                placeholder="Confirm New Password"
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
                "Reset Password"
              )}
            </button>
          </form>
          {message && <p className="mt-2 text-green-600">{message}</p>}
          {error && <p className="text-red-600 mt-1">{error}</p>}
          <a
            href="/sign-in"
            className="text-center text-sm text-gray-500 block mt-4"
          >
            <i className="fa-solid fa-arrow-left"></i> Back to log in
          </a>
        </div>
      </div>
    </>
  );
}
