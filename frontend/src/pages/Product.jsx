import React, { useState } from "react";
import CategoriesNav from "../components/CategoriesNav";
import Productlist from "../components/Productlist";
import { useLoaderData } from "react-router-dom";

const Product = () => {
  const { categories, products } = useLoaderData();

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.categoryId === selectedCategory)
    : products;

  return (
    <section className="w-screen min-h-screen bg-white p-5 mt-1">
      <CategoriesNav
        list={categories}
        onCategorySelect={handleCategorySelect}
      />
      <Productlist list={filteredProducts} categories={categories} />
    </section>
  );
};

export default Product;
