import React, { useState, useEffect } from "react";
import { TodoProvider } from "./contexts";
import { TodoForm } from "./components";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((currTodo) => (currTodo.id === id ? todo : currTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((currTodo) => currTodo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((currTodo) =>
        currTodo.id === id ? { ...currTodo, completed: !currTodo.completed } : currTodo
      )
    );
  };

  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length>0) setTodos(todos);
  },[])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  },[todos])

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-gray-800 min-h-screen ">
        <h1 className="text-3xl text-white bg-gray-700 shadow py-2 text-center">
          Todo App
        </h1>
        <TodoForm />
        {/* <TodoItem todo={{id:"1",todo:"sample"}}/> */}
        {
          todos.map((currTodo)=>(
            <div key={currTodo.id} className="w-full flex justify-center items-center">
              <TodoItem todo={currTodo}/>
            </div>
          ))
        }
      </div>
    </TodoProvider>
  );
}

export default App;
