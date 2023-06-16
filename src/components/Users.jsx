import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isSubmitError, setIsSubmitError] = useState(false);
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
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (newUser) {
      setUsers((prevUsers) => [newUser, ...prevUsers]);
      setNewUser(null);
    }
  }, [newUser]);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://gorest.co.in/public/v2/users",
        {
          name: name,
          email: email,
          gender: gender,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setNewUser(response.data);

      setIsSubmitSuccess(true);
      setIsSubmitError(false);

      setName("");
      setEmail("");
      setGender("");
      setStatus("");
    } catch (error) {
      console.error(error);

      setIsSubmitSuccess(false);
      setIsSubmitError(true);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-10 min-h-screen">
        <div className="flex flex-wrap gap-2">
          {users.slice(0, 10).map((user, index) => (
            <div key={user.id}>
              <Link to={`/user/${user.id}`}>
                <div className="w-[14rem] bg-white border border-gray-200 px-5 py-5 rounded-xl">
                  <div className="flex gap-3">
                    <img
                      className="w-14 h-14 rounded-full shadow-lg"
                      src={`https://source.unsplash.com/200x200?landscape&${
                        Date.now() + index
                      }`}
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
              </Link>
            </div>
          ))}
        </div>

        {/* Create User */}
        <div className="mt-10">
          <form onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="name"
                name="floating_name"
                id="floating_name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>
            <div className="flex mb-5">
              <div className="flex items-center mr-4">
                <input
                  id="male-radio"
                  type="radio"
                  value="male"
                  name="gender-radio-group"
                  checked={gender === "male"}
                  onChange={handleGenderChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="male-radio"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  Male
                </label>
              </div>
              <div className="flex items-center mr-4">
                <input
                  id="female-radio"
                  type="radio"
                  value="female"
                  name="gender-radio-group"
                  checked={gender === "female"}
                  onChange={handleGenderChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="female-radio"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  Female
                </label>
              </div>
            </div>
            <div className="flex">
              <div className="flex items-center mr-4">
                <input
                  id="active-radio"
                  type="radio"
                  value="active"
                  name="status-radio-group"
                  checked={status === "active"}
                  onChange={handleStatusChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="active-radio"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  Active
                </label>
              </div>
              <div className="flex items-center mr-4">
                <input
                  id="inactive-radio"
                  type="radio"
                  value="inactive"
                  name="status-radio-group"
                  checked={status === "inactive"}
                  onChange={handleStatusChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="inactive-radio"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  Inactive
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>

          {isSubmitSuccess && (
            <p className="mt-5 text-base font-medium text-green-600/100">
              Submit successful!
            </p>
          )}
          {isSubmitError && (
            <p className="mt-5 text-base font-medium text-red-600/100">
              Submit error. Please try again.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Users;
