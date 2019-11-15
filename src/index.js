import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import * as Redux from "redux";
import * as ReactRedux from "react-redux";

import { shuffle, sample } from "underscore";
import AuthorQuiz from "./AuthorQuiz";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import AddAuthorForm from "./AddAuthorForm";

const authors = [
  {
    name: "Mark Twain",
    imageUrl: "images/authors/marktwain.jpg",
    imageSrc: "Wikimedia Commons",
    books: [
      "The Adventures of Huckleberry Finn",
      "Life on the Mississippi",
      "Roughing It"
    ]
  },
  {
    name: "Joseph Conrad",
    imageUrl: "images/authors/josephconrad.png",
    imageSrc: "Wikimedia Commons",
    books: ["Heart of Darkness"]
  },
  {
    name: "J.K. Rowling",
    imageUrl: "images/authors/jkrowling.jpg",
    imageSrc: "Wikimedia Commons",
    books: ["Harry Potter and the Sorcerers Stone"]
  },
  {
    name: "Stephen King",
    imageUrl: "images/authors/stephenking.png",
    imageSrc: "Wikimedia Commons",
    books: ["The Shining", "IT"]
  },
  {
    name: "Chales Dickens",
    imageUrl: "images/authors/charlesdickens.jpeg",
    imageSrc: "Wikimedia Commons",
    books: ["David Copperfield", "A Tale of Two Cities"]
  },
  {
    name: "William Shakespeare",
    imageUrl: "images/authors/williamshakespeare.jpg",
    imageSrc: "Wikimedia Commons",
    books: ["Hamlet", "Macbeth", "Romeo and Juliet"]
  }
];

const getTurnData = authors => {
  // reduce all books from all authors to a single array
  const allBooks = authors.reduce(function(p, c, i) {
    return p.concat(c.books);
  }, []);

  // utilise "underscore" shuffle() to randomise the books, then take the first 4
  const fourRandomBooks = shuffle(allBooks).slice(0, 4);

  // utilise "underscore" sample() to pick a random item from the selected 4
  const answer = sample(fourRandomBooks);

  // identify the parent author based on the chosen answer (yes, this relies on name being unique)
  const author = authors.find(author =>
    author.books.some(title => title === answer)
  );

  return {
    author,
    books: fourRandomBooks
  };
};

const initialState = {
  authors,
  turnData: getTurnData(authors),
  highlight: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ANSWER_SELECTED":
      const isCorrect = state.turnData.author.books.some(
        book => book === action.answer
      );
      return Object.assign({}, state, {
        highlight: isCorrect ? "correct" : "wrong"
      });

    case "CONTINUE":
      return Object.assign({}, state, {
        turnData: getTurnData(state.authors),
        highlight: ""
      });

    case "ADD_AUTHOR":
      return Object.assign({}, state, {
        authors: state.authors.concat([action.author])
      });

    default:
      return state;
  }
};

let store = Redux.createStore(reducer);

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <BrowserRouter>
      <Route exact path="/" component={AuthorQuiz} />
      <Route path="/add" component={AddAuthorForm} />
    </BrowserRouter>
  </ReactRedux.Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
