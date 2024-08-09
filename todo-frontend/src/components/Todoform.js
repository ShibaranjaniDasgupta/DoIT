//we can add task
import React from "react";
import { useState } from "react";

export const Todoform = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (value) {
      addTodo(value); //add task
      setValue(""); //clear after add task button is clicked
    }
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={value}
        placeholder="Task for today"
        onChange={(e) => setValue(e.target.value)}
      ></input>
      <button type="submit" className="todo-btn">
        ADD TASK
      </button>
    </form>
  );
};
