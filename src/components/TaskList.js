import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, deleteTask, updateStatus }) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          updateStatus={updateStatus}
        />
      ))}
    </div>
  );
}

export default TaskList;