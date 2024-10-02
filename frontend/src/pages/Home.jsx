import React from 'react'
import HeroSection from "../components/HeroSection";
import NewArrivals from "../components/NewArrivals";
import Services from "../components/Services";
import FeaturedProducts from "../components/FeaturedProducts";
import { useLoaderData } from "react-router-dom";


const Home = () => {
  const { categories, products } = useLoaderData();

  return (
    <>
        <HeroSection />
        <NewArrivals />
        <Services />
        <FeaturedProducts list = {products} categories={categories}/>

    </>
  )
}

export default Home