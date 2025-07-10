import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { cart } from "../CartContext/CartContext";
import { wishlist } from "../WishlistContext/WishlistContext";
import { theContext } from "../MyContext/MyContext";
import toast from "react-hot-toast";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const { addToCart, cartData, getUserCart, cartCounter, updateCart } =
    useContext(cart);

  const { addToWishlist, wishlistProducts, getUserWishlist, deleteItem } =
    useContext(wishlist);

  const { setToken } = useContext(theContext);

  useEffect(() => {
    getProducts();
    getUserCart();
    getUserWishlist(); 
  }, []);

  async function getProducts() {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setProducts(res.data.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }

  async function updateCartQty(id, count) {
    await updateCart(id, count);
  }

  async function addProductToCart(id) {
    let flag = await addToCart(id);
    const productInCart = cartData?.products.find(
      (item) => item.product._id === id
    );

    if (!productInCart) {
      await updateCartQty(id, cartCounter + 1);
      if (flag) {
        toast.success("Product added to cart", { position: "top-right" });
      } else {
        toast.error("Error adding to cart", { position: "top-right" });
      }
    } else {
      toast("Product already in cart", { position: "top-right" });
    }
  }

  async function addProductToWishlist(id) {
    const alreadyInWishlist = wishlistProducts.some((item) => item.id === id);
    if (!alreadyInWishlist) {
      const flag = await addToWishlist(id);
      if (flag) {
        getUserWishlist();
        toast.success("Added to wishlist", { position: "top-right" });
      } else {
        toast.error("Failed to add to wishlist", { position: "top-right" });
      }
    } else {
      toast("Product already in wishlist", { position: "top-right" });
    }
  }

  return (
    <div className="px-4 md:px-10 pt-20 lg:px-14 py-8">
      {loading ? (
        <div className="flex justify-center items-center h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="text-start p-3 relative overflow-hidden group hover:shadow-lg shadow-green-700 rounded-md bg-white"
            >
              <Link to={`/productDetails/${product.id}`}>
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-80 object-cover rounded"
                />
                <h5 className="text-[#4fa74f] mt-2 text-sm">
                  {product.category.name}
                </h5>
                <h3 className="font-semibold text-base">
                  {product.title.split(" ", 2).join(" ")}
                </h3>
                <div className="flex justify-between items-center text-sm mt-1">
                  {product.priceAfterDiscount ? (
                    <div>
                      <span className="line-through text-red-600 mr-1">
                        {product.price}
                      </span>
                      <span>{product.priceAfterDiscount} EGP</span>
                    </div>
                  ) : (
                    <p>{product.price} EGP</p>
                  )}
                  <p className="flex items-center gap-1">
                    <FaStar className="text-yellow-400 text-sm" />
                    {product.ratingsAverage}
                  </p>
                </div>
                {product.priceAfterDiscount && (
                  <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                    Sale
                  </span>
                )}
              </Link>

              <button
                onClick={() => {
                  addProductToCart(product.id);
                  deleteItem(product.id); 
                }}
                className="group-hover:translate-y-0 group-hover:text-white group-hover:bg-green-700 border border-green-700 text-green-700 w-full mt-3 py-2 rounded transition-all duration-300 translate-y-[200%]"
              >
                Add to cart
              </button>

              {wishlistProducts.some((w) => w.id === product.id) ? (
                <i
                  onClick={() => {
                    deleteItem(product.id);
                    toast("Removed from wishlist", { position: "top-right" });
                  }}
                  className="absolute top-3 left-3 cursor-pointer fa-2x fas fa-heart text-red-500"
                ></i>
              ) : (
                <i
                  onClick={() => {
                    addProductToWishlist(product.id);
                  }}
                  className="absolute top-3 left-3 cursor-pointer fa-2x fas fa-heart text-gray-400"
                ></i>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
