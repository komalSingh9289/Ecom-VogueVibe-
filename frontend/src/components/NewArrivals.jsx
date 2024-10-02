import React from "react";
import { NavLink } from "react-router-dom";

const NewArrivals = () => {
  return (
    <section className="w-screen h-auto bg-white">
    <div className="newarrival--container w-full h-full p-5">
      <h1 className="w-full text-center text-red-900 font-semibold text-5xl">
        New Arrivals
      </h1>
      <div className="mt-5 arrivals--wrapper p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full h-full">
        {/* Clothes Section */}
        <div className="arrivals arrivals--clothes relative bg-gray-200 p-4 min-h-[500px] flex flex-col justify-center">
          <div className="overlay absolute inset-0"></div>
          <div className="relative z-10 text-white text-center">
            <h2 className="text-3xl font-semibold">Find Your Perfect Fit</h2>
            <p className="text-gray-100 font-semibold tracking-wide mt-2">
              Perfect for every occasion and every season.
            </p>
            <NavLink
              to = "/product"
              type="button"
              className="mt-4 py-2 w-full px-5 text-lg font-medium border border-transparent bg-white text-gray-900 transition-colors duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-100"
            >
              SHOP NOW
            </NavLink>
          </div>
        </div>
  
        {/* Bags Section */}
        <div className="arrivals arrivals--bags relative bg-gray-200 p-4 min-h-[500px] flex flex-col justify-center">
          <div className="overlay absolute inset-0"></div>
          <div className="relative z-10 text-white text-center">
            <h2 className="text-3xl font-semibold">Elevate Your Style</h2>
            <p className="text-gray-100 font-semibold tracking-wide mt-2">
              Fashionable and functional, just the way you like it.
            </p>
            <NavLink
              to = "/product"
              type="button"
              className="mt-4 py-2 w-full px-5 text-lg font-medium border border-transparent bg-white text-gray-900 transition-colors duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-100"
            >
              SHOP NOW
            </NavLink>
          </div>
        </div>
  
        {/* Accessories Section */}
        <div className="arrivals arrivals--accessories relative bg-gray-200 p-4 min-h-[500px] flex flex-col justify-center">
          <div className="overlay absolute inset-0"></div>
          <div className="relative z-10 text-white text-center">
            <h2 className="text-3xl font-semibold">Finish Your Look</h2>
            <p className="text-gray-100 font-semibold tracking-wide mt-2">
              Elevate your style with our curated collection of accessories.
            </p>
            <NavLink
              to = "/product"
              type="button"
              className="mt-4 py-2 w-full px-5 text-lg font-medium border border-transparent bg-white text-gray-900 transition-colors duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-100"
            >
              SHOP NOW
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  );
};

export default NewArrivals;
