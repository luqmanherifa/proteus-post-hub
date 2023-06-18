import React from "react";
import { Link } from "react-router-dom";

const PostDetail = ({ post }) => {
  return (
    <div>
      {post && (
        <div className="flex flex-wrap gap-7 justify-center mb-10">
          <div className="max-w-xs lg:max-w-3xl mt-10">
            <div className="flex justify-center">
              <img
                src="https://source.unsplash.com/900x400?landscape"
                alt=""
                className="rounded-xl"
              />
            </div>
            <div className="mt-5">
              <div>
                <h5 className="mb-4 text-2xl font-bold tracking-tight text-slate-600">
                  {post.title
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </h5>
              </div>
              <p className="mb-5 font-normal text-slate-600">{post.body}</p>
              <Link
                to="/"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-sky-500 rounded-lg hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300"
              >
                Back
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
      )}
    </div>
  );
};

export default PostDetail;
