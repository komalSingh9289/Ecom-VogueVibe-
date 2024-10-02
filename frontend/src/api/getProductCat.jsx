
export const productLoader = async () => {
  const categoriesResponse = await fetch("http://localhost:5000/api/categories");
  const productsResponse = await fetch("http://localhost:5000/api/products");

  const categories = await categoriesResponse.json();
  const products = await productsResponse.json();

  return { categories: categories.data, products: products.data };
};

