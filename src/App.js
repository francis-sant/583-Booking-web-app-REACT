import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/NavBar';
import InstructorDashboard from './components/InstructorDashboard';
import StudentBooking from './components/StudentBooking';
import WelcomeBooking from './components/WelcomeBooking';
import StudentBookedClass from './components/StudentBookedClass';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInstructorClasses } from './stores/actions';

const App = () => {
  const dispatch = useDispatch();
  const instructorClasses = useSelector((state) => state.instructor.availableClasses);

  useEffect(() => {
    dispatch(fetchInstructorClasses());
  }, [dispatch]);

  useEffect(() => {
    console.log('instructorClasses', instructorClasses);
  }, [instructorClasses]);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.role);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                userRole === 'instructor' ? (
                  <Navigate to="/instructor/booking" />
                ) : (
                  <Navigate to="/student/booking" />
                )
              ) : (
                <WelcomeBooking msg="Welcome to your Booking App" />
              )
            }
          />
          <Route
            path="/instructor/booking"
            element={userRole === 'instructor' ? <InstructorDashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/instructor/students"
            element={userRole === 'instructor' ? <StudentBookedClass /> : <Navigate to="/" />}
          />
          <Route
            path="/student/booking"
            element={userRole === 'student' ? <StudentBooking /> : <Navigate to="/" />}
          />
          <Route
            path="/student/reschedule"
            element={userRole === 'student' ? <StudentBookedClass /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
