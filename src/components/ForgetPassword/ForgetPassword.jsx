import React, { useState } from "react";
import axios from "axios";
import style from "../../CSS/PasswordHandle/ForgetPassword.module.scss";
import { useNavigate, Link } from "react-router-dom";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        { email },
        {
          headers: {
            token: token,
          },
        }
      );
      setMessage(response.data.message);
      setError("");
      localStorage.setItem("email", email);
      setTimeout(() => {
        navigate("/VerifyCode");
      }, 2000);
    } catch (err) {
      setError("Something went wrong. Please check your email and try again.");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.forget_password_container}>
      <div className={style.forget_password_box}>
        <div className={`${style.key_icon_container} mt-2 mb-4`}>
          <i className="fa-solid fa-key text-2xl text-[#2f5966]"></i>
        </div>
        <h2 className="font-bold mb-2 text-2xl text-center">
          Forgot Password?
        </h2>
        <p className="text-sm mb-5 text-gray-500 text-center">
          No worries, enter the email associated with your account.
        </p>

        <form onSubmit={handleSubmit}>
          <div className={style.form_group}>
            <label htmlFor="email" className={style.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={style.inputField_pass}
              placeholder="Enter your Email"
            />
          </div>

          <button
            type="submit"
            className={`${style.send_button} mb-1`}
            disabled={loading}
          >
            {loading ? (
              <i className="fa-solid fa-spinner animate-spin"></i>
            ) : (
              "Send"
            )}
          </button>
        </form>

        {message && <p className="text-green-600 mt-2 text-sm">{message}</p>}
        {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}

        <Link
          to="/login"
          className="text-sm text-gray-500 flex items-center gap-1 mt-2 justify-center"
        >
          <i className="fa-solid fa-arrow-left"></i> Back to login
        </Link>
      </div>
    </div>
  );
}
