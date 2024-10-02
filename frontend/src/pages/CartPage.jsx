import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { RemoveCart } from "../components/RemoveCart"; // RemoveCart function handles the API call
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { SubmitOrder } from "../components/SubmitOrder";
import { useAuth } from "../store/auth";
import Pagination from "../components/Pagination"; // Import Pagination component

const CartPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: initialCartItems } = useLoaderData(); // Load initial cart items from loader
  const [cartItems, setCartItems] = useState(initialCartItems); // Store cart items in state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [orderDetails, setOrderDetails] = useState({}); // Store order details for confirmation
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page

  // Function to handle removal of cart item
  const handleRemoveCart = async (cartId) => {
    const result = await RemoveCart(cartId); // Call API to remove cart item
    if (result.success) {
      const updatedCartItems = cartItems.filter((item) => item._id !== cartId);
      toast.success("Cart item Removed!");
      setCartItems(updatedCartItems); // Update the cart items in state
    } else {
      console.error("Failed to remove cart item");
      toast.warning("Something went wrong, Try Again Later!");
    }
  };

  // Calculate the total price
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
  };

  // Handle checkout and open modal
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.warning(
        "Your cart is empty. Please add items before proceeding to checkout."
      );
      return;
    }
    const total = calculateTotal(); // Calculate the total price
    setOrderDetails({ cartItems, total }); // Store order details
    setIsModalOpen(true); // Open the modal
  };

  const handleCancelOrder = () => {
    setIsModalOpen(false);
  };

  const handleConfirmOrder = () => {
    setIsModalOpen(false);
    SubmitOrder(orderDetails, "ordered", navigate)
      .then(() => {
        setTimeout(() => {
          toast.success("Order Placed");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error during order submission:", error);
      });
  };

  // Calculate total pages
  const totalPages = Math.ceil(cartItems.length / itemsPerPage);

  // Get items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = cartItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="w-screen h-screen p-3 mt-1 bg-white">
      <div className="max-w-4xl mx-auto p-4 bg-gray-100 mt-5">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left">Item</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Total</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="py-2 px-4">{item.productId.name}</td>
                <td className="py-2 px-4">
                  {item.productId.price.toFixed(2)} /-
                </td>
                <td className="py-2 px-4">{item.quantity}</td>
                <td className="py-2 px-4">
                  {(item.productId.price * item.quantity).toFixed(2)} /-
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleRemoveCart(item._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 text-right">
          <span className="text-lg font-bold">
            Total: {calculateTotal().toFixed(2)} /-
          </span>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleCheckout}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Checkout
          </button>
        </div>

        {/* Pagination component */}
        <Pagination 
          totalPages={totalPages} 
          currentPage={currentPage} 
          onPageChange={setCurrentPage} 
        />

        {/* Modal for order confirmation */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-5 max-w-md w-full">
              <h2 className="text-lg font-bold mb-4">Order Confirmation</h2>

              <p>
                Cart Items:{" "}
                {orderDetails.cartItems
                  ?.map((item) => item.productId.name)
                  .join(", ")}
              </p>
              <p>Total: {orderDetails.total?.toFixed(2)} /-</p>

              <div className="mt-5 flex justify-end">
                <button
                  onClick={handleCancelOrder}
                  className="bg-red-500 text-white py-2 px-4 rounded mr-2 hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmOrder}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default CartPage;
