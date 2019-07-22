import React, { Component } from 'react';

// state - controllers - Dom modes;
// set state value for
// handleChange input changes the target value in state;
// handleSubmit pass the onSearch into the form;

class SearchBooksInput extends Component {
  state = {
    value: '',
  };

  // remove the handleSubmit and <form>;
  // define val targeted to value;
  // setState the val and callback onSearch on val;
  handleChange = event => {
    const val = event.target.value;
    this.setState({ value: val }, () => {
      this.props.onSearch(val);
    });
  };

  // handleSubmit = e =>{
  //   e.preventDefault()
  //   this.props.onSearch(this.state.value)
  // }

  render() {
    return (
      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title or author"
          onChange={this.handleChange}
          value={this.state.value}
        />
        {this.state.value}
      </div>
    );
  }
}

export default SearchBooksInput;
