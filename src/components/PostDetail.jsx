import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`https://gorest.co.in/public/v2/posts/${postId}`)
      .then((response) => {
        setPost(response.data);
        return axios.get(
          `https://gorest.co.in/public/v2/comments?post_id=${postId}`
        );
      })
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, [postId]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        {/* Post Detail */}
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
                  <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">
                    {post.title
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </h5>
                </div>
                <p className="mb-5 font-normal text-gray-700">{post.body}</p>
                <Link
                  to="/"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
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

        {/* Comments */}
        {comments.length > 0 && (
          <div>
            {comments.map((comment) => (
              <div key={comment.id} className="mb-3">
                <div className="bg-slate-50 max-w-xs lg:max-w-3xl mx-auto border border-slate-300 rounded-xl p-5">
                  <div className="flex items-center mb-3 space-x-4">
                    <img
                      className="w-10 h-10 rounded-full"
                      src="https://source.unsplash.com/200x200?landscape"
                      alt=""
                    />
                    <div className="space-y-1 font-medium">
                      <p>{comment.name}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        {comment.email}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 mt-6 md:mt-0">
                    <p className="mb-2 text-gray-500">{comment.body}</p>
                    <aside className="flex items-center mt-3 space-x-5">
                      <a
                        href="#"
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-4 h-4 mr-1.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                        </svg>
                        Helpful
                      </a>
                      <a
                        href="#"
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline group"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-4 h-4 mr-1.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z"></path>
                        </svg>
                        Not helpful
                      </a>
                    </aside>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PostDetail;
