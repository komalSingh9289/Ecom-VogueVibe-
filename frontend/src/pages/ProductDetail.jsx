import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AddToCart } from "../components/AddToCart.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../store/auth.jsx";

const ProductDetail = () => {
  const { category, product } = useLoaderData();
  const { isLoggedIn , user } = useAuth();

  if (!product) {
    return <p>Product not found</p>;
  }
  const getCategoryName = (categoryId) => {
    const categoryName = category.find((cat) => cat._id === categoryId);
    return category ? categoryName.name : "Unknown Category";
  };

  const [quantity, setQuantity] = useState(1);

  const handleClick = () => {
    if (isLoggedIn) {
      AddToCart(product._id, quantity , user._id);
      
    } else {
      toast.warning("Please Login First!");
    }
  };

  return (
    <div className="bg-white mt-1 py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row">
          {/* Product Image */}
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <div className="relative">
              <img
                src={product.image || "https://via.placeholder.com/800x800"}
                alt={product.name}
                className="w-4/5 h-4/5 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 lg:pl-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Category: {getCategoryName(product.categoryId)}
            </p>
            <p className="text-xl font-semibold text-gray-900 mb-4">
              {product.price} /-
            </p>
            <p className="text-gray-700 mb-6">{product.description}</p>

            {/*<div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Available Sizes
              </h3>
              <div className="flex space-x-4">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div> */}

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Quantity
              </h3>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-20 py-2 px-4 border border-gray-300 rounded-lg"
              />
            </div>

            <button
              data={product._id}
              onClick={handleClick}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;
