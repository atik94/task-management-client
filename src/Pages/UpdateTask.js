import React, { useState } from "react";
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
          alert("Task updated");
          console.log(data);
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
    <div>
      <h2>Please Update: {storedTask.name}</h2>
      <form onSubmit={handleUpdateTask}>
        <input
          onChange={handleInputChange}
          defaultValue={storedTask.name}
          type="text"
          name="name"
          placeholder="task-name"
          required
        />
        <br />
        <input
          onChange={handleInputChange}
          defaultValue={storedTask.image}
          type="text"
          name="image"
          placeholder="task-img-url"
          required
        />
        <br />
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default UpdateTask;
