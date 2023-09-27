import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBookedClass } from '../stores/instructorStore'; 
import InstructorInput from './InstructorInput';
import DateTimeInput from './DateTimeInput';

function TeacherForm() {
  const dispatch = useDispatch(); 
  const [instructor, setInstructor] = useState('');
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [modality, setModality] = useState('');
  const [dateTimes, setDateTimes] = useState([{ date: '', startTime: '', endTime: '' }]);
  const [duration, setDuration] = useState('');
  const [breaks, setBreaks] = useState('');
  const [price, setPrice] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [failMessage, setFailMessage] = useState('');

  const handleDateChange = (index, value) => {
    const newDateTimes = [...dateTimes];
    newDateTimes[index].date = value;
    setDateTimes(newDateTimes);
  };

  const handleStartTimeChange = (index, value) => {
    const newDateTimes = [...dateTimes];
    newDateTimes[index].startTime = value;
    setDateTimes(newDateTimes);
  };

  const handleEndTimeChange = (index, value) => {
    const newDateTimes = [...dateTimes];
    newDateTimes[index].endTime = value;
    setDateTimes(newDateTimes);
  };

  const removeDateTime = (index) => {
    const newDateTimes = [...dateTimes];
    newDateTimes.splice(index, 1);
    setDateTimes(newDateTimes);
  };

  const addDateTime = () => {
    setDateTimes([...dateTimes, { date: '', startTime: '', endTime: '' }]);
  };

  const submitSchedule = async (e) => {
    e.preventDefault();
    const schedule = {
      instructor,
      type,
      name,
      modality,
      price,
      duration,
      dateTimes,
      breaks,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/instructor/booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(schedule),
        }
      );

      if (response.ok) {
        const data = await response.json();
        dispatch(addBookedClass(data));
        setSuccessMessage("Service Added Successfully!");
       
        clearForm();
      } else {
        const errorMessage = `Your Request Failed! ${response.status} ${response.statusText}`;
        setFailMessage(errorMessage);
        console.error(errorMessage);
      }
    } catch (error) {
      const errorMessage = `Your Request Failed! ${error.message}`;
      setFailMessage(errorMessage);
      console.error(errorMessage);
    }
  };

  const clearForm = () => {
    setInstructor("");
    setType("");
    setName("");
    setModality("");
    setDateTimes([{ date: '', startTime: '', endTime: '' }]);
    setDuration("");
    setBreaks("");
    setPrice("");
  };

  return (
    <div className="App">
      <form className="insertForm" onSubmit={submitSchedule}>
        <InstructorInput value={instructor} onChange={(e) => setInstructor(e.target.value)} />

        <label htmlFor="type">Type of Class:</label>
        <input type="text" value={type} onChange={(e) => setType(e.target.value)} id="type" required />

        <label htmlFor="name">Service Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" required />

        <label htmlFor="modality">Modality: Online, Class</label>
        <input type="text" value={modality} onChange={(e) => setModality(e.target.value)} id="modality" required />

        <fieldset>
          <legend>Date and Time Selection</legend>
          {dateTimes.map((dateTime, index) => (
            <DateTimeInput
              key={index}
              dateTime={dateTime}
              onDateChange={(e) => handleDateChange(index, e.target.value)}
              onStartTimeChange={(e) => handleStartTimeChange(index, e.target.value)}
              onEndTimeChange={(e) => handleEndTimeChange(index, e.target.value)}
              onRemove={() => removeDateTime(index)}
              addDateTime={addDateTime} 
            />
          ))}
        </fieldset>

        <label htmlFor="duration">Duration - in minutes</label>
        <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} id="duration" required />

        <label htmlFor="breaks">Breaks - in minutes</label>
        <input type="number" value={breaks} onChange={(e) => setBreaks(e.target.value)} id="breaks" required />

        <label htmlFor="price">Price</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} id="price" required />

        <button type="submit">Add My Service</button>
      </form>

      {successMessage ? (
        <div className="successMessage">{successMessage}</div>
      ) : (
        <div>{failMessage}</div>
      )}
    </div>
  );
}

export default TeacherForm;

