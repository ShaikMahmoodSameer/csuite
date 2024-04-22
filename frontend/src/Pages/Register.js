import React, { useState } from "react";
import { styled } from "styled-components";
import StepComponentContainer from "../Components/StepComponentContainer";
import { Header } from "../Components/Header";

export const Register = ({
  auth,
  userId,
  setUserId,
  checkOutFormData,
  setCheckOutFormData,
}) => {
  const [ticketId, setTicketId] = useState("");

  return (
    <Wrapper className="">
      <Header auth={auth} userId={userId} />
      <div className="stepsSection p-md-3 p-2 mx-auto d-flex-cc">
        <div className="stepsWrapper glassBox shadow-sm rounded-4 overflow-hidden">
          <StepComponentContainer
            userId={userId}
            setUserId={setUserId}
            checkOutFormData={checkOutFormData}
            setCheckOutFormData={setCheckOutFormData}
            ticketId={ticketId}
            setTicketId={setTicketId}
          />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* width: 100%; */
  /* background: white; */
  background-size: contain;
  height: 100%;
  /* position: relative; */
  z-index: 0;
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  .stepsSection {
    ${'' /* width: 800px; */}
    /* height: 60vh; */
    .stepsWrapper {
      /* border: 1px solid #fff; */
    }
  }

  /* For responsiveness mobile */
  @media only screen and (max-width: 600px) {
    .stepsSection {
      width: 100%;
      height: auto;
    }
  }
  /*  */
`;
