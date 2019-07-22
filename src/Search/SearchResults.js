import React from 'react';
import Book from '../List/Book';

//map books
//define the updatedBooks;
//map searchBooks and callback myBooks with book;
//map myBooks with b;
//if b id = book their shelf is euqal;
//return book;
//shelf show none using judge syntax;
const SearchResults = props => {
  const { searchBooks, myBooks, onMove } = props;
  const updatedBooks = searchBooks.map(book => {
    myBooks.map(b => {
      if (b.id === book.id) {
        b.shelf = book.shelf;
      }

      return b;
    });
    return book;
  });

  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {updatedBooks.map(book => (
          <Book
            key={book.id}
            onMove={onMove}
            book={book}
            shelf={book.shelf ? book.shelf : 'none'}
          />
        ))}
      </ol>
    </div>
  );
};

export default SearchResults;
