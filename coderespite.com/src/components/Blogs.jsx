import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import BlogsSection from "./BlogsSection";
import SideBar from "./SideBar";
import MyAutocomplete from "./MyAutocomplete";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const blogs = useSelector((store) => store?.blogs?.blogs);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  // Get unique categories including "All"
  const category = blogs.map((category) => category?.category);
  const blogSearch = blogs.map((blog) => blog?.title);
  const uniqueCategory = ["All", ...new Set(category)];

  useEffect(() => {
    // When the component mounts, set filteredBlogs to all blogs
    setFilteredBlogs(blogs);
  }, [blogs]);

  useEffect(() => {
    if (value) {
      const searchedBlog = blogs.find((blog) => blog?.title === value);
      if (searchedBlog) {
        navigate(`/blogs/${searchedBlog.id}`);
      }
    }
  }, [value, blogs, navigate]);

  const handleCategory = (e) => {
    if (e.target.value === "All") {
      setFilteredBlogs(blogs);
    } else {
      const filterBlogs = blogs.filter(
        (blog) => blog.category === e.target.value
      );
      setFilteredBlogs(filterBlogs);
    }
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
      <div className="w-full lg:w-3/4 mx-auto">
        <div className="flex justify-center items-center mb-4">
          <div className="relative w-full">
            <MyAutocomplete
              value={value}
              setValue={setValue}
              inputValue={inputValue}
              setInputValue={setInputValue}
              data={blogSearch}
            />
          </div>
        </div>
        <select
          onChange={handleCategory}
          name="category"
          id="blog_category"
          className="max-w-md mb-4 px-2 py-2 border outline-none rounded-md text-[var(--background-color)]"
        >
          {uniqueCategory.map((elm) => (
            <option key={elm} value={elm}>
              {elm.charAt(0).toUpperCase() + elm.slice(1)}
            </option>
          ))}
        </select>
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
