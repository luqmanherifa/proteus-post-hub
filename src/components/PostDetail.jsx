import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostDetail = () => {
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
        console.log(error);
      });
  }, [postId]);

  return (
    <div>
      {post && (
        <div>
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-700">{post.body}</p>
        </div>
      )}

      {comments.length > 0 && (
        <div>
          <h2 className="mt-10 text-xl font-bold mb-2">Comments:</h2>
          {comments.map((comment) => (
            <div key={comment.id}>
              <h2 className="text-xl font-semibold">{comment.name}</h2>
              <p className="text-gray-700">{comment.email}</p>
              <p className="text-gray-700">{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostDetail;
