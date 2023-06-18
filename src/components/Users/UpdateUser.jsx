import axios from "axios";
import React, { useState } from "react";

const UpdateUser = ({
  userId,
  name,
  email,
  gender,
  status,
  setUser,
  setName,
  setEmail,
  setGender,
  setStatus,
}) => {
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [isUpdateError, setIsUpdateError] = useState(false);
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  const handleUpdateUser = async (event) => {
    event.preventDefault();

    const updatedData = {};

    if (name) {
      updatedData.name = name;
    }

    if (email) {
      updatedData.email = email;
    }

    if (gender) {
      updatedData.gender = gender;
    }

    if (status) {
      updatedData.status = status;
    }

    try {
      const response = await axios.patch(
        `https://gorest.co.in/public/v2/users/${userId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUser(response.data);
      setIsUpdateSuccess(true);
      setIsUpdateError(false);

      setName("");
      setEmail("");
      setGender("");
      setStatus("");

      alert("User updated.");
    } catch (error) {
      console.error(error);
      setIsUpdateSuccess(false);
      setIsUpdateError(true);
      alert("Update user failed.");
    }
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div>
      <div>
        <div>
          <p className="mt-10 mb-3 text-xl font-bold text-slate-600">
            Update User
          </p>
          <div className="mb-10">
            <form onSubmit={handleUpdateUser}>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-slate-600"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-describedby="helper-text-explanation"
                  className="bg-white border border-gray-300 text-slate-600 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-72 p-2.5"
                  placeholder="Name"
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
                Update
              </button>
            </form>

            {isUpdateSuccess && (
              <p className="my-5 text-base font-medium text-green-600/100">
                Update successful!
              </p>
            )}
            {isUpdateError && (
              <p className="my-5 text-base font-medium text-red-600/100">
                Update error. Please try again.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
