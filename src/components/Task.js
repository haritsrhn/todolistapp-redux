import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, updateTodo } from "../features/todoSlice";
import "./Task.css";

const Task = () => {
  const tasks = useSelector((state) => state.todo.tasks);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [editId, setEditId] = useState(null);

  function deleteTask(id) {
    dispatch(deleteTodo(id));
  }

  function updateTask(task) {
    inputRef.current.value = task.text;
    setEditId(task.id);
  }

  function handleAddOrUpdateTask() {
    const taskText = inputRef.current.value.trim();
    if (taskText === "") return;

    if (editId) {
      dispatch(updateTodo({ id: editId, text: taskText }));
      setEditId(null);
    } else {
      dispatch(addTodo(taskText));
    }
    inputRef.current.value = "";
  }

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List RTK</h1>

      <div className="todo-input-container">
        <input
          type="text"
          placeholder="Add a new todo"
          ref={inputRef}
          className="todo-input"
        />
        <button onClick={handleAddOrUpdateTask} className="todo-button">
          {editId ? "Update task" : "Add task"}
        </button>
      </div>

      <ul className="todo-list">
        {tasks.map((task) => (
          <li className="todo-item" key={task.id}>
            {task.text}
            <button className="update-button" onClick={() => updateTask(task)}>
              Edit
            </button>
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
