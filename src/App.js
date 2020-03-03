import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // https://jsonplaceholder.typicode.com/posts
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagePerPost] = useState(10);
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    setLoading(true);
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    setPosts(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);
  if (loading) return <p>Loading</p>;

  const handlePaginate = num => {
    setCurrentPage(num);
    console.log(num);
  };

  const lastIndex = currentPage * pagePerPost;
  const firstIndex = lastIndex - pagePerPost;
  const currentPosts = posts.slice(firstIndex, lastIndex);

  const pageNumber = [];
  for (let i = 0; i < Math.ceil(posts.length / pagePerPost); i++) {
    pageNumber.push(i);
  }
  return (
    <div>
      {currentPosts.map(post => (
        <p>
          <span>Title: </span> {post.title}
        </p>
      ))}
      {pageNumber.map(p => (
        <span
          onClick={() => handlePaginate(p + 1)}
          style={{ border: "1px solid #888", padding: "10px", margin: "0 5px" }}
        >
          {p + 1}
        </span>
      ))}
    </div>
  );
}

export default App;
