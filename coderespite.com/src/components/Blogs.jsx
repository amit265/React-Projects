import { useSelector } from "react-redux";
import React from "react";
import BlogsSection from "./BlogsSection";

const Blogs = () => {
  const blogs = useSelector((store) => store?.blogs?.blogs);

  if (!blogs.length) return <p>No blogs available.</p>;

  return (
    <div>
      <h1>All Blogs</h1>
      <BlogsSection blogs={blogs} />
    </div>
  );
};

export default Blogs;
