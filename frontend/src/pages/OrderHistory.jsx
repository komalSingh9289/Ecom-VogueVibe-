import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "../components/Pagination";

const OrderHistory = () => {
  const { data } = useLoaderData();
  const [orders, setOrders] = useState(data || []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set how many items you want per page

  useEffect(() => {
    setOrders(data || []);
  }, [data]);

  const handleCancelOrder = async (itemId) => {
    const confirmation = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmation) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/cancel/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel the order");
      }

      const updatedOrder = await response.json();
      toast.success(updatedOrder.message);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === itemId ? { ...order, status: "canceled" } : order
        )
      );
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Failed to cancel the order. Please try again.");
    }
  };

  // Pagination logic
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="w-screen h-screen p-3 mt-1 bg-white">
      <div className="max-w-4xl mx-auto p-4 bg-gray-100 mt-5">
        <h1 className="text-2xl font-bold mb-4">Order History</h1>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Items</th>
              <th className="py-2 px-4 text-left">Total Price</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => {
              const itemNames = order.cartItems
                .map((item) => item.productId.name)
                .join(", ");
              const totalQuantity = order.cartItems.reduce(
                (sum, item) => sum + item.quantity,
                0
              );
              const totalPrice = order.cartItems
                .reduce(
                  (sum, item) => sum + item.productId.price * item.quantity,
                  0
                )
                .toFixed(2);

              return (
                <tr key={order._id} className="border-b">
                  <td className="py-2 px-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">{itemNames}</td>
                  <td className="py-2 px-4">{totalPrice} ₹</td>
                  <td className="py-2 px-4">{totalQuantity}</td>
                  <td
                    className={`py-2 px-4 ${
                      order.status == "ordered"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  }`}
                  >
                    {order.status}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      className="text-blue-500 cursor-pointer hover:text-blue-700"
                      onClick={() => handleCancelOrder(order._id)}
                      disabled={order.status === "canceled"} // Disable if order is canceled
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Use the Pagination component */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default OrderHistory;
