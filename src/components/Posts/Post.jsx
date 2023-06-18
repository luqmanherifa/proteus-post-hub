import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostDetail from "./PostDetail";
import PostComments from "./PostComments";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`https://gorest.co.in/public/v2/posts/${postId}`)
      .then((response) => {
        setPost(response.data);
        return axios.get(
          `https://gorest.co.in/public/v2/comments?post_id=${postId}`
        );
      })
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, [postId]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <PostDetail post={post} />
        <PostComments comments={comments} />
      </div>
      <Footer />
    </div>
  );
};

export default Post;
