import React from "react";

const CategoriesNav = ({ list, onCategorySelect }) => {
  return (
    <nav className="bg-gray-50 dark:bg-gray-700">
      <div className="max-w-screen-xl px-4 py-3 mx-auto flex flex-col lg:flex-row items-center lg:justify-between">
        <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm mb-4 lg:mb-0 lg:space-x-4">
          
          {Array.isArray(list) && list.length > 0 ? (
            <>
              
              <li
                  onClick={() => onCategorySelect(null)} 
                  className="text-gray-900  dark:text-white hover:underline cursor-pointer"
                >
                  All
              </li>
              
              {list.map((category) => (
                <li
                  key={category._id}
                  onClick={() => onCategorySelect(category._id)}
                  className="text-gray-900 cursor-pointer dark:text-white hover:underline"
                >
                  {category.name}
                </li>
              ))}
            </>
          ) : (
            <li>No categories available</li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default CategoriesNav;
