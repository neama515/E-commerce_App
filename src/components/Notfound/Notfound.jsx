import React from "react";
import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-extrabold text-green-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
