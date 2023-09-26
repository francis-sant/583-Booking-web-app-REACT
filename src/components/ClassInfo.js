import React from 'react';
import '../styles/ClassInfo.css';

function ClassInfo({ classtoDisplay }) {
    if (!classtoDisplay) {
      return null; 
    }
  
    return (
      <div className="classInfo">
        <p>Instructor: {classtoDisplay.instructor}</p>
        <p>Type: {classtoDisplay.type}</p>
        <p>Modality: {classtoDisplay.modality}</p>
        <p>Duration: {classtoDisplay.duration} minutes</p>
        <p>Price: $ {classtoDisplay.price}</p>
      </div>
    );
  }
  
  export default ClassInfo;
  