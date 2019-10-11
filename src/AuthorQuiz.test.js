import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { mount, shallow, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AuthorQuiz from "./AuthorQuiz";

Enzyme.configure({ adapter: new Adapter() });

const dummyState = {
  turnData: {
    books: [
      "The Shining",
      "IT",
      "David Copperfield",
      "A Tale of Two Cities",
      "Hamlet"
    ],
    author: {
      name: "Chales Dickens",
      imageUrl: "images/authors/charlesdickens.jpeg",
      imageSrc: "Wikimedia Commons",
      books: ["David Copperfield", "A Tale of Two Cities"]
    }
  },
  highlight: "none"
};

describe("Author Quiz", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <AuthorQuiz {...dummyState} onAnswerSelected={() => {}} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("When no answer selected", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<AuthorQuiz {...dummyState} onAnswerSelected={() => {}} />);
  });

  it("should have no background color", () => {
    expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe("");
  });
});

describe("When the wrong answer has been selected", () => {
  let wrapper;
  const testState = Object.assign({}, dummyState, { highlight: "wrong" });

  beforeAll(() => {
    wrapper = mount(<AuthorQuiz {...testState} onAnswerSelected={() => {}} />);
  });

  it("should have a red background color", () => {
    expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe(
      "red"
    );
  });
});

describe("When the correct answer has been selected", () => {
  let wrapper;
  const testState = Object.assign({}, dummyState, { highlight: "correct" });

  beforeAll(() => {
    wrapper = mount(<AuthorQuiz {...testState} onAnswerSelected={() => {}} />);
  });

  it("should have a green background color", () => {
    expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe(
      "green"
    );
  });
});

describe("When the first answer is selected", () => {
  let wrapper;
  const answerSelectedHandler = jest.fn();

  beforeAll(() => {
    // attach mock event handler
    wrapper = mount(
      <AuthorQuiz {...dummyState} onAnswerSelected={answerSelectedHandler} />
    );

    // simulate answer click for first book title
    wrapper
      .find(".answer")
      .first()
      .simulate("click");
  });

  it("should trigger onAnswerSelected event", () => {
    expect(answerSelectedHandler).toHaveBeenCalled();
  });

  it("should receive the first book title", () => {
    expect(answerSelectedHandler).toHaveBeenCalledWith("The Shining");
  });
});
