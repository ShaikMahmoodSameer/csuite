import React from 'react';
import { styled } from "styled-components";
import RegistrationFrom from './RegistrationFrom';

export default function step2({ currentStep, setCurrentStep, checkOutFormData, setCheckOutFormData }) {
    return (
        <Wrapper>
            <div className="px-md-5 p-md-4 p-3">
                <RegistrationFrom 
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
