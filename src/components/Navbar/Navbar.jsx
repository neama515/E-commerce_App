import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { cart } from "../CartContext/CartContext";
import { theContext } from "../MyContext/MyContext";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const { token, setToken } = useContext(theContext);
  const { cartCounter } = useContext(cart);
  const [menuOpen, setMenuOpen] = useState(false);

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-green-600 font-semibold"
      : "text-gray-700 hover:text-green-600";

  return (
    <nav className="bg-gray-50 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center space-x-2 font-bold text-2xl">
          <i className="fa-solid fa-cart-shopping text-3xl text-green-600"></i>
          <span >Fresh Cart</span>
        
          </NavLink>
       

        <ul className="hidden lg:flex items-center gap-6 text-gray-700 font-medium">
          {token && (
            <>
              <li>
                <NavLink to="/" className={navLinkClass}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart" className={navLinkClass}>
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink to="/wishlist" className={navLinkClass}>
                  Wish List
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className={navLinkClass}>
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/categories" className={navLinkClass}>
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink to="/brands" className={navLinkClass}>
                  Brands
                </NavLink>
              </li>
            </>
          )}
        </ul>

        <div className="flex items-center gap-4">
          {token && (
            <NavLink to="/cart" className="relative">
              <i className="fa-solid fa-cart-shopping text-2xl sm:text-3xl text-gray-700"></i>
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartCounter}
              </span>
            </NavLink>
          )}

          <div className="flex gap-1 items-center text-gray-700">
            {token ? (
              <button onClick={logout} className="hover:text-green-600">
                Logout
              </button>
            ) : (
              <>
                <NavLink to="/" className={navLinkClass}>
                  Home |
                </NavLink>
                <NavLink to="/login" className={navLinkClass}>
                  Login |
                </NavLink>
                <NavLink to="/register" className={navLinkClass}>
                Register
                </NavLink>
              </>
            )}
          </div>

          {token && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-2xl text-gray-700"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          )}
        </div>

      {token && menuOpen && (
        <div className="lg:hidden bg-gray-100 px-4 py-4 space-y-4 text-gray-700 font-medium">
          <ul className="flex flex-col gap-4">
            <li>
              <NavLink
                to="/"
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/wishlist"
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                Wish List
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/brands"
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                Brands
              </NavLink>
            </li>
            <li>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="hover:text-green-600"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
      </div>
    </nav>
  );
}
