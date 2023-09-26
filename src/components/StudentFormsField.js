import React, { useState, useEffect } from 'react';
import DropdownItem from './DropDownItem';
import TimeContainer from './TimeContainer';
import { fetchInstructorClasses, fetchBookedClasses } from '../stores/actions';
import { useSelector, useDispatch } from 'react-redux';
import ClassInfo from './ClassInfo';
import PersonalInfo from './StudentPersonalInfo';
import BookingConfirmation from './BookingConfirmation';



function StudentFormsField() {
  const dispatch = useDispatch();

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedClassDataTIME, setClassDataTIME] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [availableDates, setAvailableDates] = useState(['Select a Date']);
  const [validationMessage, setValidationMessage] = useState('');
  const [classtoDisplay, setClasstoDisplay] = useState([]);
  const [rescheduled] = useState(false); 
  const [bookingConfirmed, setBookingConfirmed] = useState(false); 
  const [bookingDetails, setBookingDetails] = useState({}); 

  // userSelector to get the instructorClasses and bookedClasses from the Redux store
  const instructorClasses = useSelector((state) => state.instructor.availableClasses);
  const bookedClasses = useSelector((state) => state.bookedClasses.bookedClasses);
  const selectedClassData = instructorClasses.find((cls) => cls.name === selectedClass);

  useEffect(() => {
    dispatch(fetchInstructorClasses());
    dispatch(fetchBookedClasses());
  }, [dispatch]);



  const sendBooking = async (studentInfo) => {
    
    if (selectedClassData) {
      const classDetails = {
        className: selectedClassData.name,
        classType: selectedClassData.type,
        duration: selectedClassData.duration,
        selectedDate: selectedDate,
        selectedTime: selectedTime,
        instructor: selectedClassData.instructor,
        isRescheduled: rescheduled,
      };
  
     
      const combinedBookingDetails = {
        ...studentInfo,
        ...classDetails,
      };
  
    
      try {
        const response = await fetch(
          'http://localhost:3000/student/booking',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(combinedBookingDetails),
          }
        );
  
        if (response.ok) {
          setBookingDetails(combinedBookingDetails); 
          setBookingConfirmed(true);
          validationMessage("Booking request successful");
          resetFields();
          console.log('Booking request successful');
          
        } else {
          console.error('Booking request failed:', response.statusText);
         
        }
      } catch (error) {
        console.error('Booking request error:', error);
       
      }
    }
  };
  

  useEffect(() => {
    // When selectedClass changes, filter the instructorClasses to get the selected class data  

    if (selectedClassData) {
      // Update availableDates and availableTimes based on the selected class data
      const classDates = selectedClassData.dateTimes.map((dt) => dt.date);
      // const classTimes = selectedClassData.dateTimes.map((dt) => dt.startTime && dt.endTime);

      setClassDataTIME(selectedClassData.dateTimes);
      setAvailableDates(classDates);
      setClasstoDisplay(selectedClassData);
      
    } else {
      // If selectedClassData is not found or selectedClass is empty, reset availableDates
      setAvailableDates([]);
    }
  
  }, [selectedClass, instructorClasses, selectedClassData]);

  const availableClasses = instructorClasses.map((cls) => cls.name);
  
  const classDropdownOptions = ['Select a Class', ...availableClasses];
  const dateDropdownOptions = ['Select a Date', ...availableDates];

  const handleDropdownChange = (type, value) => {
    // Handle dropdown change
    if (type === 'class') {
      setSelectedClass(value);
      setSelectedDate('');
      setSelectedTime('');
    } else if (type === 'date') {
      setSelectedDate(value);
      setSelectedTime('');
    } else if (type === 'time') {
      setSelectedTime(value);
    }

    // Check booking availability
    const bookingAvailability = checkBookingAvailability(
      selectedClass,
      selectedDate,
      selectedTime
    );

    if (bookingAvailability.isAlreadyBooked) {
      setValidationMessage(bookingAvailability.validationMessage);
    } else {
      setValidationMessage('testing');
    }
  };

  function checkBookingAvailability(selectedClass, selectedDate, selectedTime) {
    const selectedClassName = selectedClass;
    const selectedDateValue = selectedDate;
    const selectedTimeValue = selectedTime;

    const selectedClassData = instructorClasses.find((cls) => cls.name === selectedClassName);
    if (!selectedClassData || selectedClassName === 'Select a Class') {
      return {
        isAlreadyBooked: false,       
      };
    }

    const selectedDateTime = selectedClassData.dateTimes.find((dt) => dt.date === selectedDateValue);
    if (!selectedDateTime ) {
      return {
        isAlreadyBooked: false,
        validationMessage: 'testing',
        
      };
    }

    const startTime = selectedDateTime.startTime;
    const endTime = selectedDateTime.endTime;

    for (const item of bookedClasses) {
      if (
        item.className === selectedClassName &&
        item.selectedDate === selectedDateValue &&
        item.selectedTime === selectedTimeValue &&
        selectedTimeValue >= startTime &&
        selectedTimeValue < endTime
      ) {
        return {
          isAlreadyBooked: true,
         
        };
      }
    }

    return {
      isAlreadyBooked: false,
      validationMessage: 'testing',
    };
  }

  const handleTimeClick = (time) => {
       setSelectedTime(time);
  };

  const resetFields = () => {
    setSelectedClass(''); 
    setSelectedDate('');
    setSelectedTime('');
    setValidationMessage('');
  };


  

  return (
    <div className="dropdown">
      <DropdownItem
        label="Choose a Class:"
        id="class"
        value={selectedClass}
        onChange={(value) => handleDropdownChange('class', value)}
        options={classDropdownOptions} 
      />

      <DropdownItem
        label="Choose a Date:"
        id="date"
        value={selectedDate}
        onChange={(value) => handleDropdownChange('date', value)}
        options={dateDropdownOptions} 
      />

      <TimeContainer
        label="Available Time:"
        selectedTime={selectedTime}
        onTimeClick={handleTimeClick}
        selectedClass={selectedClass}
        selectedDate={selectedDate}
        bookedClasses={bookedClasses}
        classTimes={selectedClassDataTIME}
      />

      <div className="validation-message">{validationMessage}</div>

      <button onClick={resetFields}>Reset</button>

      {selectedClass ? <ClassInfo classtoDisplay={classtoDisplay}/> : null }

      <PersonalInfo onBookingConfirmed={sendBooking} />

      {bookingConfirmed && <BookingConfirmation bookingDetails={bookingDetails} />}
      
    </div>
  );
}

export default StudentFormsField;
