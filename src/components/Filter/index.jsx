import React from "react";
import propTypes from "prop-types";
import './filterStyles.scss';

const Filter = ({ filterValue, onChangeFilter }) => (
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
);

Filter.propTypes = {
  filterValue: propTypes.string.isRequired,
  onChangeFilter: propTypes.func.isRequired,
};

export default Filter;
