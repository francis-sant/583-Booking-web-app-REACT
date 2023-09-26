// store.js

import { configureStore } from '@reduxjs/toolkit'
import { bookedClassesReducer } from './reducers';
import instructorReducer from './instructorStore';
import authReducer from './authenRedux';

const store = configureStore({
  reducer: {
    bookedClasses: bookedClassesReducer,
    instructor: instructorReducer,
    auth: authReducer, 
  },
});


export default store;
