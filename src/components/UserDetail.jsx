import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`https://gorest.co.in/public/v2/users/${userId}`)
      .then((response) => {
        setUser(response.data);
      })

      .catch((error) => {
        console.error("Error", error);
      });
  }, [userId]);

  return (
    <div className="flex justify-center mt-10">
      {user && (
        <div>
          <div className="w-[40rem] bg-white border border-gray-200 px-8 py-8 rounded-xl">
            <div className="flex gap-5">
              <img
                className="w-28 h-28 rounded-full shadow-lg"
                src="https://source.unsplash.com/200x200?landscape"
                alt="Bonnie image"
              />
              <div>
                <h5 className="mb-1 text-xl font-bold text-gray-900">
                  {user.name}
                </h5>
                <div className="mb-1 text-base text-gray-900">
                  Email: {user.email}
                </div>
                <div className="mb-1 text-base text-gray-900">
                  Gender:{" "}
                  {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
                </div>
                <div className="text-base text-gray-900">
                  Status:{" "}
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </div>
              </div>
            </div>
          </div>
          <Link
            to="/users"
            className="mt-5 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
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
      )}
    </div>
  );
};

export default UserDetail;
