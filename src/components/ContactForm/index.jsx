import React, { Component } from "react";
import propTypes from "prop-types";
import { error, Stack } from "@pnotify/core";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/core/dist/Material.css";
import "./contactFormStyles.scss";

const defaultStack = new Stack({
  dir1: "top",
  dir2: "right",
  firstpos1: 25,
  firstpos2: 25,
  spacing1: 30,
  spacing2: 30,
  push: "buttom",
  context: document.body,
});

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
    const prevValue = this.props.contacts.find(
      (contact) => contact.name === this.state.name
    );
    if (!prevValue) {
      this.props.contactToAdd({ ...this.state });
      this.handleClearState();
      return;
    }
    error({
      text: `${this.state.name} is already in contacts`,
      type: "error",
      styling: "brighttheme",
      icons: "brighttheme",
      animateSpeed: "normal",
      hide: true,
      delay: 3000,
      stack: defaultStack,
    });
    this.handleClearState();
  };

  render() {
    const { name, number } = this.state;
    return (
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
    );
  }
}
