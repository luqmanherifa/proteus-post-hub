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

  const handleUserPagination = async (page) => {
    setCurrentPage(page);

    try {
      const response = await axios.get(
        `https://gorest.co.in/public/v2/users?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div>
      <div className="mx-auto">
        <div className="relative overflow-x-auto border border-slate-200 sm:rounded-lg">
          <table className="w-full text-sm text-left text-slate-500 table-fixed">
            <thead className="text-xs text-white uppercase bg-sky-900">
              <tr>
                <th scope="col" className="px-6 py-4 w-24">
                  Profile
                </th>
                <th scope="col" className="px-6 py-4">
                  Name
                </th>
                <th scope="col" className="px-6 py-4 w-[26rem]">
                  Email
                </th>
                <th scope="col" className="px-6 py-4 w-32">
                  Gender
                </th>
                <th scope="col" className="px-6 py-4 w-32">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 w-32">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 10).map((user, index) => (
                <tr key={user.id} className="bg-white border-b">
                  <td className="px-6 py-4">
                    <img
                      className="w-5 h-5 rounded-full"
                      src={`https://source.unsplash.com/100x100?landscape&${
                        Date.now() + index
                      }`}
                      alt="Bonnie image"
                    />
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {user.name}
                  </th>
                  <td className="px-6 py-4">
                    <p className="line-clamp-1">{user.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
                  </td>
                  <td className="px-6 py-4">
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/user/${user.id}`}
                      className="font-medium text-sky-600 hover:underline"
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <UserPagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleUserPagination={handleUserPagination}
      />
    </div>
  );
};

export default UserList;
