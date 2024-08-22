import { useEffect } from "react";
import { BASE_URL } from "../utils/projects";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../utils/errorSlice";
import { addBlog } from "../utils/blogSlice";

const useBlogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((store) => store?.blogs);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(BASE_URL + `api/blogs/`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      dispatch(addBlog(data));
    } catch (error) {
      dispatch(setError("Failed to fetch blogs: ", error));
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
};

export default useBlogs;
