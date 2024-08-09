import React, { useState, useEffect } from "react";
import { Todoform } from "./Todoform";
import { EditTodoform } from "./EditTodoForm";
import { Todo } from "./Todo";
import axios from "axios";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error(error));
  }, []);

  const addTodo = (todo) => {
    console.log("Adding todo:", todo); // Debug log
    axios
      .post("http://localhost:5000/todos", { task: todo }) // Ensure payload matches backend expectations
      .then((response) => {
        console.log("Todo added:", response.data); // Debug log
        setTodos([...todos, response.data]);
      })
      .catch((error) => {
        console.error("Error adding todo:", error.response.data); // Log detailed error response
      });
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((error) =>
        console.error("Error deleting todo:", error.response.data)
      );
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo._id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const toggleComplete = (id) => {
    const todo = todos.find((todo) => todo._id === id);
    axios
      .patch(`http://localhost:5000/todos/${id}`, {
        completed: !todo.completed,
      })
      .then((response) =>
        setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)))
      )
      .catch((error) => console.error(error));
  };

  const editTask = (task, id) => {
    axios
      .patch(`http://localhost:5000/todos/${id}`, { task, completed: false }) // Ensure the data is correct
      .then((response) => {
        setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      })
      .catch((error) =>
        console.error("Error updating todo:", error.response.data)
      );
  };

  return (
    <div className="TodoWrapper">
      <h1>DoIT</h1>
      <Todoform addTodo={addTodo} />

      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoform editTodo={editTask} task={todo} key={todo._id} />
        ) : (
          <Todo
            key={todo._id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
