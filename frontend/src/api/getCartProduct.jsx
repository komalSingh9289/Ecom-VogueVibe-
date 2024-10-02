export const getCartProduct = async ({ params }) => {
  try {
    const { userId } = params;

    
    const response = await fetch(`http://localhost:5000/api/cart/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(!response.ok){
        throw new Error("Failed to fetch cart data");
    }
    const cart = await response.json();
    //console.log("loader side cart", cart);
    
    return {data : cart.data};

  } catch (error) {
    console.log("cart error: ", error);
    
  }
};
