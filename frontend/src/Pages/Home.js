import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
// import { Header } from "../Components/Header";

export default function Home({ auth, userId }) {
  return (
    <Wrapper>
      <div className="home">
        {/* <Header auth={auth} userId={userId} /> */}

        <div className="homeContent d-flex-cc flex-column container">
          <div className="ntLogo">
            <img src="/images/nt_logo.png" width={"150rem"} alt="" />
            <h2 className="ptxt mt-2">Presents</h2>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h2 className="titleCsuite">CSuite Sumflex 2024</h2>
                <h3 className="animate-charcter"> CSuite Sumflex 2024</h3>
              </div>
            </div>
          </div>

          <p className="ptxt mb-0">6th - 7th June 2024</p>
          <p className="ptxt">At The Taj Mahal Palace, Mumbai, India</p>
          <Link to="/register">
            <button className="regBtn text-white my-3 ">Register Now</button>
          </Link>
          <Link className="lm" to="https://youtube.com">
            <span className="lrnMore">Learn More</span>
            <img src="/images/svg/arrows-right.svg" alt="" />
          </Link>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .animate-charcter {
    background-image: linear-gradient(
      -225deg,
      #f99c1c 0%,
      #d34197 29%,
      #8458a4 67%,
      #d34197 100%
    );
    background-size: auto auto;
    background-clip: border-box;
    background-size: 200% auto;
    color: #fff;
    background-clip: text;
    /* text-fill-color: transparent; */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textclip 3s linear infinite;
    display: inline-block;
    font-size: 3.25rem;
    font-weight: 600;
  }

  @keyframes textclip {
    to {
      background-position: 200% center;
    }
  }
  .home {
    .homeContent {
      margin-bottom: 10%;
      .ptxt {
        font-size: 18px;
        font-weight: 500;
      }
    }

    .titleCsuite {
      -webkit-text-stroke: 1px #00000050;
      color: #ffffff50;
      font-size: 6rem;
      font-weight: 600;
      margin-bottom: -65px;
    }
    .regBtn {
      background-color: #d34197;
      padding: 10px 42px;
      font-size: 16px;
      border: none;
    }
    .lm {
      .lrnMore {
        font-size: 14px;
        color: var(--text);
        margin-right: 5px;
      }
      &:hover img {
        transition: 0.3s;
        margin-left: 10px;
      }
    }
    a {
      text-decoration: none;
    }
  }
  @media only screen and (max-width: 600px) {
    .home {
      align-items: center;
      height: 100vh;
      .ntLogo {
        margin-top: 10%;
      }
      .animate-charcter {
        font-size: 1.8rem;
        margin-bottom: 30px;
      }
      .titleCsuite {
        margin-bottom: -50px;
        font-size: 3rem;
        border: 2px solid;
      }
    }
  }
`;
