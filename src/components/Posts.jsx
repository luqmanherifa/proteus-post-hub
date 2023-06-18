import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PostPagination from "./Posts/PostPagination";
import PostList from "./Posts/PostList";

const Posts = () => {
  return (
    <div className="max-w-6xl mx-auto mb-20">
      <PostList />
    </div>
  );
};

export default Posts;
