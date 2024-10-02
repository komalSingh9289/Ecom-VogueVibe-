export const getUserOrder = async ({ params }) => {
    try {
      const { userId } = params;

      const response = await fetch(`http://localhost:5000/api/orders/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if(!response.ok){
          throw new Error("Failed to fetch cart data");
      }
      const order = await response.json();
      
      return {data : order.orders};
  
    } catch (error) {
      console.log("cart error: ", error);
      
    }
  };
  