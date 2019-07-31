import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { debounce } from 'throttle-debounce';
import ListBooks from './List/ListBooks';
import SearchBooks from './Search/SearchBooks';
// import getAll from './data';

// bookshelves = ['Currently Reading', 'Want to Read', 'Have Read'];
const bookshelves = [
  { key: 'currentlyReading', name: 'Currently Reading' },
  { key: 'wantToRead', name: 'Want to Read' },
  { key: 'read', name: 'Have Read' },
];

class BooksApp extends Component {
  /* cSpell:disable */
  state = {
    myBooks: [],
    searchBooks: [],
  };

  // mount the books from API;
  // user books api to get all and then call ant setState the books
  componentDidMount = () => {
    BooksAPI.getAll()
      .then(books => {
        this.setState({ myBooks: books });
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: true });
      });
  };

  // func moveBook will receive the bookId and shelf from select-option;
  // updateBooks is a returned value;
  // use map to find the id of boos = bookId;
  // the book's shelf = shelf
  // use setState to update the books;
  // user API update to logsee the books;
  // shift the BookId to book
  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).catch(err => {
      console.log(err);
      this.setState({ error: true });
    });
    if (shelf === 'none') {
      this.setState(prevState => ({
        myBooks: prevState.myBooks.filter(b => b.id !== book.id),
      }));
    } else {
      book.shelf = shelf;
      this.setState(prevState => ({
        myBooks: prevState.myBooks.filter(b => b.id !== book.id).concat(book),
      }));
    }
  };

  // debounce for searchForBooks;
  // if query length > 0, search booksAPI and call setstate for searchBooks;
  // if there is error, searchbook is empty, else it is books;
  searchForBooks = debounce(300, false, query => {
    console.log(query);
    if (query.length > 0) {
      BooksAPI.search(query).then(books => {
        if (books.error) {
          this.setState({ searchBooks: [] });
        } else {
          this.setState({ searchBooks: books });
        }
      });
    } else {
      this.setState({ searchBooks: [] });
    }
  });

  // resetSearch function, set searchbooks to be empty;
  resetSearch = () => {
    this.setState({ searchBooks: [] });
  };

  // class BookshelfChanger, set a state and let the value = shelf;
  // f() handleChange has arg evet;
  // set the state value using target;
  // call f() onMove with the arg bookId and the state value;
  // put the props value and state value to <select>;
  render() {
    const { myBooks, searchBooks, error } = this.state;
    if (error) {
      return <div>There is error in networl</div>;
    }
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              books={myBooks}
              bookshelves={bookshelves}
              onMove={this.moveBook}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              searchBooks={searchBooks}
              myBooks={myBooks}
              onSearch={this.searchForBooks}
              onMove={this.moveBook}
              onResetSearch={this.resetSearch}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
