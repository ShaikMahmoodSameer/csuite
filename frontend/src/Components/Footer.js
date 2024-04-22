import React from "react";
import styled from "styled-components";

export const Footer = () => {
  return (
    <Wrapper>
      <div className="footer p-2">
        <h2 className="text text-center mb-0 "> @2024 NutrifyToday </h2>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .footer {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    background: #ffffff90 !important;
    .text {
      font-size: 14px;
      font-weight: 400;
    }
  }
`;
