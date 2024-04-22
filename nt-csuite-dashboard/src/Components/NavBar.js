import React from 'react';
import { NavLink } from 'react-router-dom';
import SiteLogo from './SIteLogo';
import { styled } from "styled-components";

const NavBar = () => {
  return (
    <Wrapper className=' pe-3'>
      <nav className="navBar d-flex flex-column">
        <SiteLogo />
        <ul className="navbar-nav bg-white rounded-4 overflow-hidden mt-4">
          <li className="nav-item">
            <NavLink to="/tickets" className="nav-link" >Tickets</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/check-ticket" className="nav-link" >Check Ticket</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/meetings" className="nav-link" >Meetings</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/seatings" className="nav-link" >Seatings</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/coupons" className="nav-link" >Coupons</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/settings" className="nav-link" >Settings</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/test-page" className="nav-link" >TestPage</NavLink>
          </li>
        </ul>
      </nav>
    </Wrapper>
  );
};

export default NavBar;

const Wrapper = styled.div`
  .navBar {
    width: 250px;
    height: auto;
    ul {
      li {
        a {
          padding: 10px 20px;
        }
        .active {
          background-color: #f0f0f0; /* Example of active link styling */
          color: #333; /* Example of active link styling */
        }
      }
    }
  }
`;
