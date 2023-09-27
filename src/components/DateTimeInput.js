import React from 'react';

function DateTimeInput({ dateTime, onDateChange, onStartTimeChange, onEndTimeChange, onRemove, addDateTime }) {


    return (
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={dateTime.date}
            onChange={onDateChange}
            required
          />
          <label>Start Time:</label>
          <input
            type="time"
            value={dateTime.startTime}
            onChange={onStartTimeChange}
            required
          />
          <label>End Time:</label>
          <input
            type="time"
            value={dateTime.endTime}
            onChange={onEndTimeChange}
            required
          />
          <button type="button" onClick={onRemove}>Remove</button>
          <button type="button" onClick={addDateTime}>Add Date and Time</button>
          
        </div>
      );
    }

export default DateTimeInput;