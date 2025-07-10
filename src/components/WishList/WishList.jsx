import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { wishlist } from "../WishlistContext/WishlistContext";
import { cart } from "../CartContext/CartContext";

export default function WishList() {
  let token = localStorage.getItem("token");
  let { getUserWishlist, wishlistProducts, deleteItem } = useContext(wishlist);
  let { addToCart } = useContext(cart);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      await getUserWishlist();
      setLoading(false);
    };
    fetchWishlist();
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex items-center justify-center">
          <i className="fa-solid fa-spinner fa-spin text-4xl text-green-600"></i>
        </div>
      )}

      <div className="pt-20 relative overflow-x-auto  sm:rounded-lg mx-4 sm:mx-10 mb-10 ">
        <table className="w-full text-sm text-center bg-gray-50  rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-lg">
            <tr>
              <th scope="col" className="px-2 sm:px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-2 sm:px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-2 sm:px-6 py-3 whitespace-nowrap">
                Add to cart
              </th>

              <th scope="col" className="px-2 sm:px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-2 sm:px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="rounded-lg ">
            {wishlistProducts?.length === 0 ? (
              <tr>
                <td className="text-center w-full p-5 text-red-500" colSpan="5">
                  There is No items in wishlist
                </td>
              </tr>
            ) : (
              wishlistProducts?.map((product, index) => (
                <tr
                  key={index}
                  className="dark:text-gray-400 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 bg-gray-50 dark:hover:bg-gray-600 rounded-lg"
                >
                  <td className="">
                    <img
                      src={product.imageCover}
                      className="w-96 lg:w-32 m-2 lg:m-4 md:w-32 max-w-full max-h-full"
                      alt={product.title}
                    />
                  </td>
                  <td className="px-4 sm:px-6 py-4  font-semibold text-gray-900 dark:text-white">
                    {product.title}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <button
                      onClick={() => {
                        addToCart(product.id);
                        deleteItem(product.id);
                      }}
                      className="hover:bg-green-700 bg-green-500 border px-3 w-fit mt-2 py-1 border-green-500 text-white rounded-md"
                    >
                      Add
                    </button>
                  </td>
                  <td className="px-4 sm:px-6 py-4 font-semibold  whitespace-nowrap text-gray-900 dark:text-white">
                    {product.price} EGP
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <button
                      onClick={() => deleteItem(product.id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
