import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-15";

import QuestionCell from "./../QuestionCell";

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

describe("QuestionCell Component", () => {
  it("renders correctly when isAnswered is false", () => {
    const component = shallow(<QuestionCell />);
    expect(component).toMatchSnapshot();
  });
  it("renders empty td when isAnswered is true", () => {
    const component = shallow(<QuestionCell isAnswered />);
    expect(component).toMatchSnapshot();
  });

  it("calls openQuestion on click", () => {
    const mockOpenQuestion = jest.fn();
    const component = shallow(<QuestionCell openQuestion={mockOpenQuestion} />);

    component.find("td").simulate("click");
    expect(mockOpenQuestion).toHaveBeenCalled();
  });

  it("renders value prop", () => {
    const expectedValue = "What is ReactJS?";
    const component = shallow(<QuestionCell value={expectedValue} />);

    //Dollar sign is prepended to value string because it is a dollar amount
    expect(component.text()).toBe(`$${expectedValue}`);
  });
});
