// actions.js
import { setAvClasses } from './instructorStore'; // Import the setAvClasses action


export const updateBookedClass = (updatedStudent) => {
  return { type: 'UPDATE_BOOKED_CLASS', payload: updatedStudent };
};


export const fetchBookedClasses = () => {
    return async (dispatch) => {
      try {
        const response = await fetch('http://localhost:3000/student/booking');
        if (response.ok) {
          const bookedClass = await response.json();
          dispatch({ type: 'FETCH_BOOKED_CLASSES_SUCCESS', payload: bookedClass });
          // console.log("studentBooked", bookedClass);
        } else {
          dispatch({ type: 'FETCH_BOOKED_CLASSES_FAILURE', payload: response.statusText });
        }
      } catch (error) {
        dispatch({ type: 'FETCH_BOOKED_CLASSES_FAILURE', payload: error.message });
      }
    };
  };
  



  export const fetchInstructorClasses = () => {
    return async (dispatch) => {
      try {
        const response = await fetch('http://localhost:3000/');
        if (response.ok) {
          const instructorClasses = await response.json();
  
          // Dispatch the setAvClasses action to save the fetched instructor classes
          dispatch(setAvClasses(instructorClasses));
        } else {
          dispatch({ type: 'FETCH_INSTRUCTOR_CLASSES_FAILURE', payload: response.statusText });
        }
      } catch (error) {
        dispatch({ type: 'FETCH_INSTRUCTOR_CLASSES_FAILURE', payload: error.message });
      }
    };
  };