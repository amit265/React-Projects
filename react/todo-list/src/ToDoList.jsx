import React, { useState } from "react";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index, newText) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-center mb-5">To-Do List</h1>
        <div className="mb-4">
          <input
            type="text"
            name=""
            id=""
            className="w-full px-3 py-2 border rounded"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
          />
          <button
            className="mt-2 w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>

        <div className="mb-4">
          <button
            className={`px-3 py-2 rounded ${
              filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-3 py-2 mr-2 rounded ${
              filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={`px-3 py-2 rounded ${
              filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>

          <ul>
            {filteredTasks.map((task, index) => (
              <li
                key={index}
                className="flex justify-between items-center mb-2"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(index)}
                  />
                  {task.completed ? (
                    <del className="text-gray-500">{task.text}</del>
                  ) : (
                    <span>{task.text}</span>
                  )}
                </div>
                <div className="flex items-center">
                  <button
                    className="mr-2 text-blue-500"
                    onClick={() => {
                      const newText = prompt("Edit task", task.text);
                      if (newTask !== null) {
                        editTask(index, newText);
                      }
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => deleteTask(index)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ToDoList;
