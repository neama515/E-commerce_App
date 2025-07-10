import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export let wishlist = createContext();
export default function WishListContext({ children }) {
const [wishlistProducts, setwishlistProducts] = useState([])
  let token = localStorage.getItem("token");
  
  async function addToWishlist(id) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: id,
        },
        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }
  async function getUserWishlist() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        setwishlistProducts(res.data.data);

        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }
  async function deleteItem(id) {
    return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,

        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => {
        const updatedWishlist = wishlistProducts.filter(
          (p) => p.id !== id
        );
        setwishlistProducts(updatedWishlist);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }
    useEffect(() => {
getUserWishlist()  
      }, [])
  return (
    <wishlist.Provider
      value={{
        addToWishlist,
        wishlistProducts,
        getUserWishlist,
        deleteItem
      }}
    >
      {children}
    </wishlist.Provider>
  );
}
