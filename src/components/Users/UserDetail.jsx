import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import UpdateUser from "./UpdateUser";
import Footer from "../Footer";

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
  const navigate = useNavigate();

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

  const deleteUser = async (userId) => {
    try {
      const confirmed = window.confirm("Anda yakin ingin menghapus pengguna?");

      if (confirmed) {
        await axios.delete(`https://gorest.co.in/public/v2/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        alert("User deleted.");
        navigate("/users");
      }
    } catch (error) {
      alert("Delete failed.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <div className="flex justify-center mt-10">
          {user && (
            <div>
              <div className="w-[40rem] bg-white border border-gray-200 px-8 py-8 rounded-xl">
                <div className="flex">
                  <div className="flex gap-5">
                    <img
                      className="w-28 h-28 rounded-full"
                      src="https://source.unsplash.com/200x200?landscape"
                      alt="Bonnie image"
                    />
                    <div className="w-[30rem]">
                      <h5 className="line-clamp-1 mb-1 text-xl font-bold text-slate-600">
                        {user.name}
                      </h5>
                      <div className="mb-1 text-base text-slate-600">
                        Email: {user.email}
                      </div>
                      <div className="mb-1 text-base text-slate-600">
                        Gender:{" "}
                        {user.gender.charAt(0).toUpperCase() +
                          user.gender.slice(1)}
                      </div>
                      <div className="text-base text-slate-600">
                        Status:{" "}
                        {user.status.charAt(0).toUpperCase() +
                          user.status.slice(1)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
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
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setIsUpdateOpen((prevIsUpdateOpen) => !prevIsUpdateOpen)
                    }
                    className="mt-5 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300"
                  >
                    {isUpdateOpen ? "Cancel" : "Update"}
                  </button>
                  <button
                    onClick={() => deleteUser(userId)}
                    type="button"
                    className="mt-5 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {isUpdateOpen && (
                <UpdateUser
                  userId={userId}
                  name={name}
                  email={email}
                  gender={gender}
                  status={status}
                  setUser={setUser}
                  setName={setName}
                  setEmail={setEmail}
                  setGender={setGender}
                  setStatus={setStatus}
                />
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDetail;
