import React from "react";
import { styled } from "styled-components";
import RegistrationFrom from "./RegistrationFrom";

export default function step2({
  currentStep,
  setCurrentStep,
  checkOutFormData,
  setCheckOutFormData,
}) {
  return (
    <Wrapper>
      <h2 className="stepHeading">Your Details</h2>

      <RegistrationFrom
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        checkOutFormData={checkOutFormData}
        setCheckOutFormData={setCheckOutFormData}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  form {
    text-align: start;
    label {
      font-size: 14px;
    }
    h3 {
      font-size: 18px;
    }
    .selectField {
      background-color: #ffffff80;
      border: 1px solid #00000040;
    }
    button {
      background-color: var(--clr3);
      &:hover {
        background-color: var(--clr2);
      }
    }
  }
`;
