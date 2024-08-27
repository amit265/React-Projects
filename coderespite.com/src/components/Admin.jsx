// Admin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectsManager from "./ProjectManager";
import BlogAdmin from "./BlogAdmin";

const Admin = () => {
  const [project, setProject] = useState("react");

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleChange = (e) => {
    setProject(e.target.value);
  };
  return (
    <section className="py-8 text-[var(--text-color)]">
      <div className="container mx-auto px-4 text-center">
        <div className="flex px-4 rounded-md mb-12 py-4 justify-between items-center shadow-sm shadow-[var(--text-color)]">
          <select
            onChange={handleChange}
            value={project}
            name="projects"
            id="project"
            className="max-w-md px-4 py-2 border rounded-md text-[var(--background-color)]"
          >
            <option value="react">React</option>
            <option value="next">Next</option>

            <option value="javascript">JavaScript</option>
            <option value="responsive">Responsive</option>
            <option value="blog">Blog</option>
          </select>
          <h1 className="text-2xl text-[var(--primary-color)]">Admin Panel</h1>

          <button
            className="px-4 py-2 bg-[var(--primary-color)] text-lg rounded-md hover:scale-110"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
        {project === "react" && <ProjectsManager table="react" />}
        {project === "javascript" && <ProjectsManager table="javascript" />}
        {project === "responsive" && <ProjectsManager table="responsive" />}
        {project === "next" && <ProjectsManager table="next" />}

        {project === "blog" && <BlogAdmin />}
      </div>
    </section>
  );
};

export default Admin;
