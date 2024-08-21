import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import BlogsSection from "./BlogsSection";
import SideBar from "./SideBar";

const Blogs = () => {
  const blogs = useSelector((store) => store?.blogs?.blogs);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  // Get unique categories including "All"
  const category = blogs.map((category) => category?.category);
  const uniqueCategory = ["All", ...new Set(category)];

  useEffect(() => {
    // When the component mounts, set filteredBlogs to all blogs
    setFilteredBlogs(blogs);
  }, [blogs]);

  const handleCategory = (elm) => {
    if (elm === "All") {
      setFilteredBlogs(blogs);
    } else {
      const filterBlogs = blogs.filter((blog) => blog.category === elm);
      setFilteredBlogs(filterBlogs);
    }
    setActiveCategory(elm);
  };

  const handleTags = (elm) => {
    const filterByTags = blogs.filter((blog) => blog.tags.includes(elm));
    setFilteredBlogs(filterByTags);
  };

  if (!blogs.length)
    return (
      <p className="text-center pt-56 text-red-600 text-2xl font-semibold">
        No blogs available.
      </p>
    );

  return (
    <section className="py-12 text-[var(--text-color)] mx-auto">
      <div className="container lg:w-3/4 w-full mx-auto flex overflow-x-scroll no-scrollbar mb-8">
        {uniqueCategory.map((elm) => (
          <div
            key={elm}
            className={`px-4 py-2 text-[var(--text-color)] hover:text-[var(--text-color)] hover:bg-gray-400 hover:cursor-pointer m-2 rounded-md text-lg font-semibold ${
              activeCategory === elm
                ? "bg-gray-400"
                : "bg-[var(--primary-color)]"
            }`}
          >
            <h2 className="text-center" onClick={() => handleCategory(elm)}>
              {elm}
            </h2>
          </div>
        ))}
      </div>
      <div className="container mx-auto flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-3/4 mx-auto">
          <BlogsSection blogs={filteredBlogs} handleTags={handleTags} />
        </div>
        <div className="w-full lg:w-1/4 mx-auto">
          <SideBar blogs={blogs} />
        </div>
      </div>
    </section>
  );
};

export default Blogs;
