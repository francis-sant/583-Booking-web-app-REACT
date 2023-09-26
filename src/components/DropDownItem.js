import React from 'react';
import '../styles/DropDownItem.css';

const DropdownItem = ({ label, id, value, onChange, options }) => (
  <div className="dropdown-item">
    <label htmlFor={id}>{label}</label>
    <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default DropdownItem;
