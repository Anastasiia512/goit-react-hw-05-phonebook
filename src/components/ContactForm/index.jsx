import React, { Component } from "react";
import propTypes from "prop-types";
import ContactNotice from "../ContactNotice/ContactNotice.jsx";
import { CSSTransition } from "react-transition-group";
import contactNoticeTransition from "../../transitions/contactNoticeTransition.module.css";
import "./contactFormStyles.scss";

export default class ContactForm extends Component {
  state = {
    name: "",
    number: "",
    isWarning: false,
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
      (contact) => contact.number === this.state.number
    );
    if (prevValue) {
      this.setState({ isWarning: true });
      setTimeout(() => this.setState({ isWarning: false }), 2000);
      this.handleClearState();
      return;
    }
    this.props.contactToAdd({ ...this.state });
    this.handleClearState();
  };

  render() {
    const { name, number, isWarning } = this.state;

    return (
      <>
        {isWarning && (
          <CSSTransition
            in={isWarning}
            classNames={contactNoticeTransition}
            timeout={500}
            unmountOnExit
          >
            <ContactNotice isWarning={isWarning} />
          </CSSTransition>
        )}
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
