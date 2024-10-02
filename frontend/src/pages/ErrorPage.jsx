import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import error404 from "../assets/images/error404.json";

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoBack = ()=> navigate(-1);

  return (
    <section className="w-screen h-screen flex flex-col items-center justify-center">
      <p className="text-2xl text-gray-600 mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Lottie
        animationData={error404}
        loop={true} // Set to false if you don't want the animation to loop
        autoplay={true} // Set to false if you want to control the playback manually
        style={{ width: 500, height: 300 }} // Adjust the size as needed
      />

      <button 
      onClick={handleGoBack}
      className="py-2.5 px-5 me-2 mb-2 ml-3 text-lg font-medium border border-transparent bg-white text-gray-900 transition-colors duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-100">
        Go Back !
      </button>
    </section>
  );
};

export default ErrorPage;
