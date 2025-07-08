import { useContext, useEffect, useState } from "react";
import BlogCards from "./BlogCards";
import Pagination from "./Pagination";
import CategorySelection from "./CategorySelection";
import SideBar from "./SideBar";
import { DataContext } from "../context/DataContext";

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const { data } = useContext(DataContext); // full dataset from context

  useEffect(() => {
    let filteredData = data;

    // Filter by selected category if any
    if (selectedCategory) {
      filteredData = filteredData.filter(
        (blog) => blog.category === selectedCategory
      );
    }

    // Pagination logic
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    setBlogs(paginatedData);
  }, [currentPage, selectedCategory, data]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setActiveCategory(category);
  };

  return (
    <>
      {/* Category Section */}
      <div>
        <CategorySelection
          onSelectCategory={handleCategoryChange}
          selectedCategory={selectedCategory}
          activeCategory={activeCategory}
        />
      </div>

      {/* Blog Cards and Sidebar */}
      <div className="flex flex-col lg:flex-row gap-12">
        <BlogCards
          blogs={blogs}
          currentPage={currentPage}
          selectedCategory={selectedCategory}
          pageSize={pageSize}
        />

        <div>
          <SideBar />
        </div>
      </div>

      {/* Pagination */}
      <div>
        <Pagination
          onPageChange={handlePageChange}
          blogs={
            selectedCategory
              ? data.filter((blog) => blog.category === selectedCategory)
              : data
          }
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </div>
    </>
  );
}

export default BlogPage;
