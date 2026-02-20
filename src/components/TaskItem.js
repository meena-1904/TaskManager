import React from "react";

function TaskItem({ task, deleteTask, updateStatus }) {
  return (
    <div className="card mb-3 p-3">
      <h5>{task.title}</h5>
      <p>{task.description}</p>

      <div className="d-flex justify-content-between">
        <select
          className="form-select w-50"
          value={task.status}
          onChange={(e) => updateStatus(task.id, e.target.value)}
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>

        <button
          className="btn btn-danger"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;