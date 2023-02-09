import { fetchTodos } from "../todoSlice";

global.fetch = jest.fn();

import { mockedTodo } from "../../store/tests/todoSlice.test";

describe("todoThunk", () => {
  it("should fetch todos with resolved response", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockedTodo),
    });

    const dispatch = jest.fn();
    const thunk = fetchTodos();

    await thunk(dispatch);

    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(fetchTodos.pending().type);
    expect(end[0].type).toBe(fetchTodos.fulfilled().type);
    expect(end[0].payload).toBe(mockedTodo);
  });

  it("should fetch todos with rejected response", async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    const dispatch = jest.fn();
    const thunk = fetchTodos();

    await thunk(dispatch);

    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(fetchTodos.pending().type);
    expect(end[0].type).toBe(fetchTodos.rejected().type);
    expect(end[0].meta.rejectedWithValue).toBe(true);
    expect(end[0].payload).toBe("Server Error!");
  });
});
