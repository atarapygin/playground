import { Button } from "@chakra-ui/react";
import { useTodos } from "../store";

const FetchTodos = () => {
  const { loading, error, fetchTodos } = useTodos((state) => ({
    loading: state.loading,
    error: state.error,
    fetchTodos: state.fetchTodos,
  }));

  return (
    <Button isLoading={loading} onClick={fetchTodos}>
      {!error ? "Fetch todos" : { error }}
    </Button>
  );
};

export { FetchTodos };
