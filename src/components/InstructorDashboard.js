import React from "react";
import InstructorForm from "./InstructorForm";
import InstructorServicesDisplay from "./InstructorServicesDisplay";
import "../styles/InstructorDashboard.css";

const InstructorDashboard = () => {
    return (
        <div>
        <h1> My Services Dashboard</h1>
            <InstructorForm />
      
            <InstructorServicesDisplay />
        </div>
    );
};

export default InstructorDashboard;