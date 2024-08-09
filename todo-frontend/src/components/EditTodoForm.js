//if we want ot edit task, it will provide the option to do so

import React from "react";
import { useState } from "react";

export const EditTodoform = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (value) {
      editTodo(value, task._id); //add task
      setValue(""); //clear after add task button is clicked
    }
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={value}
        placeholder="Edit Task for today"
        onChange={(e) => setValue(e.target.value)}
      ></input>
      <button type="submit" className="todo-btn">
        EDIT TASK
      </button>
    </form>
  );
};
