import React from 'react';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux
import '../styles/InstructorServicesDisplay.css';


const InstructorServicesDisplay = () => {
  // Use useSelector to access the availableClasses data from the Redux store
  const availableClasses = useSelector((state) => state.instructor.availableClasses);

  return (
    <div className='avaiServices'>
      <h2>My Available Services</h2>
     
    <div className="myclassesdisplay">
      
      {availableClasses.map((item, index) => (
        <div key={index} className="classesDisplay">
          <div className="schedule">
            <h3>Instructor: {item.instructor}</h3>
            <p>Type of Class: {item.type}</p>
            <p>Name of the Type of Class: {item.name}</p>
            <p>Modality: {item.modality}</p>
            <p>Duration: {item.duration} minutes</p>

            <p>Date and Time:</p>
            <ul>
              {item.dateTimes.map((day, index) => (
                <li key={index}>
                  {day.date} - {day.startTime} até {day.endTime}
                </li>
              ))}
            </ul>

            <p>Price: $ {item.price}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default InstructorServicesDisplay;
