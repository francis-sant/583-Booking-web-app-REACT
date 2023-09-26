// import React, { createContext, useContext, useState, useEffect } from 'react';

// const ClassesContext = createContext();

// export function useClasses() {
//   return useContext(ClassesContext);
// }

// export function ClassesProvider({ children }) {
//   const [availableClasses, setAvailableClasses] = useState([]);
//   const [bookedClasses, setBookedClasses] = useState([]);

//   useEffect(() => {
//     // Fetch and set available and booked classes here
//     async function fetchData() {
//       try {
//         const response = await fetch(
//           'http://localhost:3000/'
//         );
//         if (response.ok) {
//           const data = await response.json();
//           setAvailableClasses(data.availableClasses);
//           setBookedClasses(data.bookedClasses);
//         } else {
//           console.error('Failed to fetch classes:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error while fetching classes:', error);
//       }
//     }

//     fetchData();
//   }, []);

//   return (
//     <ClassesContext.Provider value={{ availableClasses, bookedClasses }}>
//       {children}
//     </ClassesContext.Provider>
//   );
// }
