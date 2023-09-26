import React, { useState } from 'react';
import '../styles/StudentReschedule.css';

function EditFormBookedClass(props) {
  const { student, onSave, onCancel } = props;
  const [editableStudent, setEditableStudent] = useState({ ...student });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editableStudent);
  };

  const cancelEdit = () => {
    onCancel();
  };

  return (
    <div className="editform">
      <h3>Edit Class Information</h3>
      <form onSubmit={handleSubmit}>
        <input
          data-testid="firstName"
          value={editableStudent.firstName}
          onChange={(e) =>
            setEditableStudent({
              ...editableStudent,
              firstName: e.target.value,
            })
          }
        />
        <input
          data-testid="email"
          value={editableStudent.email}
          onChange={(e) =>
            setEditableStudent({
              ...editableStudent,
              email: e.target.value,
            })
          }
        />

        <input
          data-testid="selectedTime"
          value={editableStudent.selectedTime}
          onChange={(e) =>
            setEditableStudent({
              ...editableStudent,
              selectedTime: e.target.value,
            })
          }
        />

        <input
          data-testid="selectedDate"
          value={editableStudent.selectedDate}
          onChange={(e) =>
            setEditableStudent({
              ...editableStudent,
              selectedDate: e.target.value,
            })
          }
          type="date"
        />

        <button type="submit">Save</button>
        <button data-testid="cancelbtn" type="button" onClick={cancelEdit}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditFormBookedClass;
