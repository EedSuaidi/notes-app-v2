import React from "react";
import SubmitButton from "./SubmitButton";
import PropTypes from "prop-types";

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
    };

    this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
    this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onTitleChangeHandler(event) {
    this.setState(() => {
      return {
        title: event.target.value,
      };
    });
  }

  onBodyChangeHandler(event) {
    this.setState(() => {
      return {
        body: event.target.innerHTML,
      };
    });
  }

  onSubmitHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);
  }

  render() {
    return (
      <form onSubmit={this.onSubmitHandler}>
        <div className="add-new-page__input">
          <input
            className="add-new-page__input__title"
            placeholder="Catatan rahasia"
            value={this.state.title}
            onChange={this.onTitleChangeHandler}
            required
          />
          <div
            className="add-new-page__input__body"
            contentEditable="true"
            data-placeholder="Sebenarnya saya adalah ...."
            onInput={this.onBodyChangeHandler}
          ></div>
        </div>
        <SubmitButton />
      </form>
    );
  }
}

NoteInput.propType = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
