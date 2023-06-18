import React from "react";

const UserPagination = ({ currentPage, totalPages, handlePagination }) => {
  return (
    <div className="mx-auto mt-5">
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px">
          <li>
            <button
              disabled={currentPage === 1}
              onClick={() => handlePagination(currentPage - 1)}
              className="bg-white px-5 py-3 ml-0 leading-tight text-slate-500 border border-gray-300 rounded-l-lg hover:bg-slate-200 hover:text-slate-600"
            >
              Prev
            </button>
          </li>
          <li>
            <button
              aria-current="page"
              className="bg-white w-20 py-[10px] text-sky-500 border border-gray-300 hover:bg-sky-100 hover:text-sky-500"
            >
              {currentPage}
            </button>
          </li>
          <li>
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePagination(currentPage + 1)}
              className="bg-white px-5 py-3 leading-tight text-slate-500 border border-gray-300 rounded-r-lg hover:bg-slate-200 hover:text-slate-600"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserPagination;
