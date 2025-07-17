import React, { useContext, useEffect, useState } from "react";
import Products from "../Products/Products";
import CatSlider from "../CatSlider/CatSlider";
import MainSlider from "../MainSlider/MainSlider";
import { cart } from "../CartContext/CartContext";

export default function Home() {
  const { getUserCart } = useContext(cart);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserCart();

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
        </div>
      ) : (
        <>
          <MainSlider />
          <CatSlider />
          <Products />
        </>
      )}
    </>
  );
}
