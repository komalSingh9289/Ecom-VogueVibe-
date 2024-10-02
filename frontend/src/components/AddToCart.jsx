import { toast } from "react-toastify";

export const AddToCart = async (productId, quantity, userId) => {
 //  console.log(userId);

  try {
    const response = await fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        productId,
        quantity,
      }),
    });

    if(response.ok){
        toast.success("Product added to cart :)");
    }else{
        toast.error("Error adding product to cart. Please try again.");
    }

  } catch (error) {
    console.log("Error while adding the product", error);
    toast.error("Error adding product to cart. Please try again.");
  }
};
