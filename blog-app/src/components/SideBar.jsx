import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


const SideBar = () => {
    let url = `https://coderespite.com/api/blogsData.json`;

    const [popularBlogs, setPopularBlogs] = useState([]);

    useEffect(() => {
        fetch(url).then(res => res.json()).then(data => setPopularBlogs(data.slice(0, 15)))
    }, [])
  return (
    <div>
        <div>
            <h3 className='text-2xl font-semibold px-4'>Latest Posts</h3>
            <div>
                {
                    popularBlogs.slice(0, 5).map(blog => <div key={blog.id}
                    className="my-5 border-b-2 border-spacing-2px-4"
                    >
                        <h4 className="font-medium mb-2">{blog.title}</h4>
                        <Link to={`/blogs/${blog.id}`} className="font-medium text-base pb-2 hover:text-orange-500 inline-flex items-center" >Read more<FaArrowRight className="mt-1 ml-2" /></Link>

                    </div>)
                }
            </div>
        </div>

        <div>
            <h3 className='text-2xl font-semibold px-4 mt-20'>Popular Posts</h3>
            <div>
                {
                    popularBlogs.slice(6, 10).map(blog => <div key={blog.id}
                    className="my-5 border-b-2 border-spacing-2px-4"
                    >
                        <h4 className="font-medium mb-2">{blog.title}</h4>
                        <Link to={`/blogs/${blog.id}`} className="font-medium text-base pb-2 hover:text-orange-500 inline-flex items-center" >Read more<FaArrowRight className="mt-1 ml-2" /></Link>

                    </div>)
                }
            </div>
        </div>
    </div>
  )
}

export default SideBar