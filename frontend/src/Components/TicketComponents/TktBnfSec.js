import React, { useEffect } from "react";
import BASE_URL from "../../config/apiConfig";
import axios from "axios";

export default function TktBnfSec({ tktInfo, beneficiary, setBeneficiary }) {
  useEffect(() => {
    const fetchTktBnfDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/ticket/bnf-details/${tktInfo.bnf_id}`
        );
        if (response && response.data.length > 0) {
          const data = response.data[0];
          setBeneficiary({
            name: data.bnf_name,
            email: data.email,
            tel: data.mobile_number,
            company: data.company,
            designation: data.designation,
            // purpose: data.purpose
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTktBnfDetails();
  }, [tktInfo, setBeneficiary]);

  const renderBeneficiaryDetails = () => {
    return Object.entries(beneficiary).map(([key, value]) => (
      <p key={key} className="d-flex align-items-start small mb-0">
        <span className="w-33 fw-medium">
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </span>
        <span className="tdTitles me-3"> : </span>
        <span> {value} </span>
      </p>
    ));
  };

  return (
    <div className="rbd mt-3 pb-3 brdrBtmDtd">
      {renderBeneficiaryDetails()}
    </div>
  );
}
