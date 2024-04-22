import React from 'react';
import { styled } from 'styled-components';
import SIteLogo from './SIteLogo';

export const Header = () => {
  return (
    <Wrapper className='bgLgt1 w-100'>
        <div className="container p-0 py-3 d-flex-cc mx-auto">
          <SIteLogo />
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.div``