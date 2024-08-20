import { useSelector } from "react-redux";
import React from "react";
import BlogsSection from "./BlogsSection";

const Blogs = () => {
  const blogs = useSelector((store) => store?.blogs?.blogs);

  if (!blogs.length) return <p className="text-center pt-56 text-red-600 text-2xl font-semibold">No blogs available.</p>;

  return (
    <section className="py-12 text-[var(--text-color)] mx-auto">
      <h1 className="text-center text-[var(--primary-color)] font-semibold text-3xl mb-16">All Blogs</h1>

      <BlogsSection blogs={blogs} />
    </section>
  );
};

export default Blogs;
