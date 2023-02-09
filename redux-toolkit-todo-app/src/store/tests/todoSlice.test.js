import todoReducer, {
  initialStates,
  addTodo,
  toggleComplete,
  removeTodo,
} from "../todoSlice";

export const mockedTodo = { id: "1", title: "New todo", completed: false };

describe("todoReducer", () => {
  it("should return default state when passed an empty action", () => {
    const result = todoReducer(undefined, { type: "" });

    expect(result).toEqual(initialStates);
  });

  it("should add new todo item with 'addTodo' action", () => {
    const action = {
      type: addTodo.type,
      payload: mockedTodo,
    };

    const result = todoReducer(initialStates, action);

    expect(result.list[0].title).toBe("New todo");
    expect(result.list[0].completed).toBe(false);
  });

  it("should toggle todo completed status with 'toggleComplete' action", () => {
    const action = {
      type: toggleComplete.type,
      payload: "1",
    };

    const result = todoReducer({ list: [mockedTodo] }, action);

    expect(result.list[0].completed).toBe(true);
  });

  it("should remove todo by id with 'removeTodo' action", () => {
    const action = {
      type: removeTodo.type,
      payload: "1",
    };

    const result = todoReducer({ list: [mockedTodo] }, action);

    expect(result.list).toEqual([]);
  });
});
