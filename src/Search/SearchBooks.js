import React, { Component } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

//  pass the books to <SearchResults/>
class SearchBooks extends Component {
  render() {
    const {
      searchBooks,
      myBooks,
      onSearch,
      onResetSearch,
      onMove,
    } = this.props;
    return (
      <div className="search-books">
        <SearchBar onSearch={onSearch} onResetSearch={onResetSearch} />
        <SearchResults
          myBooks={myBooks}
          searchBooks={searchBooks}
          onMove={onMove}
        />
      </div>
    );
  }
}

export default SearchBooks;
