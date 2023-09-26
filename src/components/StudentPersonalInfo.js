import React, { useState } from 'react';
import '../styles/StudentPersonalInfo.css';

function PersonalInfo({ onBookingConfirmed }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const isFormEmpty = !firstName || !lastName || !phone || !email;

  const confirmBooking = () => {
    if (!isFormEmpty) {
      // Create an object with personal information
      const studentInfo = {
        firstName,
        lastName,
        phone,
        email,
      };
      
      
      onBookingConfirmed(studentInfo);
    }
  };

  return (

    <div className="personalinfo">
      <h2>My Contact Information</h2>
      <div className="personalForm">
        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          value={firstName}
          onChange={(student) => setFirstName(student.target.value)}
          required
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          value={lastName}
          onChange={(student) => setLastName(student.target.value)}
          required
        />

        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          type="number"
          value={phone}
          onChange={(student) => setPhone(student.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type='email'
          value={email}
          onChange={(student) => setEmail(student.target.value)}
          required
        />
      </div>
      <button onClick={confirmBooking} disabled={isFormEmpty}>
          Confirm Booking
        </button>
    </div>
  );
}

export default PersonalInfo;


