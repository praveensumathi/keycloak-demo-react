import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import BookForm from "./BookForm";
import BookList from "./BookList";
import * as bookActions from "../modules/books";
import UserService from "../services/UserService";

class BookBox extends React.Component {
  constructor(props) {
    super(props);
    props.allBooks();
  }

  render() {
    const {books, deleteBook, addBook} = this.props;
    return (
      <div className="bookBox row">
        <h1>
          Welcome {UserService.getUsername()}&nbsp;
          <button className="btn btn-success" onClick={UserService.doLogout}>Logout</button>
        </h1>
        <h1>Best Books ever!</h1>
        <hr/>
        <BookList books={books} onBookDelete={deleteBook}/>
        <BookForm onBookSubmit={addBook}/>
      </div>
    );
  }
}

BookBox.defaultProps = {
  books: [],
};

const mapStateToProps = state => ({
  books: state.books,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...bookActions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BookBox)
