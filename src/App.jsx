import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import Navbar from "./components/Navbar/Navbar";
import Notfound from "./components/Notfound/Notfound";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import MyContext from "./components/MyContext/MyContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import "flowbite";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartContext from "./components/CartContext/CartContext";
import {Toaster} from "react-hot-toast"
import WishList from "./components/WishList/WishList";
import WishListContext from "./components/WishlistContext/WishlistContext";
import Payment from "./components/Payment/Payment";
import AllOrders from "./components/AllOrders/AllOrders";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import VerifyCode from "./components/VerifyCode/VerifyCode";
import ResetPassword from "./components/ResetPassword/ResetPassword";
let client = new QueryClient();
const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            {" "}
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            {" "}
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "productDetails/:id",
        element: (
          <ProtectedRoute>
            {" "}
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            {" "}
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      { path: "/ForgetPassword", element: <ForgetPassword /> },
      { path: "/VerifyCode", element: <VerifyCode /> },
      { path: "/ResetPassword", element: <ResetPassword /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <MyContext >
      <CartContext>
        <WishListContext>
          <QueryClientProvider client={client}>
            {" "}
            <RouterProvider router={router}></RouterProvider>
            <Toaster />
          </QueryClientProvider>
        </WishListContext>
      </CartContext>
    </MyContext>
  );
}

export default App;
