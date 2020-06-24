import React from "react";
import propTypes from "prop-types";
import "./contactListStyles.scss";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import appTransitions from "../../transitions/appTransition.module.css";

const ContactList = ({ onHandleDeleteContact, FilteredContacts }) => (
  <TransitionGroup component="ul" className="contactList">
    {FilteredContacts.map((contact) => (
      <CSSTransition
        key={contact.id}
        classNames={appTransitions}
        timeout={300}
        unmountOnExit
      >
        <li className="contactListItem">
          <p className="contactListField">{contact.name}</p>
          <p className="contactListField">{contact.number}</p>
          <button
            onClick={() => onHandleDeleteContact(contact.id)}
            type="button"
            className="material-icons"
          >
            clear
          </button>
        </li>
      </CSSTransition>
    ))}
  </TransitionGroup>
);

ContactList.propTypes = {
  onHandleDeleteContact: propTypes.func.isRequired,
  onFilteredContacts: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
      number: propTypes.string.isRequired,
    })
  ).isRequired,
};

export default ContactList;
