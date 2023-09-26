import React from 'react';

function BookingConfirmation({ bookingDetails }) {
  return (
    <div className="classbooked">
      <h2>Class Booked Sucessfully</h2>
      <p>
        Student Name: {bookingDetails.firstName} {bookingDetails.lastName}
      </p>
      <p>Class Name: {bookingDetails.className}</p>
      <p>Class Type: {bookingDetails.classType}</p>
      <p>Duration: {bookingDetails.duration} minutes</p>
      <p>Date: {bookingDetails.selectedDate}</p>
      <p>Time: {bookingDetails.selectedTime}</p>
    </div>
  );
}

export default BookingConfirmation;
