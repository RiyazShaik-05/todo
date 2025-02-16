import React, { useState } from "react";
import { useTodo } from "../contexts";
function TodoForm() {
  const [todoMsg, setTodoMsg] = useState("");
  const { addTodo } = useTodo();

  const handleAdd = (e) => {
    e.preventDefault();
    if (!todoMsg) return;
    addTodo({ todo: todoMsg });
    setTodoMsg("");
  };

  return (
    <form onSubmit={handleAdd}>
      <div className="flex w-full items-center justify-center mt-10">
        <input
          type="text"
          placeholder="Enter todo.."
          className="p-2 w-2/3 rounded-tl rounded-bl bg-white outline-none"
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
        />
        <button
          type="submit" // Ensures it submits the form
          className="p-2 bg-green-500 rounded-tr rounded-br text-white hover:bg-green-700 outline-none w-16 cursor-pointer"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
