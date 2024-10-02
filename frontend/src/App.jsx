import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AppLayout from "./components/Layout/AppLayout";
import Product from "./pages/Product";
import ErrorPage from "./pages/ErrorPage";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact.jsx";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import { productLoader } from "./api/getProductCat.jsx";
import { productByIdLoader } from "./api/getProductById.jsx";
import Logout from "./pages/Logout.jsx";
import { getCartProduct } from "./api/getCartProduct.jsx";
import OrderHistory from "./pages/OrderHistory.jsx";
import { getUserOrder } from "./api/getUserOrder.jsx";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
          loader: productLoader,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "product",
          element: <Product />,
          loader: productLoader,
        },
        {
          path: "product/:productId",
          element: <ProductDetail />,
          loader: productByIdLoader,
        },
        {
          path: "about",
          element: <AboutUs />,
        },
        {
          path: "cart/:userId",
          element: <CartPage />,
          loader: getCartProduct,
        },
        {
          path: "logout",
          element: <Logout />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "orderHistory/:userId",
          element: <OrderHistory />,
          loader: getUserOrder,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
