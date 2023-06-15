import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateUser from "./CreateUser";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://gorest.co.in/public/v2/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-10 min-h-screen">
        <div className="flex flex-wrap gap-2">
          {users.map((user) => (
            <div key={user.id}>
              <div className="w-[14rem] bg-white border border-gray-200 px-5 py-5 rounded-xl">
                <div className="flex gap-3">
                  <img
                    className="w-14 h-14 rounded-full shadow-lg"
                    src="https://source.unsplash.com/200x200?landscape"
                    alt="Bonnie image"
                  />
                  <div>
                    <h5 className="mb-1 text-xs font-medium text-gray-900 line-clamp-1 w-[7rem]">
                      {user.name}
                    </h5>
                    <div className="mb-1 text-xs text-gray-900 line-clamp-1 w-[7rem]">
                      {user.email}
                    </div>
                    <div className="flex gap-1">
                      <div className="mb-1 text-xs text-gray-900">
                        {user.gender.charAt(0).toUpperCase() +
                          user.gender.slice(1)}
                      </div>
                      <span className="text-xs text-gray-900">&</span>
                      <div className="text-xs text-gray-900">
                        {user.status.charAt(0).toUpperCase() +
                          user.status.slice(1)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <CreateUser />
      </div>
      <Footer />
    </div>
  );
};

export default Users;
