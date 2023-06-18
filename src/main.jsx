import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import UserDetail from "./components/Users/UserDetail";
import Login from "./components/Login";
import Users from "./components/Users";
import Post from "./components/Posts/Post";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/post/:postId",
    element: <Post />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/user/:userId",
    element: <UserDetail />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
