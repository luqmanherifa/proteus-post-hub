import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://gorest.co.in/public/v2/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchUser();
  }, [userId, accessToken]);

  const handleUpdate = async (event) => {
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
      alert("User berhasil di-update.");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat update pengguna.");
    }
  };
  const navigate = useNavigate();

  const deleteUser = async (userId) => {
    try {
      const confirmed = window.confirm("Anda yakin ingin menghapus pengguna?");

      if (confirmed) {
        await axios.delete(`https://gorest.co.in/public/v2/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        alert("User berhasil dihapus.");
        navigate("/users");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat menghapus pengguna.");
    }
  };

  return (
    <div>
      <Navbar />
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
                  <h5 className="mb-1 text-xl font-bold text-slate-600">
                    {user.name}
                  </h5>
                  <div className="mb-1 text-base text-slate-600">
                    Email: {user.email}
                  </div>
                  <div className="mb-1 text-base text-slate-600">
                    Gender:{" "}
                    {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
                  </div>
                  <div className="text-base text-slate-600">
                    Status:{" "}
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </div>
                </div>
              </div>
            </div>
            <Link
              to="/users"
              className="mt-5 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-sky-500 rounded-lg hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300"
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

            <h2 className="mt-10">Update User</h2>
            <form onSubmit={handleUpdate}>
              <div>
                <label>
                  Name:
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label>
                  Email:
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label>
                  Gender:
                  <input
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label>
                  Status:
                  <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </label>
              </div>
              <button type="submit" className="mb-10">
                Update User
              </button>
            </form>

            <button onClick={() => deleteUser(userId)}>Delete User</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetail;
