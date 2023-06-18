import React, { useState } from "react";
import Footer from "./Footer";
import CreateUser from "./Users/CreateUser";
import Navbar from "./Navbar";
import UserList from "./Users/UserList";

const Users = () => {
  const [users, setUsers] = useState([]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-10 min-h-screen">
        <CreateUser setUsers={setUsers} />
        <UserList users={users} setUsers={setUsers} />
      </div>
      <Footer />
    </div>
  );
};

export default Users;
