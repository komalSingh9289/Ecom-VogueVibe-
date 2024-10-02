import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageClick = (page) => {
    if (page < 1 || page > totalPages) return; // Prevent invalid page numbers
    onPageChange(page);
  };

  return (
    <div className="mt-4 flex justify-center">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageClick(index + 1)}
          className={`px-3 py-1 border mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
