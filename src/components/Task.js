import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo } from "../features/todoSlice";
import "./Task.css";

const Task = () => {
  const tasks = useSelector((state) => state.todo.tasks);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  function addNewTask() {
    const task = inputRef.current.value.trim();
    if (task !== "") {
      dispatch(addTodo(task));
      inputRef.current.value = "";
    }
  }

  function deleteTask(id) {
    dispatch(deleteTodo(id));
  }

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List</h1>

      <div className="todo-input-container">
        <input
          type="text"
          placeholder="Add a new todo"
          ref={inputRef}
          className="todo-input"
        />
        <button onClick={addNewTask} className="todo-button">
          Add task
        </button>
      </div>

      <ul className="todo-list">
        {tasks.map((task) => (
          <li className="todo-item" key={task.id}>
            {task.text}
            <button
              className="delete-button"
              onClick={() => deleteTask(task.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Task;
