import React from "react";
import { NavLink } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="hero-section relative w-screen min-h-screen flex items-center justify-center bg-cover bg-center" >
  <div className="overlay absolute inset-0 "></div>
  
  <div className="container relative z-10 text-center px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
      Exclusive Deals on Women's Fashion
    </h1>

    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
      <NavLink
        type="button"
        className="py-2.5 px-6 mb-2 text-lg font-medium border border-transparent bg-white text-gray-900 transition-colors duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-100"
        to="/product"
      >
        SHOP NOW
      </NavLink>

      <NavLink
        type="button"
        className="py-2.5 px-6 mb-2 text-lg font-medium border border-white text-white bg-transparent transition-colors duration-300 hover:bg-white hover:text-black focus:outline-none focus:ring-4 focus:ring-gray-100"
        to="/signup"
      >
        SIGN UP
      </NavLink>
    </div>
  </div>
</section>

  );
};

export default HeroSection;
