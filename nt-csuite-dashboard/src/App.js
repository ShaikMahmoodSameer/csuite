import React, { useEffect, useState } from 'react';
import './App.css';
import { styled } from "styled-components";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CouponUpdatePopup from './Components/Popups/CouponUpdatePopup';
import NavBar from './Components/NavBar';
import Tickets from './Pages/Tickets';
import CheckTicket from './Pages/CheckTicket';
import Meetings from './Pages/Meetings';
import Seatings from './Pages/Seatings';
import Coupons from './Pages/Coupons';
import Settings from './Pages/Settings';
import TestPage from './Pages/TestPage';
import Login from './Pages/Login';
import axios from 'axios';
import BASE_URL from './config/apiConfig';

function App() {
  const [CouponUpdatePopupShow, setCouponUpdatePopupShow] = useState(false);
  const isAuthenticated = !!localStorage.getItem('token');
  axios.defaults.withCredentials = true;
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [auth, setAuth] = useState(isAuthenticated);
  const [adminId, setAdminId] = useState("");

  useEffect(() => {
    if (isCheckingAuth) {
      axios.get(`${BASE_URL}/admin-auth`)
        .then((res) => {
          if (res.data.Status === "ok") {
            setAuth(true);
            setAdminId(res.data.adminId);
          } else {
            setAuth(false);
          }
        })
        .catch((err) => {
          console.error("Axios error:", err);
          setAuth(false);
        })
        .finally(() => setIsCheckingAuth(false));
    }
  }, [isCheckingAuth, auth]);

  if (isCheckingAuth) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }

  return (
    <Router>
      <Dashboard className="App">
        <div className="dashboradWrapper bgLgt1 overflow-hidden rounded-4 p-3 p-md-4 pb-0 container d-flex">
          { auth && <NavBar auth={auth} setAuth={setAuth} adminId={adminId} setAdminId={setAdminId} /> }
          <div className="dashboardBody rounded-4  bg-white p-3 flex-fill">
            <Routes>
              {auth ? (
                <>
                  <Route path="/" element={<Tickets />} />
                  <Route path="/tickets" element={<Tickets />} />
                  <Route path="/check-ticket" element={<CheckTicket />} />
                  <Route path="/meetings" element={<Meetings />} />
                  <Route path="/seatings" element={<Seatings />} />
                  <Route path="/coupons" element={<Coupons />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/test-page" element={<TestPage />} />
                </>
              ) : (
                <Route path="/*" element={<Navigate to="/login" replace />} />
              )}
              <Route path="/login" element={<Login setAuth={setAuth} setAdminId={setAdminId} />} />
            </Routes>
          </div>
        </div>
      </Dashboard>

      {/* popups */}
      <CouponUpdatePopup
        show={CouponUpdatePopupShow}
        onHide={() => setCouponUpdatePopupShow(false)}
      />
    </Router>
  );
}

export default App;

const Dashboard = styled.div`
  height: calc(100vh);
  padding: 30px;
  ${'' /* background: #eeeeee; */}
  .dashboradWrapper {
    height: calc(100vh - 50px);
    .dashboardBody {
      overflow-Y: scroll;
    }
  }
`;


