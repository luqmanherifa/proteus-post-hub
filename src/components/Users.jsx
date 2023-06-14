import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://gorest.co.in/public/v2/users")
      .then((response) => {
        setUsers(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-10">
      {users.map((user) => (
        <div key={user.id} className="mb-5">
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <p>{user.gender}</p>
          <p>{user.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Users;
