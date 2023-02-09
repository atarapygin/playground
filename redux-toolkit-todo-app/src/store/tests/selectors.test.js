import { selectTodos } from "../selectors";

describe("selectTodos", () => {
  it("should select todos from state", () => {
    const todos = { list: [{ id: 123, title: "Redux", completed: false }] };

    const result = selectTodos({ todos });

    expect(result).toEqual(todos.list);
  });
});
