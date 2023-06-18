import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserPagination from "./UserPagination";

const UserList = ({ users, setUsers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://gorest.co.in/public/v2/users",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setUsers(response.data);
        const paginationTotal = response.headers["x-pagination-total"];
        setTotalPages(parseInt(paginationTotal));
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchUsers();
  }, []);

  const handlePagination = (page) => {
    setCurrentPage(page);

    axios
      .get(`https://gorest.co.in/public/v2/users?page=${page}`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error", error));
  };

  return (
    <div className="flex flex-wrap gap-2">
      {users.slice(0, 10).map((user, index) => (
        <div key={user.id}>
          <Link to={`/user/${user.id}`}>
            <div className="w-[14rem] bg-white border border-gray-200 px-5 py-5 rounded-xl hover:bg-sky-100">
              <div className="flex gap-3">
                <img
                  className="w-14 h-14 rounded-full shadow-lg"
                  src={`https://source.unsplash.com/200x200?landscape&${
                    Date.now() + index
                  }`}
                  alt="Bonnie image"
                />
                <div>
                  <h5 className="text-sm font-semibold text-slate-600 line-clamp-1 w-[7rem]">
                    {user.name}
                  </h5>
                  <div className="mb-1 text-xs text-slate-600 line-clamp-1 w-[7rem]">
                    {user.email}
                  </div>
                  <div className="flex gap-1">
                    <div className="mb-1 text-xs text-slate-600">
                      {user.gender.charAt(0).toUpperCase() +
                        user.gender.slice(1)}
                    </div>
                    <span className="text-xs text-slate-600">&</span>
                    <div className="text-xs text-slate-600">
                      {user.status.charAt(0).toUpperCase() +
                        user.status.slice(1)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
      <UserPagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default UserList;
