import { useSelector } from "react-redux";
import React from "react";
import BlogsSection from "./BlogsSection";

const Blogs = () => {
  const blogs = useSelector((store) => store?.blogs?.blogs);

  if (!blogs.length) return <p className="text-center pt-56 text-red-600 text-2xl font-semibold">No blogs available.</p>;

  return (
    <section className="bg-[var(--background-color)] p-8 text-[var(--text-color)] text-base sm:text-xl text-pretty mx-auto lg:w-1/2 md:w-3/4 w-full">
      <h1>All Blogs</h1>
      
      <BlogsSection blogs={blogs} />
    </section>
  );
};

export default Blogs;
