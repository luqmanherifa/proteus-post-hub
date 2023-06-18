import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserPagination from "./UserPagination";

const UserList = ({ users, setUsers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [noResults, setNoResults] = useState(false);
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `https://gorest.co.in/public/v2/users?name=${search}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setUsers(response.data);
      const paginationTotal = response.headers["x-pagination-total"];
      setTotalPages(parseInt(paginationTotal));
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

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

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  return (
    <div>
      <div className="mx-auto">
        <form className="mb-3">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-sky-500 focus:border-sky-500"
              placeholder="Search name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-4 py-2"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </form>
        <div className="relative overflow-x-auto border border-slate-200 sm:rounded-lg">
          <table className="w-full text-sm text-left text-slate-500 table-fixed">
            <thead className="text-xs text-white uppercase bg-sky-600">
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
                      className="font-medium text-sky-500 hover:underline"
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
              {noResults && (
                <tr className="bg-white">
                  <td
                    colSpan="6"
                    className="font-medium text-red-500 py-4 text-center"
                  >
                    No results found.
                  </td>
                </tr>
              )}
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
