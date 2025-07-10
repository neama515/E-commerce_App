import axios from "axios";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function AllOrders() {
  let token = localStorage.getItem("token");
  let { id } = jwtDecode(token);
  const [orders, setOrders] = useState([]);

  async function getUserOrders() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        setOrders(res.data);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <div className="px-4 pt-14 lg:pt-16 sm:pt-16 sm:px-6 lg:px-8">
      {orders?.map((order) => (
        <div
          key={order.id}
          className="border my-4 rounded p-4 shadow-sm bg-white"
        >
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
            <div>
              <p className="text-sm">
                <span className="text-gray-400">Order ID:</span> <br />#
                {order.id}
              </p>
            </div>
            <div>
              <p className="text-sm">
                <span className="text-gray-400">Payment method:</span> <br />
                {order.paymentMethodType}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              {order.isPaid ? (
                <span className="bg-green-500 text-white rounded px-2 py-1 text-sm text-center">
                  Paid
                </span>
              ) : (
                <span className="bg-red-500 text-white rounded px-2 py-1 text-sm text-center">
                  Not Paid
                </span>
              )}
              {order.isDeliverd ? (
                <span className="bg-green-500 text-white rounded px-2 py-1 text-sm text-center">
                  Delivered
                </span>
              ) : (
                <span className="bg-red-500 text-white rounded px-2 py-1 text-sm text-center">
                  Not Delivered Yet
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {order.cartItems?.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition"
              >
                <img
                  className="rounded-t-lg object-cover w-full h-72 lg:h-40 sm:h-60 md:h-60"
                  src={item.product.imageCover}
                  alt={item.product.title}
                />
                <div className="p-4 h-36 flex flex-col justify-between">
                  <h5 className="text-sm font-bold text-gray-900 break-words">
                    {item.product.title}
                  </h5>
                  <div className="text-sm text-gray-700 flex justify-between">
                    <span>
                      <span className="font-bold">Count:</span> {item.count}
                    </span>
                    <span>{item.price} EGP</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
