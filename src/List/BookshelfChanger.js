import React, { Component } from 'react';

// set a state and assign the shelf to the value;
// f(), handleChange with an arg setstates the target value;
// jsx select has the value and onChange;
class BookshelfChanger extends Component {
  state = {
    value: this.props.shelf,
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
    this.props.onMove(this.props.book, event.target.value);
  };

  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default BookshelfChanger;
