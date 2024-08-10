import { useEffect } from "react";
import { BASE_URL } from "../utils/projects";
import { useDispatch, useSelector } from "react-redux";
import { addJavascript, addReact, addResponsive } from "../utils/projectsSlice";
import { setError } from "../utils/errorSlice";

const useProjects = (project) => {
  const dispatch = useDispatch();
  const projects = useSelector((store) => store?.projects?.project);
  const fetchProjects = async () => {
    if (!project) return;
    try {
      const response = await fetch(BASE_URL + `/api/projects/${project}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (project === "react") {
        dispatch(addReact(data));
      } else if (project === "javascript") {
        dispatch(addJavascript(data));
      } else if (project === "responsive") {
        dispatch(addResponsive(data));
      }
    } catch (error) {
      dispatch(setError("Failed to fetch projects: ", error));
    }
  };

  useEffect(() => {
    !projects && fetchProjects();
  }, [project]);
};

export default useProjects;
