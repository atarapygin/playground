import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hook";

import { addNewTodo, fetchTodos } from "./store/todoSlice";

import NewTodoForm from "./components/NewTodoForm";
import TodoList from "./components/TodoList";

import "./App.css";
import React from "react";

function App() {
  const [text, setText] = useState("");
  const { loading, error } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  const handleAction = () => {
    if (text.trim().length) {
      dispatch(addNewTodo(text));
      setText("");
    }
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="App">
      {loading && <h2>Loading...</h2>}
      <NewTodoForm
        value={text}
        updateText={setText}
        handleAction={handleAction}
      />
      {error ? <h2>An error occured: {error}</h2> : null}
      <TodoList />
    </div>
  );
}

export default App;
