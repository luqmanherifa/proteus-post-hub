import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostPagination from "./PostPagination";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://gorest.co.in/public/v2/posts",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setPosts(response.data);
        const paginationTotal = response.headers["x-pagination-total"];
        setTotalPages(parseInt(paginationTotal));
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostPagination = async (page) => {
    setCurrentPage(page);

    try {
      const response = await axios.get(
        `https://gorest.co.in/public/v2/posts?page=${page}`
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {posts.map((post, index) => (
        <div key={post.id}>
          <div className="max-w-xs bg-white border border-gray-200 rounded-lg lg:max-w-[30rem]">
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
                <h5 className="mb-1 text-xl font-bold tracking-tight text-slate-600 line-clamp-1">
                  {post.title
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </h5>
              </div>
              <p className="mb-3 font-normal text-slate-600 line-clamp-2">
                {post.body}
              </p>
              <Link
                to={`/post/${post.id}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-sky-500 rounded-lg hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300"
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
      <PostPagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePostPagination={handlePostPagination}
      />
    </div>
  );
};

export default PostList;
