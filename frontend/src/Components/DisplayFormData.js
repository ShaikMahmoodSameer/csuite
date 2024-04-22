import React from "react";

const DisplayFormData = ({ checkOutFormData }) => {
  const { name, email, company, designation, purpose } = checkOutFormData.memberDetails;

  return (
    <div className="inputData text-start">
      {
        [
          { label: "Name", val: name },
          { label: "Email", val: email },
          { label: "Company", val: company },
          { label: "Designation", val: designation },
          { label: "Purpose", val: purpose }
        ].map((item, idx) => (
          <div key={idx} className="d-flex">
            <p className="small fw-medium" style={{color: "black", width: "120px"}}> {item.label} </p>
            <p> : </p> 
            <p className="small ps-2" style={{color: "#adadad"}}> {item.val} </p>
          </div>
        ))
      }
    </div>
  );
};

export default DisplayFormData;
