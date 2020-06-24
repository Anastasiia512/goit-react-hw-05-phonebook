import React, { Component } from "react";
import propTypes from "prop-types";
import ContactForm from "../ContactForm/index";
import Filter from "../Filter/index";
import ContactList from "../ContactList/index";
import { v4 } from "uuid";
import css from "./appStyles.module.css";
import { CSSTransition } from "react-transition-group";
import appTransitions from "../../transitions/appTransition.module.css";

const filterContacts = (contacts, filter) => {
  return contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
};

export default class App extends Component {
  static defaultProps = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
  };

  static propTypes = {
    contacts: propTypes.arrayOf(
      propTypes.shape({
        id: propTypes.string.isRequired,
        name: propTypes.string.isRequired,
        number: propTypes.string.isRequired,
      })
    ),
  };

  state = {
    contacts: [],
    filter: "",
    isOpen: false,
  };

  componentDidMount() {
    if (!this.state.contacts.length) {
      const contacts = JSON.parse(localStorage.getItem("contacts"));
      if (contacts) {
        this.setState({ contacts, isOpen: true });
      }
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  toAddContact = (state) => {
    const contactToAdd = {
      ...state,
      id: v4(),
    };
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, contactToAdd],
    }));
  };

  changeFilter = ({ target: { value } }) => {
    this.setState({ filter: value });
  };

  handleDeleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter, isOpen } = this.state;
    const filteredContacts = filterContacts(contacts, filter);
    return (
      <>
        <CSSTransition
          in={isOpen}
          classNames={appTransitions}
          timeout={300}
          unmountOnExit
        >
          <h1 className={css.title}>Phonebook</h1>
        </CSSTransition>
        <ContactForm contacts={contacts} contactToAdd={this.toAddContact} />

       { !!contacts.length && <Filter
          filterValue={filter}
          contactList={contacts}
          onChangeFilter={this.changeFilter}
        />}

        {contacts.length > 0 && (
          <ContactList
            onHandleDeleteContact={this.handleDeleteContact}
            FilteredContacts={filteredContacts}
          />
        )}
      </>
    );
  }
}
