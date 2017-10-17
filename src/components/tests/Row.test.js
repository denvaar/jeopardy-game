import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-15";

import { Row } from "./../Row";
import { QuestionCell } from "./../QuestionCell";

describe("Row Component", () => {
  const mockCategories = {
    "0": [
      {
        value: 200,
        category: "a",
        question: "a1",
        answer: "a1a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      },
      {
        value: 400,
        category: "a",
        question: "a2",
        answer: "a2a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      },
      {
        value: 600,
        category: "a",
        question: "a3",
        answer: "a3a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      },
      {
        value: 800,
        category: "a",
        question: "a4",
        answer: "a4a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      },
      {
        value: 1000,
        category: "a",
        question: "a5",
        answer: "a5a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      }
    ],
    "1": [
      {
        value: 200,
        category: "b",
        question: "b1",
        answer: "b1a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      },
      {
        value: 400,
        category: "b",
        question: "b1",
        answer: "b1a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      },
      {
        value: 600,
        category: "b",
        question: "b1",
        answer: "b1a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      },
      {
        value: 800,
        category: "b",
        question: "b1",
        answer: "b1a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      },
      {
        value: 1000,
        category: "b",
        question: "b1",
        answer: "b1a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      }
    ],
    "2": [
      {
        value: 200,
        category: "c",
        question: "b1",
        answer: "b1a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      },
      {
        value: 400,
        category: "c",
        question: "b1",
        answer: "b1a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      },
      {
        value: 600,
        category: "c",
        question: "b1",
        answer: "b1a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      },
      {
        value: 800,
        category: "c",
        question: "b1",
        answer: "b1a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      },
      {
        value: 1000,
        category: "c",
        question: "b1",
        answer: "b1a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      }
    ],
    "3": [
      {
        value: 200,
        category: "d",
        question: "b1",
        answer: "b1a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      },
      {
        value: 400,
        category: "d",
        question: "b1",
        answer: "b1a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      },
      {
        value: 600,
        category: "d",
        question: "b1",
        answer: "b1a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      },
      {
        value: 800,
        category: "d",
        question: "b1",
        answer: "b1a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      },
      {
        value: 1000,
        category: "d",
        question: "b1",
        answer: "b1a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      }
    ],
    "4": [
      {
        value: 200,
        category: "e",
        question: "b1",
        answer: "b1a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      },
      {
        value: 400,
        category: "e",
        question: "b1",
        answer: "b1a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      },
      {
        value: 600,
        category: "e",
        question: "b1",
        answer: "b1a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      },
      {
        value: 800,
        category: "e",
        question: "b1",
        answer: "b1a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      },
      {
        value: 1000,
        category: "e",
        question: "b1",
        answer: "b1a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      }
    ],
    "5": [
      {
        value: 200,
        category: "f",
        question: "b1",
        answer: "b1a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      },
      {
        value: 400,
        category: "f",
        question: "b1",
        answer: "b1a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      },
      {
        value: 600,
        category: "f",
        question: "b1",
        answer: "b1a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      },
      {
        value: 800,
        category: "f",
        question: "b1",
        answer: "b1a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      },
      {
        value: 1000,
        category: "f",
        question: "b1",
        answer: "b1a",
        youtubeLink: "",
        imageLink: "",
        isAnswered: false
      }
    ]
  };

  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  it("renders correctly", () => {
    const component = shallow(<Row value={200} categories={mockCategories} />);
    expect(component).toMatchSnapshot();
  });

  it("renders 6 question rows", () => {
    const component = shallow(<Row value={200} categories={mockCategories} />);
    expect(component.find("tr").children()).toHaveLength(6);
  });
});
