export const RemoveCart = async (cartId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${cartId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to remove item from the cart");
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
  