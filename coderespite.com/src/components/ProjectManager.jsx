import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjects,
  addProject,
  updateProject,
  deleteProject,
} from "../utils/actions";
import { BASE_URL } from "../utils/projects";

function ProjectsManager({ table }) {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects[table]);

  const [newProject, setNewProject] = useState({
    title: "",
    path: "",
    path_root: "",
    visible: true,
    rating: "",
    description: "",
  });
  const [editProject, setEditProject] = useState(null);

  useEffect(() => {
    dispatch(fetchProjects(table));
  }, [table, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (editProject) {
      setEditProject({ ...editProject, [name]: value });
    } else {
      setNewProject({ ...newProject, [name]: value });
    }
  };

  const handleAddProject = () => {
    const result = confirm("Are you sure?");
    if (result) {
      dispatch(addProject(table, newProject));
      setNewProject({
        title: "",
        path: "",
        path_root: "",
        visible: true,
        rating: "",
        description: "",
      });
    }
  };

  const handleEditProject = (project) => {
    setEditProject(project);
  };

  const handleUpdateProject = () => {
    const result = confirm("Are you sure?");
    if (result) {
      dispatch(updateProject(table, editProject));
      setEditProject(null);
    }
  };

  const handleDeleteProject = (id) => {
    const result = confirm("Are you sure?");
    if (result) {
      dispatch(deleteProject(table, id));
    }
  };

  return (
    <div className="p-4 text-[var(--text-color)]">
      <h2 className="text-3xl font-bold text-[var(--primary-color)]">
        Manage {table.charAt(0).toUpperCase() + table.slice(1)} Projects
      </h2>
      <div className="mb-4 max-w-xl mx-auto py-12 text-[var(--text-color)]">
        <h3 className="font-semibold mb-2 text-[var(--primary-color)]">
          {editProject ? "Edit Project" : "Add New Project"}
        </h3>
        <input
          className="mb-4 w-full px-4 py-2 border rounded-md text-[var(--background-color)]"
          type="text"
          name="title"
          placeholder="Title"
          value={editProject ? editProject.title : newProject.title}
          onChange={handleInputChange}
        />
        <input
          className="mb-4 w-full px-4 py-2 border rounded-md text-[var(--background-color)]"
          type="text"
          name="path"
          placeholder="Path"
          value={editProject ? editProject.path : newProject.path}
          onChange={handleInputChange}
        />
        <h2 className="mb-2" htmlFor="">
          {BASE_URL + "projects/" + table + "/" + newProject.path}
        </h2>
        {/* //https://coderespite.com/projects/react/swiggy/ */}
        <input
          className="mb-4 w-full px-4 py-2 border rounded-md text-[var(--background-color)]"
          type="text"
          name="path_root"
          placeholder={BASE_URL + "projects/" + table + "/" + newProject.path}
          value={editProject ? editProject.path_root : newProject.path_root}
          onChange={handleInputChange}
        />

        <input
          className="mb-4 w-full px-4 py-2 border rounded-md text-[var(--background-color)]"
          type="text"
          name="rating"
          placeholder="Rating"
          value={editProject ? editProject.rating : newProject.rating}
          onChange={handleInputChange}
        />
        <textarea
          className="mb-4 w-full px-4 py-2 border rounded-md text-[var(--background-color)]"
          type="text"
          name="description"
          placeholder="Description"
          value={editProject ? editProject.description : newProject.description}
          onChange={handleInputChange}
        />
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            name="visible"
            className="mr-2"
            checked={editProject ? editProject.visible : newProject.visible}
            onChange={(e) =>
              handleInputChange({
                target: { name: "visible", value: e.target.checked },
              })
            }
          />
          Visible
        </label>

        {editProject ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 hover:scale-110"
            onClick={handleUpdateProject}
          >
            Update Project
          </button>
        ) : (
          <button
            className="px-6 py-3 bg-[var(--primary-color)] text-lg rounded-md hover:bg-[#ef231a]"
            onClick={handleAddProject}
          >
            Add Project
          </button>
        )}
      </div>

      <div className="text-[var(--background-color)]">
        <h3 className="text-3xl font-bold mb-6 text-[var(--primary-color)] hover:text-[#ef233c] lexend">
          Projects List
        </h3>

        <div
          className={
            "flex pb-4 justify-center lg:justify-between flex-wrap gap-8"
          }
        >
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project.id + project.path}
                className="w-80 flex flex-col  gap-2 px-4 py-2 border rounded-lg shadow-lg flex-shrink-0 bg-[var(--text-color)]"
              >
                <p className="text-left gap-4">
                  <strong>Title:</strong> {project.title}
                </p>
                <img
                  className="object-cover h-64 mx-auto w-full rounded-lg shadow-lg cursor-pointer"
                  src={project.image_root}
                  alt=""
                />
                <p className="text-left gap-4">
                  <strong>Path:</strong> {project.path}
                </p>

                <p className="text-left gap-4">
                  <strong>Visible:</strong> {project.visible}
                </p>
                <p className="text-left gap-4">
                  <strong>Rating:</strong> {project.rating}
                </p>
                <p className="text-left">
                  <strong>Description:</strong>{" "}
                  {project.description.slice(0, 100) + "..."}
                </p>
                <button
                  className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded-md"
                  onClick={() => handleEditProject(project)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No projects available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectsManager;
