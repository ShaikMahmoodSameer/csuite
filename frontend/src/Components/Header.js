import React from "react";
import { styled } from "styled-components";
import SIteLogo from "./SIteLogo";

export const Header = () => {
  return (
    <Wrapper className="w-100">
      <div className="container d-flex-cc mx-auto">
        <SIteLogo />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
