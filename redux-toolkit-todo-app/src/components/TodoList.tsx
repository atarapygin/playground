import React from 'react';
import { useAppSelector } from "../hook";
import { selectTodos } from '../store/selectors';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const todos = useAppSelector(selectTodos);

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo}/>
      ))}
    </ul>
  );
};

export default TodoList;
