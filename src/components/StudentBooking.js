import React from 'react';
import StudentFormsField from './StudentFormsField';
import '../styles/StudentBooking.css';



function StudentBooking() {

  return (
    <div className="bookingclass">
      <h2>My Classes</h2>
      <div className="myclasses">
        <StudentFormsField />
        
      </div>

     
    </div>
  );
}

export default StudentBooking;
