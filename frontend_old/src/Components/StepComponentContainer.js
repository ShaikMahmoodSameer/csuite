import React, { useState } from 'react';
import { styled } from "styled-components";
import Step1 from '../Components/Step1';
import Step2 from '../Components/Step2';
import Step3 from '../Components/Step3';
import Step4 from '../Components/Step4';


const StepComponentContainer = ({ userId, setUserId, checkOutFormData, setCheckOutFormData, ticketId, setTicketId }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const nextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, components.length - 1));
  };
  
  const prevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };
  
  // useEffect(() => { console.log(currentStep); }, [currentStep]);

  const components = [
    <Step1
      userId={userId} 
      setUserId={setUserId}
      currentStep = { currentStep }
      setCurrentStep = { setCurrentStep }
      checkOutFormData={checkOutFormData} 
      setCheckOutFormData={setCheckOutFormData}
      />, 
    <Step2 
      currentStep = { currentStep }
      setCurrentStep = { setCurrentStep }
      checkOutFormData={checkOutFormData} 
      setCheckOutFormData={setCheckOutFormData}
      />, 
    <Step3 
      currentStep = { currentStep }
      setCurrentStep = { setCurrentStep }
      checkOutFormData={checkOutFormData} 
      setCheckOutFormData={setCheckOutFormData}
      ticketId={ticketId}
      setTicketId={setTicketId}
      />, 
      <Step4 
        ticketId={ticketId}
        setTicketId={setTicketId}
        />
      ];

  return (
    <Wrapper>
      <div className="w-100 stepsProgressBarWrpr bg-light d-flex align-items-center">
          <div style={{width: `${(currentStep + 1) * 25}%`}} className={`stepsProgressBar`}></div>
      </div>

      <div>{components[currentStep]}</div>
      <div className='d-flex-cc gap-2 mt-4 btnsWrapper'>
        <button className='btn btn-primary' onClick={prevStep} disabled={currentStep === 0}>
          Prev
        </button>
        <button className='btn btn-primary' onClick={nextStep} disabled={currentStep === components.length - 1}>
          Next
        </button>
      </div>
    </Wrapper>
  );
};

export default StepComponentContainer;

const Wrapper = styled.div`
height: calc(100vh - 180px);
position: relative;
.stepsProgressBarWrpr{
  transition: 0.5s;
  height: 12px;
  .stepsProgressBar{
    height: 7px;
    background: var(--clr2);
    border-radius: 8px;
    transition: 0.5s
  }
}
.btnsWrapper{
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translate(-50%, 0)
}
`
