import React from "react";
import { Link } from "react-router-dom";

const SideBar = ({ blogs }) => {

  return (
    <aside className="px-2 mx-auto">
      <h2 className="text-2xl mb-4 text-[var(--primary-color)] text-center">
        Trending Posts
      </h2>

      {blogs.slice(0, 4).map((blog, index) => (
        <div
          key={blog.id}
          className="mb-4 bg-[var(--text-color)] text-[var(--background-color)] p-2 rounded-lg shadow-sm shadow-[var(--text-color)]"
        >
          <div className="flex">
            <h1 className="my-auto text-4xl px-4 text-[var(--primary-color)]">{index + 1}</h1>
            <Link to={`/blogs/${blog.id}`} className="flex items-center">
              <h2 className="hover:text-[var(--primary-color)]">
                {blog.title}
              </h2>
              {/* <h2 className="text-base align-baseline hover:text-[var(--primary-color)]">
                Read more <span className="align-baseline text-2xl">→</span>{" "}
              </h2> */}
            </Link>
          </div>
        </div>
      ))}
    </aside>
  );
};

export default SideBar;
