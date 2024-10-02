import { useParams } from 'react-router-dom';

export const productByIdLoader = async ({ params }) => {
  const { productId } = params; 
  try {
    // Fetch categories and product details using the productId from the URL
    const categoriesResponse = await fetch("http://localhost:5000/api/categories");
    const productsResponse = await fetch(`http://localhost:5000/api/products/${productId}`);

    if (!categoriesResponse.ok || !productsResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    const category = await categoriesResponse.json();
    const product = await productsResponse.json();

    // Return category and product data
    return { category: category.data, product: product.product };
  } catch (error) {
    console.log("Error loading product data:", error);
    return { category: null, product: null };  // Fallback in case of error
  }
};
