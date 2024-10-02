import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../store/auth";
import logo from "../../assets/images/Voguevibe.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const getActivState = ({ isActive }) => {
    return {
      color: isActive ? "#7f1d1d" : "#000000",
    };
  };

  const { isLoggedIn, user } = useAuth();

  return (
    <nav className="flex items-center justify-between flex-wrap p-6 bg-slate-50">
      <div className="flex items-center flex-shrink-0 text-white mr-6 lg:mr-72">
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-14" alt="Flowbite Logo" />
        </NavLink>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
        >
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>

          <svg
            className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </button>
      </div>

      <div
        className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto transition-max-height duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen" : "max-h-0 lg:max-h-none"
        }`}
      >
        <div className="text-sm lg:flex-grow text-black">
          <NavLink
            to="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 text-black"
            style={getActivState}
            onClick={() => setIsOpen(false)} // Close menu when clicking any link
          >
            {" "}
            HOME
          </NavLink>
          <NavLink
            to="/about"
            className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 text-black"
            style={getActivState}
            onClick={() => setIsOpen(false)} // Close menu when clicking any link
          >
            {" "}
            ABOUT
          </NavLink>
          <NavLink
            to="/product"
            className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 text-black"
            style={getActivState}
            onClick={() => setIsOpen(false)}
          >
            {" "}
            PRODUCTS
          </NavLink>
          <NavLink
            to="/contact"
            className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 text-black"
            style={getActivState}
            onClick={() => setIsOpen(false)} // Close menu when clicking any link
          >
            {" "}
            CONTACT
          </NavLink>
        </div>
        <div>
          {isLoggedIn ? (
            <>
              <button
                onClick={toggleDropdown}
                 className="hover:bg-black hover:border-white hover:text-white border-2 border-black bg-white text-black transition duration-300 ease-in-out px-3 py-2 rounded-md"
              >
                Hi, {user.name}
              </button>
              {dropdownOpen && (
                <div className={`absolute mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10 ${isOpen ? 'left-0' : 'right-0'}`}>
                  <NavLink
                    className="block px-4 py-2 hover:bg-gray-200"
                    to={`/cart/${user._id}`}
                    style={getActivState}
                  >
                    MY CART
                  </NavLink>
                  <NavLink
                    className="block px-4 py-2 hover:bg-gray-200"
                    to={`/orderHistory/${user._id}`}
                    style={getActivState}
                  >
                    Order History
                  </NavLink>
                  <NavLink
                    className="block px-4 py-2 hover:bg-gray-200"
                    to="/logout"
                    style={getActivState}
                  >
                    LOGOUT
                  </NavLink>
                </div>
              )}
            </>
          ) : (
            <NavLink
              className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 text-black"
              to="/login"
              style={getActivState}
            >
              LOGIN
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
