import React from "react";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-15";
import { configure, shallow } from "enzyme";

import { Players } from "./../Players";

describe("Player Component", () => {
  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  it("renders correctly when not passing players", () => {
    const tree = renderer.create(<Players store={{}} players={[]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly when passing players in", () => {
    const tree = renderer
      .create(<Players players={[{ name: "John" }, { name: "William" }]} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Calls addPlayer when enter is pressed", () => {
    const mockAddPlayer = jest.fn();
    const wrapper = shallow(
      <Players
        addPlayer={mockAddPlayer}
        players={[{ name: "John" }, { name: "William" }]}
      />
    );
    wrapper.instance().handleInput({ keyCode: 13, target: { value: "John" } });
    expect(mockAddPlayer.mock.calls.length).toBe(1);
  });

  it("Doesn't call addPlayer when enter is not pressed", () => {
    const mockAddPlayer = jest.fn();
    const wrapper = shallow(
      <Players
        addPlayer={mockAddPlayer}
        players={[{ name: "John" }, { name: "William" }]}
      />
    );
    wrapper.instance().handleInput({ keyCode: 12, target: { value: "John" } });
    expect(mockAddPlayer.mock.calls.length).toBe(0);
  });
});
