import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
  const userRole = useSelector((state) => state.auth.role);

  return (
    <nav className="navhome">
      <a href="/">Home</a>

      {userRole === 'student' && ( 
        <>
          <Link to="/student/booking">Book my Class</Link>
          <Link to="/student/reschedule">My Booked Classes</Link>
        </>
      )}

      {userRole === 'instructor' && (
        <>
          <Link to="/instructor/booking">Schedule my Services</Link>
          <Link to="/instructor/students">Students Booked</Link>
        </>
      )}

    </nav>
  );
};

export default Navbar;
