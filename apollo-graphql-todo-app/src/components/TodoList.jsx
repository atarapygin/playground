import { VStack } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { useMutation, useQuery } from "@apollo/client";

import { ALL_TODOS, UPDATE_TODO, DELETE_TODO } from "../graphql/todos";

import TodoItem from "./TodoItem";
import TotalCount from "./TotalCount";

const TodoList = () => {
  const { loading, error, data } = useQuery(ALL_TODOS);
  const [toggleTodo, { error: updateError }] = useMutation(UPDATE_TODO);
  const [removeTodo, { error: removeError }] = useMutation(DELETE_TODO, {
    update(cache, { data: { removeTodo } }) {
      cache.modify({
        fields: {
          allTodos(currentTodos = []) {
            return currentTodos.filter(
              (todo) => todo.__ref !== `Todo:${removeTodo.id}`
            );
          },
        },
      });
    },
  });

  if (loading) {
    return <Spinner />;
  }

  if (error || updateError || removeError) {
    return <p>Error...</p>;
  }

  const { todos } = data;

  return (
    <VStack>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
          onDelete={removeTodo}
        />
      ))}
      <TotalCount />
    </VStack>
  );
};

export default TodoList;
