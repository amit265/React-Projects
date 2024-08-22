import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const BlogsSection = ({ blogs, handleTags, horizontalScroll, animation, tags }) => {
  const location = useLocation();
  const [hovered, setHovered] = useState(null);

  return (
    <section className="text-[var(--background-color)] mx-auto">
      <div
        className={`flex py-4 justify-center ${
          horizontalScroll
            ? "flex-wrap lg:flex-nowrap lg:overflow-x-auto lg:no-scrollbar"
            : "flex-wrap"
        } gap-8`}
      >
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className={`w-80 px-4 py-2 border rounded-lg shadow-[var(--background-color)] shadow-lg flex-shrink-0 bg-[var(--text-color)] transition-transform duration-300 ${
              hovered === null && animation ? "lg:animate-move" : ""
            } hover:scale-105 ${hovered === blog.id ? "relative z-10" : ""}`}
            onMouseEnter={() => setHovered(blog.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div>
              <h3 className="text-base font-semibold mb-2">{blog.title}</h3>
              {tags && <p className="text-xs mb-4">
                {blog.tags.split(" ").map((elem) => (
                  <span
                    key={elem}
                    className="bg-[var(--background-color)] text-[var(--text-color)] mr-1 p-2 rounded-lg hover:cursor-pointer hover:bg-[var(--primary-color)]"
                    onClick={() => handleTags(elem)}
                  >
                    #{elem}
                  </span>
                ))}
              </p>}
            </div>

            <div className="relative">
              <a href={blog.path} target="_blank" rel="noopener noreferrer">
                {blog.image_url && (
                  <img
                    className="object-cover h-56 mx-auto w-full rounded-lg shadow-lg cursor-pointer"
                    src={blog.image_url}
                    alt={blog.title}
                  />
                )}
              </a>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-lg">
                <div className="flex gap-4">
                  <Link
                    to={`/blogs/${blog.id}`}
                    className="flex items-center gap-2 text-[var(--text-color)] hover:text-[var(--primary-color)]"
                  >
                    <button className="bg-[var(--primary-color)] px-4 py-2 text-[var(--text-color)] rounded-md hover:bg-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors duration-300">
                      Read
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm my-2">
                🕗: {Math.ceil(blog.content.split(" ").length * 0.005)} minute
                read
              </p>
              <p className="text-sm mb-2">✍ : {blog.author}</p>
            </div>

            <div>
              <p className="text-sm mb-2">🗓: {blog.created_at.slice(0, 10)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogsSection;
