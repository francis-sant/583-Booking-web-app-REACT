import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditFormBookedClass from './StudentReschedule';
import { fetchBookedClasses, updateBookedClass } from '../stores/actions';
import { addRescheduledClass } from '../stores/instructorStore';
import { removeBookedClassById } from '../stores/instructorStore';
import '../styles/StudentBookedClass.css';


function MyBookings() {
  const dispatch = useDispatch();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const bookedClasses = useSelector((state) => state.bookedClasses.bookedClasses);
  const rescheduledClasses = useSelector((state) => state.instructor.rescheduledClasses);
  const [validationMessage, setValidationMessage] = useState('');
  // console.log(bookedClasses);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   
    dispatch(fetchBookedClasses())
      .then(() => {
        setIsLoading(false); // Data has been fetched, no longer loading
      
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Data fetching failed, still no longer loading
      });
  }, [dispatch]);

  const editBooking = (bookingDetails) => {
    setSelectedStudent(bookingDetails);
  };

  const cancelEdit = () => {
    setSelectedStudent(null);
  };

  const deleteStudentClass = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:3000/instructor/students/${studentId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        dispatch(removeBookedClassById(studentId));
        setValidationMessage((prevMessages) => ({
          ...prevMessages,
          [studentId]: "Class deleted successfully, please upload the page!",
        }));

        console.log('Student deleted successfully');
      } else {
        console.error('Error deleting student:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  

  const updateStudentClass = async (updatedStudent) => {
    try {
      const { _id, ...updatedStudentDataWithoutId } = updatedStudent;

      const response = await fetch(
        `http://localhost:3000/student/rescheduled/${_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedStudentDataWithoutId),
        }
      );

      if (response.ok) {
       
        dispatch(addRescheduledClass(updatedStudent)); 
        dispatch(updateBookedClass(updatedStudent));
        console.log(rescheduledClasses);
        setSelectedStudent(null);
      } else {
        console.error('Error updating student:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className='mybookings'>
    <h2>My Bookings</h2>
    <div className="studentsinfo">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        bookedClasses.length > 0 ? (
          bookedClasses.map((student) => (
            <div key={student._id} className="studentdetails">
              <h3>My Class</h3>
              <p>First Name: {student.firstName}</p>
              <p>Email: {student.email}</p>
              <p>Class Name: {student.className}</p>
              <p>Selected Date: {student.selectedDate}</p>
              <p>Selected Time: {student.selectedTime}</p>

              <button onClick={() => editBooking(student)}>Reschedule My Class</button>

              {validationMessage[student._id] && (
                  <div className="validation-message">{validationMessage[student._id]}</div>
                )}


              {selectedStudent === student && (
                <EditFormBookedClass
                  bookedClasses={bookedClasses}
                  student={student}
                  onSave={updateStudentClass}
                  onCancel={cancelEdit}
                  onDelete={deleteStudentClass}
                />
              )}
            </div>
          ))
        ) : (
          <p>No classes booked yet.</p>
        )
      )}
    </div>
  </div>
  );
}

export default MyBookings;
