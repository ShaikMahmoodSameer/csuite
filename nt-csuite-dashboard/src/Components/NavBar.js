import React from 'react';
import { NavLink } from 'react-router-dom';
import SiteLogo from './SIteLogo';
import { styled } from "styled-components";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios';
import BASE_URL from '../config/apiConfig';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Tickets', path: '/tickets' },
  { label: 'Check Ticket', path: '/check-ticket' },
  { label: 'Meetings', path: '/meetings' },
  { label: 'Seatings', path: '/seatings' },
  { label: 'Coupons', path: '/coupons' },
  { label: 'Settings', path: '/settings' }
];


const NavBar = ({ auth, setAuth, adminId, setAdminId }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    axios.get(`${BASE_URL}/admin-auth/logout`).then(() => {
      setAuth(false);
      setAdminId("");
      navigate('/');
    })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <Wrapper className='pe-3 d-flex flex-column align-items-between'>
      <div style={{ marginBottom: "auto" }}>
        <nav className="navBar d-flex flex-column">
          <SiteLogo />
          <ul className="navbar-nav bg-white rounded-4 overflow-hidden mt-4">
            {navItems.map(item => (
              <li className="nav-item" key={item.path}>
                <NavLink to={item.path} className="nav-link" >{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {
        auth ? (
          <DropdownButton
            id={`dropdown-button-drop-up`}
            drop={"up"}
            variant="outline-muted"
            className='w-100'
            title={
              <div className='d-flex d-inline'>
                <div className="profileIcon d-flex-cc me-2">
                  <img src="/images/tables/Profile.svg" alt="ProfileSvg" className='img-fluid' />
                </div>
                <div>
                  {adminId}
                </div>
              </div>
            }
          >
            <Dropdown.Item onClick={handleLogout} className="bg-light">
              Logout
            </Dropdown.Item>
          </DropdownButton>
        ) : ("Login")
      }
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
          &.active {
            background-color: #f0f0f0; /* Example of active link styling */
            color: #333; /* Example of active link styling */
          }
        }
      }
    }
  }
  .profileIcon{
      width: 25px;
      height: 25px;
      border: 1px solid var(--clr2);
      border-radius: 25px;
    }
`;
