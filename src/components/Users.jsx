import React, { useState } from "react";
import Footer from "./Footer";
import CreateUser from "./Users/CreateUser";
import Navbar from "./Navbar";
import UserList from "./Users/UserList";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-10 min-h-screen">
        <button
          type="button"
          onClick={() =>
            setIsCreateOpen((prevIsCreateOpen) => !prevIsCreateOpen)
          }
          className=" mb-5 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300"
        >
          {isCreateOpen ? "Cancel" : "Create"}
        </button>
        {isCreateOpen && <CreateUser setUsers={setUsers} />}
        <UserList users={users} setUsers={setUsers} />
      </div>
      <Footer />
    </div>
  );
};

export default Users;
