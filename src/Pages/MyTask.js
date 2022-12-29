import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link, useLoaderData } from "react-router-dom";

const MyTask = () => {
  const tasks = useLoaderData();
  const [displayTasks, setDisplayTasks] = useState(tasks);
  const handleDelete = (task) => {
    const agree = window.confirm(`Are you sure you want to delete: ${task.name}`);
    if (agree) {
      fetch(`http://localhost:5000/tasks/${task._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success("Task deleted successfully");
            const remainingTasks = displayTasks.filter((tsk) => tsk._id !== task._id);
            setDisplayTasks(remainingTasks);
          }
        });
    }
  };
  return (
    <div>
      <h2 className="text-center mb-3">Total Task: {displayTasks.length} </h2>
      <div>
        {displayTasks.map((task) => (
          <Table striped variant="light">
            <tbody>
              <tr>
                <td>{task.name}</td>
                <td>
                  <img
                    style={{ width: "50px", height: "50px" }}
                    src={task.image}
                    className="img-fluid rounded"
                    alt=""
                  />
                </td>
                <td>
                  <Link to={`/update/${task._id}`}>
                    <button className="btn btn-success">Update</button>
                  </Link>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(task)}>
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </Table>
        ))}
      </div>
    </div>
  );
};

export default MyTask;
