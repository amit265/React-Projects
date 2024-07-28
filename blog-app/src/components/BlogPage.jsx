import  { useEffect, useState } from "react";
import BlogCards from "./BlogCards";
import Pagination from "./Pagination";
import CategorySelection from "./CategorySelection";
import SideBar from "./SideBar";

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  
  useEffect(() => {
    let url = `https://coderespite.com/api/blogsData.json?page=${currentPage}&limit=${pageSize}`;

    //filter by category

    if (selectedCategory) {
      url += `&category=${selectedCategory}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, [currentPage, pageSize, selectedCategory]);

  //page changing  btn
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
      {/* category section */}
      <div>
        <CategorySelection
          onSelectCategory={handleCategoryChange}
          selectedCategory={selectedCategory}
          activeCategory={activeCategory}
        />
      </div>

      {/* Blog card  */}
      <div className="flex flex-col lg:flex-row gap-12">
        <BlogCards
          blogs={blogs}
          currentPage={currentPage}
          selectedCategory={selectedCategory}
          pageSize={pageSize}
        />


      {/* Side bar */}
    <div>
      <SideBar />
    </div>
      </div>



      {/* Pagination */}
      <div>
        <Pagination
          onPageChange={handlePageChange}
          blogs={blogs}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </div>
    </>
  );
}

export default BlogPage;
