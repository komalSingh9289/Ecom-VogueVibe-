import React from "react";
import Productlist from "./Productlist";

const FeaturedProducts = ({list, categories}) => {
  return (
    <section className="w-screen h-auto bg-white">
      <div className="newarrival--container w-full h-full p-5 mt-3">
        <h1 className=" mt-8 w-full text-center text-red-900 font-semibold text-5xl">
          Featured Products
        </h1>
        <Productlist list={list} categories={categories}/>
      </div>
    </section>
  );
};

export default FeaturedProducts;
