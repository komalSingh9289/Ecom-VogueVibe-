import React  from "react";
import { NavLink } from "react-router-dom";

const Productlist = ({ list, categories }) => {

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  return (
    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {Array.isArray(list) && list.length > 0 ? (
        list.map((product) => (
          <div
            key={product._id}
            className="relative bg-white rounded-lg shadow-md overflow-hidden"
          >
            <NavLink to={`/product/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
            </NavLink>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>

              <p className="text-gray-600 mb-2">
                {getCategoryName(product.categoryId)}
              </p>
              <p className="text-black mb-2">
                {product.description}
              </p>
              <p className="text-lg font-bold mb-2">{product.price} /- </p>

              <NavLink
                to={`/product/${product._id}`}
                type="button"
                className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600"
              >
                View Product
              </NavLink>
            </div>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default Productlist;
