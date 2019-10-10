import React from "react";
import "./bootstrap.min.css";
import "./AuthorQuiz.css";

const Hero = () => {
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Author Quiz</h1>
        <p>Select the book written by the author shown.</p>
      </div>
    </div>
  );
};

const Turn = ({ author, books }) => {
  return (
    <div className="row turn" style={{ backgroundColor: "white" }}>
      <div className="col-4 offset-1">
        <img src={author.imageUrl} className="author-image" alt="Author" />
      </div>
      <div className="col-6">
        {books.map(title => (
          <Book key={title} title={title} />
        ))}
      </div>
    </div>
  );
};

const Book = ({ title }) => {
  return (
    <div className="answer">
      <h4>{title}</h4>
    </div>
  );
};

const Continue = () => {
  return <div />;
};

const Footer = () => {
  return (
    <div id="footer" className="row">
      <div className="col-12">
        <p className="text-muted credit">
          All images are from{" "}
          <a
            href="http://commons.wikimedia.org/wiki/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Wikimedia Commons
          </a>{" "}
          and are in the public domain.
        </p>
      </div>
    </div>
  );
};

const AuthorQuiz = ({ turnData }) => {
  return (
    <div className="container-fluid">
      <Hero />
      <Turn {...turnData} />
      <Continue />
      <Footer />
    </div>
  );
};

export default AuthorQuiz;
