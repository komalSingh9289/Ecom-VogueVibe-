import { toast } from "react-toastify";

export const SubmitOrder = async (orderDetails, orderStatus, navigate) => {
  const userId = orderDetails.cartItems[0].userId;

  if (
    !orderDetails ||
    !orderDetails.cartItems ||
    orderDetails.cartItems.length === 0
  ) {
    console.error("No cart items available.");
    return;
  }

  const orderData = {
    cartItems: orderDetails.cartItems,
    total: orderDetails.total,
    status: orderStatus,
  };

  const response = await fetch("http://localhost:5000/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  try {
    const data = await response.json();

    if (response.ok) {
      const cartRes = await fetch(
        `http://localhost:5000/api/cart/clear/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      if(cartRes.ok){
        return navigate(`/cart/${userId}`);;
      }else{
        console.log("failed to place order!");
        
      }

    } else {
        console.error("Order submission failed:", data);
        return toast.success("Order submission failed");  
    }
  } catch (error) {
    console.log("orderError", error);
  }
};
