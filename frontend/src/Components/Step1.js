import React from "react";
import { styled } from "styled-components";
import MobileNumberOTPForm from "./MobileNumberOTPForm";

export default function Step1({
  userId,
  setUserId,
  currentStep,
  setCurrentStep,
  checkOutFormData,
  setCheckOutFormData,
}) {
  return (
    <Wrapper>
      <h2 className="stepHeading"> Enter Mobile Number </h2>

      <div className="step1">
        <MobileNumberOTPForm
          userId={userId}
          setUserId={setUserId}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          checkOutFormData={checkOutFormData}
          setCheckOutFormData={setCheckOutFormData}
        />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  @media screen and (max-width: 600px) {
    .step1 {
      /* border: 2px solid; */
      padding: 10px 0;
      margin: 0;
    }
  }
`;
