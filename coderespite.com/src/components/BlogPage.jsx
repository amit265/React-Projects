import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SingleBlog from "./SingleBlog";
import SideBar from "./SideBar";

const BlogPage = () => {
  const { id } = useParams();
  const blogs = useSelector((store) => store?.blogs?.blogs);
  window.scrollTo(0, 0);
  const blog = blogs.find((blogPost) => blogPost.id === Number(id));

  // Set header height (adjust as needed based on your header's actual height)
  const headerHeight = '64px'; // Example value, adjust to match your header's height

  return (
    <section className="container mx-auto flex flex-col lg:flex-row lg:space-x-4 py-4">
      <div
        className="flex-1 lg:max-h-[calc(100vh_-_64px)] overflow-y-auto p-4 lg:p-8 no-scrollbar"
        style={{ maxHeight: `calc(100vh - ${headerHeight})` }}
      >
        {/* Add padding to the blog content area */}
        <SingleBlog blog={blog} />
      </div>
      <div className="lg:w-1/4 w-full mt-4 lg:mt-0">
        {/* Margin to separate the sidebar */}
        <SideBar blogs={blogs} />
      </div>
    </section>
  );
};

export default BlogPage;
