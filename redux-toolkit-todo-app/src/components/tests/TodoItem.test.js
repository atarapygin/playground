import { render, screen, fireEvent } from "@testing-library/react";
import * as reduxHooks from "react-redux";

import { mockedTodo } from "../../store/tests/todoSlice.test";

import TodoItem from "../TodoItem";

jest.mock("react-redux");
const mockedUseDispatch = jest.spyOn(reduxHooks, "useDispatch");

describe("<TodoItem />", () => {
  it("renders without crashing", () => {
    mockedUseDispatch.mockReturnValue(jest.fn());

    const wrapper = render(<TodoItem {...mockedTodo} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("should dispatch actions", () => {
    const dispatch = jest.fn();
    mockedUseDispatch.mockReturnValue(dispatch);

    render(<TodoItem {...mockedTodo} />);

    fireEvent.click(screen.getByRole("checkbox"));

    expect(dispatch).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button"));

    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
