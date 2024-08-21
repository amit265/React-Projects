import { useSelector } from "react-redux";
import React from "react";
import BlogsSection from "./BlogsSection";
import { category } from "../utils/constants";

const Blogs = () => {
  const blogs = useSelector((store) => store?.blogs?.blogs);

  if (!blogs.length)
    return (
      <p className="text-center pt-56 text-red-600 text-2xl font-semibold">
        No blogs available.
      </p>
    );

  return (
    <section className="py-12 text-[var(--text-color)] mx-auto">
      <div className="w-3/4 mx-auto flex overflow-x-scroll no-scrollbar mb-8 ">
        {category.blogCategories.map((category) => (
          <div key={category} className="rounded-lg">
            <h2 className="text-base font-semibold text-center text-[var(--primary-color)] rounded-lg min-w-56 p-4 bg-[var(--text-color)] mr-4 hover:cursor-pointer hover:bg-gray-500 ">
              {category}
            </h2>
          </div>
        ))}
      </div>

      <BlogsSection blogs={blogs} />
    </section>
  );
};

export default Blogs;
