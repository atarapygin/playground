import { RootState } from ".";
import { Todo } from "./todoSlice";

export const selectTodos = (state: RootState): Todo[] => state.todos.list
