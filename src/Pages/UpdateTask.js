import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";

const UpdateTask = () => {
  const storedTask = useLoaderData();
  const [task, setTask] = useState(storedTask);
  const handleUpdateTask = (event) => {
    event.preventDefault();
    //console.log(task);
    fetch(`http://localhost:5000/tasks/${storedTask._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Task updated successfully");
        }
      });
  };
  const handleInputChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    const newTask = { ...task };
    newTask[field] = value;
    setTask(newTask);
  };
  return (
    <div className="text-center">
      <h2>Please Update</h2>
      <form onSubmit={handleUpdateTask}>
        <input
          onChange={handleInputChange}
          defaultValue={storedTask.name}
          class="form-control w-25 m-auto d-inline-block"
          type="text"
          name="name"
          placeholder="task-name"
          required
        />
        <input
          onChange={handleInputChange}
          defaultValue={storedTask.image}
          class="form-control w-25 m-auto d-inline-block"
          type="text"
          name="image"
          placeholder="task-img-url"
          required
        />
        <button className="btn btn-info ms-2" type="submit">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
