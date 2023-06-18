import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import PostDetail from "./components/PostDetail";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Posts from "./components/Posts";
import Users from "./components/Users";
import App from "./App";
import UserDetail from "./components/UserDetail";
import Login from "./components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/post/:postId",
    element: <PostDetail />,
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
