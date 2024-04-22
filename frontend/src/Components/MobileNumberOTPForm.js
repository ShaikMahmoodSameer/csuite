import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material/";
import Form from "react-bootstrap/Form";
import axios from "axios";
import BASE_URL from "../config/apiConfig";
import { styled } from "styled-components";

export default function MobileNumberOTPForm({
  userId,
  setUserId,
  currentStep,
  setCurrentStep,
  checkOutFormData,
  setCheckOutFormData,
}) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOTP] = useState("");
  const [showOTPField, setShowOTPField] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [OtpError, setOtpError] = useState("");

  const handleMobileNumberSubmit = () => {
    if (/^\d{10}$/.test(mobileNumber)) {
      setLoading(true);
      const sendOTP = async () => {
        try {
          const response = await axios.post(`${BASE_URL}/user/login-otp`, {
            mobileNumber,
          });
          console.log(response.data);
          if (response.data.Status === "OTP sent!") {
            setLoading(false);
            setShowOTPField(true);
            setMobileNumberError("");
          }
        } catch (error) {
          console.log(error);
        }
      };
      sendOTP();
    } else {
      setMobileNumberError(
        "Incorrect entry. Please enter a valid 10-digit mobile number."
      );
    }
  };

  const handleOTPSubmit = () => {
    if (/^\d{4}$/.test(otp)) {
      setLoading(true);
      const verifyOTP = async () => {
        try {
          const response = await axios.post(`${BASE_URL}/user/verify-otp`, { mobileNumber, otp });
          if (response) {
            setLoading(false);
            console.log(response.data);
            if (response.data.Status === "wrongOTP") {
              setOtpError("OTP mismatched, Try again...");
            } else if (response.data.Status === "Verified") {
              setOtpError("");

              setUserId(response.data.userId)

              setCheckOutFormData((prevData) => ({
                ...prevData,
                userId: response.data.userId,
              }));

              setTimeout(() => {
                setCurrentStep(currentStep + 1);
              }, 1000);
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
      verifyOTP();
    } else {
      setOtpError("Incorrect entry. Please enter a valid 4-digit OTP sent.");
    }
  };

  return (
    <Wrapper className="mt-5 ps-2">
      <Grid container spacing={2} className="otpForm">
        <Form
          className="d-flex flex-column gap-3 w-100 ps-2"
          onSubmit={(e) => {
            e.preventDefault();
            showOTPField ? handleOTPSubmit() : handleMobileNumberSubmit();
          }}
        >
          <Grid item xs={12}>
            <TextField
              required
              label="Mobile Number"
              variant="outlined"
              fullWidth
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              disabled={showOTPField}
              type={"tel"}
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              error={Boolean(mobileNumberError)}
              helperText={mobileNumberError}
            />
          </Grid>
          {showOTPField && (
            <Grid item xs={12}>
              <TextField
                required
                label="OTP"
                variant="outlined"
                fullWidth
                value={otp}
                type={"num"}
                onChange={(e) => setOTP(e.target.value)}
                error={Boolean(OtpError)}
                helperText={OtpError}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
            >
              {loading
                ? "Processing req..."
                : showOTPField
                ? "Verify OTP"
                : "Send OTP"}
            </Button>
          </Grid>
        </Form>
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  button {
    background-color: var(--clr3);
    box-shadow: rgba(15, 12, 15, 0.15) 0px 48px 100px 0px;
    &:hover {
      background-color: var(--clr2);
      box-shadow: rgba(15, 12, 15, 0.15) 0px 48px 100px 0px;
    }
  }
`;
