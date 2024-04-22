import React, { useState } from 'react';
import './App.css';
import { styled } from "styled-components";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CouponUpdatePopup from './Components/Popups/CouponUpdatePopup';
import NavBar from './Components/NavBar';
import Tickets from './Pages/Tickets';
import CheckTicket from './Pages/CheckTicket';
import Meetings from './Pages/Meetings';
import Seatings from './Pages/Seatings';
import Coupons from './Pages/Coupons';
import Settings from './Pages/Settings';
import TestPage from './Pages/TestPage';

function App() {
  // popups
  const [CouponUpdatePopupShow, setCouponUpdatePopupShow] = useState(false);

  return (
    <Router>
      <Dashboard className="App">
        <div className="dashboradWrapper bgLgt1 overflow-hidden rounded-4 p-3 p-md-4 pb-0 container d-flex">
          <NavBar />
          <div className="dashboardBody rounded-4  bg-white p-3 flex-fill">
            <Routes>
              <Route path="/" element={<Tickets />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/check-ticket" element={<CheckTicket />} />
              <Route path="/meetings" element={<Meetings />} />
              <Route path="/seatings" element={<Seatings />} />
              <Route path="/coupons" element={<Coupons />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/test-page" element={<TestPage />} />
            </Routes>
          </div>
        </div>
      </Dashboard>

      {/* popups */}
      <CouponUpdatePopup show={CouponUpdatePopupShow} onHide={() => setCouponUpdatePopupShow(false)} />
    </Router>

    // <ResponsiveDrawer />
  );
}

export default App;

const Dashboard = styled.div`
  height: calc(100vh);
  padding: 30px;
  background: #eeeeee;
  .dashboradWrapper{
    height: calc(100vh - 50px);
    .dashboardBody{
      overflow-Y: scroll;
    }
  }
`


