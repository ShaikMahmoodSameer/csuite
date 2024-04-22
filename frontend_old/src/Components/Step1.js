import React from 'react';
import { styled } from "styled-components";
import MobileNumberOTPForm from './MobileNumberOTPForm';

export default function Step1({ userId, setUserId, currentStep, setCurrentStep, checkOutFormData, setCheckOutFormData }) {
    return (
        <Wrapper>
            <div className="px-md-5 py-md-4 p-3">
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

const Wrapper = styled.div``
