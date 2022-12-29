import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [task, setTask] = useState({});
  const navigate = useNavigate();
  const handleAddTask = (event) => {
    event.preventDefault();
    console.log(task);
    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Task added successfully");
          event.target.reset();
          navigate("/mytask");
        }
      });
  };
  const handleInputBlur = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    const newTask = { ...task };
    newTask[field] = value;
    setTask(newTask);
  };
  return (
    <div className="text-center mt-3">
      <h2 className="mb-3">please add a new Task</h2>
      <form onSubmit={handleAddTask}>
        <input
          onBlur={handleInputBlur}
          class="form-control w-25 m-auto d-inline-block"
          type="text"
          name="name"
          placeholder="task-name"
          required
        />
        <input
          onBlur={handleInputBlur}
          class="form-control w-25 m-auto d-inline-block"
          type="text"
          name="image"
          placeholder="task-img-url"
          required
        />
        <button type="submit" className="btn btn-info ms-2">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
