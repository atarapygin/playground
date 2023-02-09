import todoReducer, { initialStates, fetchTodos } from "../todoSlice";

import { mockedTodo } from "./todoSlice.test";

describe("todoSlice", () => {
  it("should change status with fetchTodos.pending action", () => {
    const state = todoReducer(initialStates, fetchTodos.pending());

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it("should change status with fetchTodos.fulfilled action", () => {
    const state = todoReducer(initialStates, fetchTodos.fulfilled(mockedTodo));

    expect(state).toEqual({
      list: mockedTodo,
      loading: false,
      error: null,
    });
  });

  it("should change status with fetchTodos.rejected action", () => {
    const state = todoReducer(initialStates, fetchTodos.rejected());

    expect(state).toEqual({
      list: [],
      loading: false,
      error: undefined,
    });
  });
});
