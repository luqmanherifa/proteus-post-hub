import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axios
      .get("https://gorest.co.in/public/v2/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://gorest.co.in/public/v2/posts")
      .then((response) => {
        const paginationTotal = response.headers["x-pagination-total"];
        setTotalPages(parseInt(paginationTotal));
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);

    axios
      .get(`https://gorest.co.in/public/v2/posts?page=${page}`)
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error", error));
  };

  return (
    <div className="max-w-6xl mx-auto mb-20">
      {/* Card */}
      <div className="flex flex-wrap gap-6 justify-center">
        {posts.map((post, index) => (
          <div key={post.id}>
            <div className="max-w-xs bg-slate-50 border border-gray-200 rounded-lg shadow lg:max-w-[30rem]">
              <Link to={`/post/${post.id}`}>
                <img
                  className="rounded-t-lg"
                  src={`https://source.unsplash.com/600x280?landscape&${
                    Date.now() + index
                  }`}
                  alt=""
                />
              </Link>
              <div className="p-5">
                <div>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 line-clamp-1">
                    {post.title
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </h5>
                </div>
                <p className="mb-3 font-normal text-gray-700 line-clamp-2">
                  {post.body}
                </p>
                <Link
                  to={`/post/${post.id}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Detail
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10">
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px">
            <li>
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="bg-slate-50 px-6 py-3 ml-0 leading-tight text-gray-500 border border-gray-300 rounded-l-lg hover:bg-gray-200 hover:text-gray-700"
              >
                Prev
              </button>
            </li>
            <li>
              <button
                aria-current="page"
                className="bg-slate-50 w-20 px-3 py-[10px] text-blue-600 border border-gray-300 hover:bg-blue-100 hover:text-blue-700"
              >
                {currentPage}
              </button>
            </li>
            <li>
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="bg-slate-50 px-6 py-3 leading-tight text-gray-500 border border-gray-300 rounded-r-lg hover:bg-gray-200 hover:text-gray-700"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Posts;
