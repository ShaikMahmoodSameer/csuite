// RegistrationForm.js
import React from "react";
import DisplayFormData from "./DisplayFormData"; // Import your DisplayFormData component

const RegisteredComp = ({ checkOutFormData }) => {
  return (
    <div>
      <DisplayFormData checkOutFormData={checkOutFormData} />
    </div>
  );
};

export default RegisteredComp;
