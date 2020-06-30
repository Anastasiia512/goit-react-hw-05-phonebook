import React, { Component } from "react";
import propTypes from "prop-types";
import "./contactFormStyles.scss";

export default class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  static propTypes = {
    contactToAdd: propTypes.func.isRequired,
  };

  handleChange = ({ target: { value, name } }) =>
    this.setState({
      [name]: value,
    });

  handleClearState = () => {
    this.setState({
      name: "",
      number: "",
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.contactToAdd({ ...this.state });
    this.handleClearState();
  };

  render() {
    const { name, number } = this.state;

    return (
      <>
        
        <form className="contactForm" onSubmit={this.handleSubmit}>
          <div className="contactInputHolder">
            <label>Name</label>
            <input
              className="contactFormInput"
              type="text"
              required
              name="name"
              id="name"
              value={name}
              onChange={this.handleChange}
            />
          </div>
          <div className="contactInputHolder">
            <label>Number</label>
            <input
              className="contactFormInput"
              type="number"
              name="number"
              id="number"
              required
              value={number}
              onChange={this.handleChange}
            />
          </div>
          <div className="contactFormButtonHolder">
            <button className="contactFormButton" type="submit">
              Add contact
            </button>
          </div>
        </form>
      </>
    );
  }
}
