import React, { useContext, useEffect } from "react";
import CartContext, { cart } from "../CartContext/CartContext";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Cart() {
  let token = localStorage.getItem("token");

  let {
    getUserCart,
    cartCounter,
    cartData,
    setCartData,
    totalCartprice,
    updateCart,
    deleteItem,
    setCartCounter,
  } = useContext(cart);
  async function updateCartQty(id, count) {
    let flag = await updateCart(id, count);
    console.log("====================================");
    console.log(flag);
    console.log("====================================");
    if (flag) {
      toast.success("Product added successfully ", {
        position: "top-right",
      });
    } else {
      toast.error("Can't add product now", {
        position: "top-right",
      });
    }
  }
  async function clearCart() {
    return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,

        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setCartData({ products: [], totalCartPrice: 0 });
        setCartCounter(0);

        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }
  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <div className="space-y-6 px-4 pt-20 sm:px-6 lg:px-20 ">
      <div className="flex flex-wrap justify-between items-center bg-gray-50 p-4 rounded-lg shadow">
        <span className="font-semibold text-gray-700 uppercase">
          Cart items: <span className="text-green-500">{cartCounter}</span>
        </span>
        {cartData?.products?.length === 0 ? (
          <button
            disabled
            className="bg-gray-400 px-4 py-1 text-white rounded-md"
          >
            Checkout
          </button>
        ) : (
          <Link
            to={"/payment"}
            className="bg-green-500 hover:bg-green-700 px-4 py-1 text-white rounded-md"
          >
            Checkout
          </Link>
        )}
      </div>

      {cartData?.products?.length === 0 ? (
        <div className="text-center text-red-500 font-medium py-8">
          There are no items in the cart
        </div>
      ) : (
        <>
          {cartData?.products?.map((product) => (
            <div
              key={product.product.id}
              className="flex flex-col gap-3 p-4 bg-gray-50 rounded-lg shadow"
            >
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <img
                  src={product.product.imageCover}
                  className="w-full h-72 sm:w-24 sm:h-24 object-cover rounded"
                  alt={product.product.title}
                />

                <div className="flex-1">
                  <p className="text-base font-semibold text-gray-900">
                    {product.product.title}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {product.price} EGP
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateCartQty(product.product.id, product.count - 1)
                    }
                    className="w-8 h-8 flex items-center justify-center border rounded-full text-lg font-bold text-gray-700 bg-white hover:bg-gray-100"
                  >
                    –
                  </button>
                  <span className="text-sm w-6 text-center">
                    {product.count}
                  </span>
                  <button
                    onClick={() =>
                      updateCartQty(product.product.id, product.count + 1)
                    }
                    className="w-8 h-8 flex items-center justify-center border rounded-full text-lg font-bold text-gray-700 bg-white hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => deleteItem(product.product.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-100 p-4 rounded-md">
            <p className="font-bold text-gray-900 mb-2 sm:mb-0">
              Total: {totalCartprice} EGP
            </p>
            <button
              onClick={clearCart}
              className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}
