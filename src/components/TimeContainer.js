import React, { useMemo } from 'react';
import '../styles/TimeContainer.css';

const isTimeInRange = (time, startTime, duration) => {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [checkHour, checkMinute] = time.split(":").map(Number);

  const startTimeMinutes = startHour * 60 + startMinute;
  const endTimeMinutes = startTimeMinutes + duration;
  const checkTimeMinutes = checkHour * 60 + checkMinute;

  return (
    checkTimeMinutes >= startTimeMinutes && checkTimeMinutes < endTimeMinutes
  );
};




const TimeContainer = ({ 
  label,
  selectedTime, 
  onTimeClick, 
  selectedClass, 
  selectedDate, 
  bookedClasses, 
  classTimes 
}) => {
  // Calculate available time slots for the selected class and date
  const availableTimeSlots = useMemo(() => {


    const timeIsBooked = (time, selectedClass, selectedDate) => {

      // Check if a specific time slot is already booked
      
        const selectedClassName = selectedClass;
        const selectedDateValue = selectedDate;
    
        for (const bookedClass of bookedClasses) {
          let startTime = bookedClass.selectedTime;
          let duration = bookedClass.duration;
    
          // Check if the booked class matches the selected class and date
          if (
            bookedClass.className === selectedClassName &&
            bookedClass.selectedDate === selectedDateValue &&
            isTimeInRange(time, startTime, duration)
          ) {
            return true;
          }
        }
    
        return false;
      
    }


    if (!selectedClass || !selectedDate) {
      return ["Select a Date and Class First"];
    } else {
      const selectedDateValue = selectedDate;
      const dateTimes = classTimes;
      let selectedDateTime = null;

      for (let i = 0; i < dateTimes.length; i++) {
        if (dateTimes[i].date === selectedDateValue) {
          selectedDateTime = dateTimes[i];
          let startTime = selectedDateTime.startTime;
          let endTime = selectedDateTime.endTime;
          const startHour = parseInt(startTime);
          const endHour = parseInt(endTime);
          const availableHours = [];

          for (let hour = startHour; hour <= endHour; hour++) {
            let availableMinute = 0;

            if (hour === endHour && startHour < 60) {
              availableMinute = 0;
            }

            availableHours.push(
              `${hour}:${availableMinute.toString().padStart(2, "0")}`
            );
          }

          const filteredAvailableHours = availableHours.filter(
            (time) => !timeIsBooked(time, selectedClass, selectedDate)
          );

          
          if (filteredAvailableHours.length === 1) {
            return [filteredAvailableHours[0]];
          }

          return filteredAvailableHours;
        }
      }

      if (selectedDateTime) {
        return [selectedDateTime.startTime, selectedDateTime.endTime];
      } else {
        return ["No Available Times for Selected Date"];
      }
    }

    
  

  },  [selectedClass, selectedDate, classTimes, bookedClasses]);


 

  return (
    <div className="time-container">
      <label>{label}</label>
      <div className="time-options">
       
        {Array.isArray(availableTimeSlots) ? (
          availableTimeSlots.map((time, index) => (
            <div
              key={index}
              onClick={() => onTimeClick(time)}
              className={time === selectedTime ? "active-time" : ""}
            >
              {time}
            </div>
          ))
        ) : (
          <div
            onClick={() => onTimeClick(availableTimeSlots)}
            className={
              availableTimeSlots === selectedTime ? "disabled-time" : ""
            }
          >
            {availableTimeSlots}
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeContainer;
