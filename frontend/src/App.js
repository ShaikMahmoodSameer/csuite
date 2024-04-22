import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import BASE_URL from "./config/apiConfig";
import "./App.css";

import Home from "./Pages/Home";
import { Footer } from "./Components/Footer";
import { Register } from "./Pages/Register";
import TestPage from "./Pages/TestPage";
import Dashboard from "./Pages/Dashboard";
import TicketInfoPopup from "./Components/Popups/TicketInfoPopup";

function App() {
  axios.defaults.withCredentials = true;
  const [auth, setAuth] = useState(false);
  const [userId, setUserId] = useState("");

  // popups
  const [TicketInfoPopupShow, setTicketInfoPopupShow] = useState(false);
  // popups

  const [checkOutFormData, setCheckOutFormData] = useState({
    userId: "",
    memberDetails: {
      name: "",
      email: "",
      company: "",
      designation: "",
      purpose: "",
    },
    amount: {
      subTotalAmount: 0,
      couponCode: "",
      couponCodeDiscount: 0,
      totalAmount: 0,
    },
    payment: {
      rzp_order_id: "",
      rzp_payment_id: "",
      rzp_signature: "",
    },
  });

  useEffect(() => {
    axios.get(`${BASE_URL}/user`).then((res) => {
        if (res.data.Status === "ok") {
          setAuth(true);
          setUserId(res.data.userId);
          setCheckOutFormData((prevData) => ({ ...prevData, userId: res.data.userId }));
        } else { setAuth(false); }
      }).catch((err) => { console.error("Axios error:", err) });
  }, []);

  return (
    <div className="App allBg">
      <Router>
        <Routes>
          <Route path="/" element={<Home auth={auth} userId={userId} />} />
          <Route
            path="/register"
            element={
              <Register
                auth={auth}
                userId={userId}
                setUserId={setUserId}
                checkOutFormData={checkOutFormData}
                setCheckOutFormData={setCheckOutFormData}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <Dashboard setTicketInfoPopupShow={setTicketInfoPopupShow} />
            }
          />
          <Route path="/test-page" element={<TestPage />} />
        </Routes>

        {/* popups */}
        <TicketInfoPopup
          show={TicketInfoPopupShow}
          onHide={() => setTicketInfoPopupShow(false)}
        />

        <Footer />
      </Router>
      {/* <img className="bgImg" src="/images/bg_img.png" alt="" /> */}
    </div>
  );
}

export default App;
