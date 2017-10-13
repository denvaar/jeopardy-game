import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-15";

import Question from "./../Question";

const mockProps = { question: { question: "Is this the real life?" } };

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

describe("Question Component", () => {
  it("renders correctly", () => {
    const component = shallow(<Question {...mockProps} />);
    expect(component).toMatchSnapshot();
  });
  it("has class 'question'", () => {
    const component = shallow(<Question {...mockProps} />);
    expect(component.first("div").hasClass("question")).toBeTruthy();
  });
  it("displays question prop", () => {
    const component = shallow(<Question {...mockProps} />);
    expect(component.text()).toBe("Is this the real life?");
  });
});
