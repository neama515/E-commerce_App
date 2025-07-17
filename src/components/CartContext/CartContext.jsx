import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export let cart = createContext()
export default function CartContext({children}) {
  const [cartData, setCartData] = useState("")
  const [cartOwner, setCartOwner] = useState("");
  const [totalCartprice, setTotalCartprice] = useState("");
  const [cartCounter, setCartCounter] = useState(0)
  const [cartId, setCartId] = useState(0)
    let token = localStorage.getItem("token");
   async function addToCart(id){
  
      return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
          productId:id,
        },{
            headers:{
                token:token
            }
        }).then((res)=>{console.log(res);
          localStorage.setItem("cartCount", cartCounter);
          setCartData(res.data.data);

            return true
        }).catch((error)=>{console.log(error);return false;
        })
    }
   async function updateCart(id,count){
      return axios
        .put(
          `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
          {
            
              count: count
          
          },
          {
            headers: {
              token: token,
            },
          }
        )
        .then((res) => {
          setCartData(res.data.data);
          setTotalCartprice(res.data.data.totalCartPrice);
          setCartCounter(res.data.numOfCartItems);
          localStorage.setItem("cartCount", cartCounter);

          return true;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
    }
   async function getUserCart(){
      return axios
        .get(
          `https://ecommerce.routemisr.com/api/v1/cart`,
          {
            headers: {
              token: token,
            },
          }
        )
        .then((res) => {
          console.log('======cartcontext==============================');
          console.log(res);
          console.log('====================================');
         setCartId(res.data.cartId);
          setCartData(res.data.data);
          setTotalCartprice(res.data.data.totalCartPrice);
          setCartOwner(res.data.data.cartOwner);
          setCartCounter(res.data.numOfCartItems);
          localStorage.setItem("cartCount", cartCounter);

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
          `https://ecommerce.routemisr.com/api/v1/cart/${id}`,

          {
            headers: {
              token: token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setCartData(res.data.data);
          setTotalCartprice(res.data.data.totalCartPrice);
          setCartCounter(res.data.numOfCartItems);
          localStorage.setItem("cartCount", cartCounter);

          return true;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
    }
    useEffect(() => {
      localStorage.setItem("cartCount", cartCounter);

    }, [])
    
  return (
    <cart.Provider
      value={{ addToCart, getUserCart,cartOwner, cartCounter,setCartCounter,cartId, cartData,setCartData, totalCartprice ,updateCart,deleteItem}}
    >
      {children}
    </cart.Provider>
  );
}
