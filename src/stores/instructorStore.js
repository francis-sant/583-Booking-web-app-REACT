// instructorStore.js

import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  availableClasses: [],
  rescheduledClasses: [],
  bookedClasses: [],
};

// Create a slice for the instructor store
const instructorSlice = createSlice({
  name: 'instructor',
  initialState,
  reducers: {
    setAvClasses: (state, action) => {
      state.availableClasses = action.payload;
    },
    setRescheduled: (state, action) => {
      state.rescheduledClasses = action.payload;
    },
    addBookedClass: (state, action) => {
      state.bookedClasses.push(action.payload);
    },
    addRescheduledClass: (state, action) => {
      state.rescheduledClasses.push(action.payload);
    },
  },
});

// Export actions
export const { setAvClasses, setRescheduled, addBookedClass, updateClass, addRescheduledClass } = instructorSlice.actions;
// Export the reducer
export default instructorSlice.reducer;
