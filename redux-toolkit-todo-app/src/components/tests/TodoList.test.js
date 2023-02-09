import { render } from "@testing-library/react";
import * as reduxHooks from "react-redux";

import { mockedTodo } from "../../store/tests/todoSlice.test";

import TodoList from "../TodoList";

jest.mock("react-redux");
const mockedUseSelector = jest.spyOn(reduxHooks, "useSelector");

describe("<TodoList />", () => {
  it("renders without crashing", () => {
    mockedUseSelector.mockReturnValue([]);

    const wrapper = render(<TodoList />);

    expect(wrapper).toMatchSnapshot();
  });

  it("renders with items", () => {
    mockedUseSelector.mockReturnValue([mockedTodo]);

    const wrapper = render(<TodoList />);

    expect(wrapper).toMatchSnapshot();
  });
});
