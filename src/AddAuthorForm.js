import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./AddAuthorForm.css";

const AddAuthorForm = ({ match, onAddAuthor }) => {
  const [formState, setFormState] = useState({
    name: "",
    imageUrl: "",
    bookTemp: "",
    books: []
  });

  const onFieldChange = event => {
    const newFormState = Object.assign({}, formState, {
      [event.target.name]: event.target.value
    });
    setFormState(newFormState);
  };

  const onAddBook = () => {
    const newFormState = Object.assign({}, formState, {
      books: formState.books.concat(formState.bookTemp),
      bookTemp: ""
    });
    setFormState(newFormState);
  };

  const onFormSubmit = event => {
    event.preventDefault();
    onAddAuthor(formState);
  };

  return (
    <div className="add-author-form">
      <h1>Add Author</h1>
      <form onSubmit={onFormSubmit}>
        <div className="form-input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={onFieldChange}
          />
        </div>
        <div className="form-input">
          <label htmlFor="imageUrl">Image Url</label>
          <input
            type="text"
            name="imageUrl"
            value={formState.imageUrl}
            onChange={onFieldChange}
          />
        </div>
        <div className="form-input">
          <label htmlFor="bookTemp">Books</label>
          {formState.books.map(book => (
            <p key={book}>{book}</p>
          ))}
          <input
            type="text"
            name="bookTemp"
            value={formState.bookTemp}
            onChange={onFieldChange}
          />
          <input type="button" value="+" onClick={onAddBook} />
        </div>
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddAuthor: author => {
      dispatch({ type: "ADD_AUTHOR", author });
      props.history.push("/");
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddAuthorForm)
);
