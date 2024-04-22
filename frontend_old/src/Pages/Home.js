import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from "styled-components";
import { Header } from '../Components/Header';

export default function Home({ auth, userId }) {
  return (
    <Wrapper>
      <Header auth={auth} userId={userId} />
      <div className="homeContent d-flex-cc flex-column container">
        <h2 className="text-primary text-white text-center">Nutrify Today Presents</h2>
        <h2 className="text-primary text-white text-center">CSuite Sumflex 2024</h2>

        <p className="text text-center text-white">6th - 7th June 2024</p>
        <p className="text text-center text-white">At The Taj Mahal Palace, Mumbai, India</p>

        <div className="d-flex-cc gap-3">
          <Link to="https://youtube.com">
            <span className="text-white">
              Learn More
            </span>
          </Link>
          <Link to="/register">
            <button className='btn btn-warning btn-lg bg-clr2 text-white'> Register Now </button>
          </Link>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
height: calc(100vh - 47px);
width: 100%;
background: var(--clr1) url("/images/homeBg.jpeg") no-repeat center;
background-size: cover;
.homeContent{
  height: calc(100vh - 150px);
}
`