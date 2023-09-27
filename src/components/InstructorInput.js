import React from 'react';

function InstructorInput({ value, onChange }) {
  return (
    <label htmlFor="teacher">Instructor Name:
      <input
        type="text"
        value={value}
        onChange={onChange}
        required
        id="teacher"
      />
    </label>
  );
}

export default InstructorInput;