import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { styled } from "styled-components";

function SIteLogo() {
  return (
    <Wrapper>
        <div className="logoWrapper">
            <Link to='/'>
                <Image src='/images/csuitelogo.png' alt='siteLogo' className='siteLogo w-100' />
          </Link>
        </div>
    </Wrapper>
  )
}

export default SIteLogo;

const Wrapper = styled.div`
.logoWrapper{
    width: 150px;
    height: auto;
}
`
