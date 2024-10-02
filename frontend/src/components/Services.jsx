import React from 'react';
import { CiTimer, CiShoppingTag, CiLock   } from "react-icons/ci";


const Services = () => {
  return (
    <section className="w-screen h-auto">
    <div className="services--container mt-3 w-full h-full">
      <div className="w-full p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col items-center justify-center">
          <CiTimer className="text-red-900 text-8xl" />
          <h2 className="text-3xl mt-2">24/7</h2>
        </div>
        <div className="flex flex-col items-center justify-center">
          <CiShoppingTag className="text-red-900 text-8xl" />
          <h2 className="text-3xl mt-2">Special Offers</h2>
        </div>
        <div className="flex flex-col items-center justify-center">
          <CiLock className="text-red-900 text-8xl" />
          <h2 className="text-3xl mt-2">Secure Payments</h2>
        </div>
      </div>
    </div>
  </section>
  
  )
}

export default Services