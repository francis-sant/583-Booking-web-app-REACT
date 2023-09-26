// import React, { createContext, useContext, useState } from 'react';

// const ClassesContext = createContext();

// export function useClasses() {
//   return useContext(ClassesContext);
// }

// export function ClassesProvider({ children }) {
//   const [storeState, setStoreState] = useState({
//     availableClasses: [],
//     rescheduledClasses: [],
//     bookedClasses: [],
//   });

//   const setAvClasses = (classes) => {
//     setStoreState({ ...storeState, availableClasses: classes });
//   };

//   const setRescheduled = (rescheduledClasses) => {
//     setStoreState({ ...storeState, rescheduledClasses });
//   };

//   const addBookedClass = (bookedClass) => {
//     setStoreState({ ...storeState, bookedClasses: [...storeState.bookedClasses, bookedClass] });
//   };

//   return (
//     <ClassesContext.Provider value={{ ...storeState, setAvClasses, setRescheduled, addBookedClass }}>
//       {children}
//     </ClassesContext.Provider>
//   );
// }
