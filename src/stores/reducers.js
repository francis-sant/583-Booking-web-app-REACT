const initialState = {
  bookedClasses: [],
  error: null,
};

export const bookedClassesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BOOKED_CLASSES_SUCCESS':
      return { ...state, bookedClasses: action.payload, error: null };
    case 'FETCH_BOOKED_CLASSES_FAILURE':
      return { ...state, error: action.payload };
    case 'UPDATE_BOOKED_CLASS':
      // Update the booked class by finding and replacing it in the array
      const updatedClasses = state.bookedClasses.map((student) => {
        if (student._id === action.payload._id) {
          return action.payload;
        }
        return student;
      });
      return { ...state, bookedClasses: updatedClasses };
    default:
      return state;
  }
};