import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import PostDetail from "./components/PostDetail";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Posts from "./components/Posts";
import Users from "./components/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Posts />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/post/:postId",
    element: <PostDetail />,
  },
  {
    path: "/users",
    element: <Users />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
