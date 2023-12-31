import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateUser = ({ setUsers }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [newUser, setNewUser] = useState(null);
  const [isCreateSuccess, setIsCreateSuccess] = useState(false);
  const [isCreateError, setIsCreateError] = useState(false);
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  useEffect(() => {
    if (newUser) {
      setUsers((prevUsers) => [newUser, ...prevUsers]);
      setNewUser(null);
    }
  }, [newUser]);

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

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

      setIsCreateSuccess(true);
      setIsCreateError(false);

      setName("");
      setEmail("");
      setGender("");
      setStatus("");

      alert("User created.");
    } catch (error) {
      console.error(error);

      setIsCreateSuccess(false);
      setIsCreateError(true);
      alert("Create user failed.");
    }
  };

  return (
    <div>
      <p className="mb-3 text-xl font-bold text-slate-600">Create User</p>
      <div className="mb-5">
        <form onSubmit={handleCreateUser}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-slate-600"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-describedby="helper-text-explanation"
              className="bg-white border border-gray-300 text-slate-600 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-72 p-2.5"
              placeholder="Name"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-slate-600"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="helper-text-explanation"
              className="bg-white border border-gray-300 text-slate-600 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-72 p-2.5"
              placeholder="email@proteus.com"
              required
            />
          </div>
          <div className="mb-5">
            <div className="block mb-2 text-sm font-medium text-slate-600">
              Gender
            </div>
            <div className="flex">
              <div className="flex items-center mr-4">
                <input
                  id="male-radio"
                  type="radio"
                  value="male"
                  name="gender-radio-group"
                  checked={gender === "male"}
                  onChange={handleGenderChange}
                  className="w-4 h-4 text-sky-500 bg-slate-100 border-gray-300 focus:ring-sky-500"
                />
                <label
                  htmlFor="male-radio"
                  className="ml-2 text-sm font-medium text-slate-600"
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
                  className="w-4 h-4 text-sky-500 bg-slate-100 border-gray-300 focus:ring-sky-500"
                />
                <label
                  htmlFor="female-radio"
                  className="ml-2 text-sm font-medium text-slate-600"
                >
                  Female
                </label>
              </div>
            </div>
          </div>
          <div>
            <div className="block mb-2 text-sm font-medium text-slate-600">
              Status
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
                  className="w-4 h-4 text-sky-500 bg-slate-100 border-gray-300 focus:ring-sky-500"
                />
                <label
                  htmlFor="active-radio"
                  className="ml-2 text-sm font-medium text-slate-600"
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
                  className="w-4 h-4 text-sky-500 bg-slate-100 border-gray-300 focus:ring-sky-500"
                />
                <label
                  htmlFor="inactive-radio"
                  className="ml-2 text-sm font-medium text-slate-600"
                >
                  Inactive
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-5 text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Create
          </button>
        </form>

        {isCreateSuccess && (
          <p className="my-5 text-base font-medium text-green-600/100">
            Create successful!
          </p>
        )}
        {isCreateError && (
          <p className="my-5 text-base font-medium text-red-600/100">
            Create error. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateUser;
