import React, { useState } from "react";
import { styled } from "styled-components";
import Step1 from "../Components/Step1";
import Step2 from "../Components/Step2";
import Step3 from "../Components/Step3";
import Step4 from "../Components/Step4";

const StepComponentContainer = ({
  userId,
  setUserId,
  checkOutFormData,
  setCheckOutFormData,
  ticketId,
  setTicketId,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  // const nextStep = () => {
  //   setCurrentStep((prevStep) => Math.min(prevStep + 1, components.length - 1));
  // };

  // const prevStep = () => {
  //   setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  // };

  const components = [
    <Step1
      userId={userId}
      setUserId={setUserId}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      checkOutFormData={checkOutFormData}
      setCheckOutFormData={setCheckOutFormData}
    />,
    <Step2
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      checkOutFormData={checkOutFormData}
      setCheckOutFormData={setCheckOutFormData}
    />,
    <Step3
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      checkOutFormData={checkOutFormData}
      setCheckOutFormData={setCheckOutFormData}
      ticketId={ticketId}
      setTicketId={setTicketId}
    />,
    <Step4 ticketId={ticketId} setTicketId={setTicketId} />,
  ];

  return (
    <Wrapper>
      <div className="progressBar">
        <div className="stepsProgressBarWrpr d-flex align-items-center">
          <div
            style={{ width: `${(currentStep + 1) * 25}%` }}
            className={`stepsProgressBar`}
          ></div>
        </div>

        {/* Steps Container Below */}
        <div className="py-4 px-3"> {components[currentStep]} </div>

        {/* <div className="d-flex-cc gap-5 btnsWrapper">
          <button className="prev" onClick={prevStep} disabled={currentStep === 0} >
            Prev
          </button>
          <button
            className="next"
            onClick={nextStep}
            disabled={currentStep === components.length - 1}
          >
            Next
          </button>
        </div> */}
      </div>
    </Wrapper>
  );
};

export default StepComponentContainer;

const Wrapper = styled.div`
  .progressBar {
    height: 100%;
    background-color: transparent;
  }
  .stepsProgressBarWrpr {
    transition: 0.5s;
    height: 15px;
    width: 100%;
    .stepsProgressBar {
      height: 7px;
      background: linear-gradient(
        225deg,
        /* rgb(247, 4, 234), */ rgb(255, 154, 10),
        rgba(248, 100, 10),
        rgba(178, 29, 247)
      );
      border-radius: 8px;
      transition: 0.5s;
    }
  }
  .prev, .next {
    border: none;
    font-size: 14px;
    padding: 0;
    margin: 0;
    background-color: transparent;
    &:active {
      border-bottom: 2px solid;
    }
    &:focus {
      border-bottom: 2px solid;
    }
  }
  .stepHeading{
    text-align: left;
    padding-bottom: 20px;
    margin-bottom: 25px;
    font-size: 26px;
    font-weight: medium;
    border-bottom: 2px dotted #adadad;
  }
`;
