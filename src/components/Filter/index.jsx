import React from "react";
import propTypes from "prop-types";
import {CSSTransition} from 'react-transition-group';
import filterTransition from '../../transitions/filterTransition.module.css';
import './filterStyles.scss';

const Filter = ({ filterValue, onChangeFilter, contactList }) => (
  <CSSTransition
  in={contactList.length >= 2}
  timeout={250}
  unmountOnExit
  classNames={filterTransition}
>
 <div className= 'contactsFilter'>
 <div className='contactsFilterBox'>
 <label className='contactsFilterLabel'>
    Find contacts by name
    </label>
    <input 
    className='contactsFilterInput'
      type="text"
      name="name"
      id='text'
      value={filterValue}
      onChange={onChangeFilter}
    />
    </div>
  </div>
  </CSSTransition>
);

Filter.propTypes = {
  filterValue: propTypes.string.isRequired,
  onChangeFilter: propTypes.func.isRequired,
};

export default Filter;
