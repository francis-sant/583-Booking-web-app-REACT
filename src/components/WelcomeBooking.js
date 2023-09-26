import React from "react";
import { useDispatch } from "react-redux"; 
import { useNavigate } from "react-router-dom";
import { setRole, authenticate } from "../stores/authenRedux"; 
import "../styles/WelcomeBooking.css";

const WelcomeBooking = ({ msg }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  

  const authenticateAndNavigate = (role) => {
    
    dispatch(setRole(role));
    dispatch(authenticate());

    if (role === "instructor") {
      navigate("/instructor/booking");
    } else if (role === "student") {
      navigate("/student/booking");
    }
  };

  return (
    <div className="home">
      <div className="homedesign">
      <h1>{msg}</h1>      
        <div className="homeauthentic">
          <button onClick={() => authenticateAndNavigate('instructor')}>
            I'm an Instructor
          </button>
          <button onClick={() => authenticateAndNavigate('student')}>
            I'm a Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBooking;
