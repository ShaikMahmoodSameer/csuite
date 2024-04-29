import React from 'react';
import { styled } from "styled-components";
import LoginBox from '../Components/AdminAuthComponents/LoginBox';

const Login = ({ setAuth, setAdminId }) => {
    return (
        <Wrapper className="d-flex-cc">
            <LoginBox setAuth={setAuth} setAdminId={setAdminId} />
        </Wrapper>
    );
}

export default Login;

const Wrapper = styled.div`
width: 100%;
`;
