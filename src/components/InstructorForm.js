import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBookedClass } from '../stores/instructorStore'; 




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
        <label htmlFor="teacher">Instructor Name:</label>
        <input type="text" value={instructor} onChange={(e) => setInstructor(e.target.value)} required id="teacher" />

        <label htmlFor="type">Type of Class:</label>
        <input type="text" value={type} onChange={(e) => setType(e.target.value)} id="type" required />

        <label htmlFor="type">Service Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="type">Modality: Online, Class</label>
        <input type="text" value={modality} onChange={(e) => setModality(e.target.value)} required />

        <fieldset>
          <legend>Date and Time Selection</legend>
          {dateTimes.map((dateTime, index) => (
            <div key={index}>
              <label>Date:</label>
              <input
                type="date"
                value={dateTime.date}
                onChange={(e) => handleDateChange(index, e.target.value)}
                required
              />
              <label>Start Time:</label>
              <input
                type="time"
                value={dateTime.startTime}
                onChange={(e) => handleStartTimeChange(index, e.target.value)}
                required
              />
              <label>End Time:</label>
              <input
                type="time"
                value={dateTime.endTime}
                onChange={(e) => handleEndTimeChange(index, e.target.value)}
                required
              />
              <button type="button" onClick={() => removeDateTime(index)}>Remove</button>
              <button type="button" onClick={addDateTime}>Add Date and Time</button>
            </div>
          ))}
        </fieldset>

        <label htmlFor="type">Duration - in minutes</label>
        <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required />

        <label htmlFor="type">Breaks - in minutes</label>
        <input type="number" value={breaks} onChange={(e) => setBreaks(e.target.value)} required />

        <label htmlFor="price">Price</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

        <button type="submit">Add My Service</button>

        {successMessage ? (
          <div className="successMessage">{successMessage}</div>
        ) : (
          <div>{failMessage}</div>
        )}
      </form>
    </div>
  );
}

export default TeacherForm;
