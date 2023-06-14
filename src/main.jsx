import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Post from "./components/Post";
import PostDetail from "./components/PostDetail";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Post />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/post/:postId",
    element: <PostDetail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
