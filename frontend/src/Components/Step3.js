import React, { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import { Button } from "@mui/material/";
import BASE_URL from "../config/apiConfig";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import CouponCodeApplyForm from "./CouponCodeApplyForm";
import DisplayFormData from "./DisplayFormData";

export default function Step3({
  currentStep,
  setCurrentStep,
  checkOutFormData,
  setCheckOutFormData,
  ticketId,
  setTicketId,
}) {
  const [subtotalAmount, setSubtotalAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [couponMsg, setCouponMsg] = useState("");
  const [couponcode, setCouponCode] = useState("");
  const [couponValidationStatus, setCouponValidationStatus] = useState("");

  useEffect(() => {
    const fetchTicketAmount = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/ticket/get-price`);
        setSubtotalAmount(response.data);
        setTotalAmount(response.data);
      } catch (errer) {
        console.error(errer);
      }
    };
    fetchTicketAmount();
  }, [subtotalAmount]);

  const handlePlacePayment = async (orderamount) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/payments/create-payment/${orderamount}`
      );
      const { id, amount, currency } = response.data;

      const options = {
        key: "rzp_test_abT4ZDhDnaQg8g",
        amount,
        currency,
        name: "C-Suite Registration Payment",
        description: "Payment for your order",
        order_id: id,
        handler: function (response) {
          if (response.razorpay_payment_id) {
            console.log("PaymentSuccessufull");
            setCheckOutFormData((prevData) => ({
              ...prevData,
              payment: {
                ...prevData.payment,
                rzp_order_id: response.razorpay_order_id,
                rzp_payment_id: response.razorpay_payment_id,
                rzp_signature: response.razorpay_signature,
              },
            }));
          } else {
            console.log("something else response came!");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
    }
  };

  // for placing and order after payment successful
  const handlePlaceOrder = useCallback(async () => {
    try {
      const response = await axios.post(`${BASE_URL}/orders/place-order`, {
        checkOutFormData,
      });
      if (response.data.Status === "Success") {
        const ticketId = response.data.ticketId;
        console.log("order placed successfully!");
        setTicketId(ticketId);
        setTimeout(() => {
          setCurrentStep(currentStep + 1);
        }, 500);
      } else {
        console.error("Error placing order:", response.data.error);
      }
    } catch (error) {
      console.error("error at placing an order");
    }
  }, [checkOutFormData, setTicketId, currentStep, setCurrentStep]);

  const handlePlaceOrderCallback = useCallback(() => {
    handlePlaceOrder();
  }, [handlePlaceOrder]);

  useEffect(() => {
    if (checkOutFormData.payment.rzp_order_id) {
      handlePlaceOrderCallback();
    }
  }, [checkOutFormData.payment.rzp_order_id, handlePlaceOrderCallback]);

  useEffect(() => {
    setCheckOutFormData((prevData) => ({
      ...prevData,
      amount: {
        ...prevData.amount,
        subTotalAmount: subtotalAmount,
        couponCodeDiscount: discountAmount,
        totalAmount: totalAmount,
      },
    }));
  }, [setCheckOutFormData, subtotalAmount, discountAmount, totalAmount]);

  const prevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  return (
    <Wrapper className="billingDetails">
      <h2 className="stepHeading"> 
        <button className="btn me-1" onClick={prevStep}> 
          <FontAwesomeIcon icon={faAnglesLeft} />
        </button>
        Billing Details 
      </h2>

      <div className="billingInfo">
        <div className="brdrBtmDtd">
          <DisplayFormData checkOutFormData={checkOutFormData} />
        </div>
        <div className="bg-white p-md-5 p-2 rounded-3">
          <p className="text d-flex-cb p-2">
            <span> Subtotal: </span>
            <span className="fw-medium">
              <span className="me-2"> &#8377; </span> {subtotalAmount}{" "}
            </span>
          </p>

          {couponValidationStatus === "success" ? (
            <div>
              <p className={`small fw-medium text-success p-3 bg-success-subtle rounded`}>
                {couponMsg}
              </p>
              <p className="text d-flex-cb p-2">
                <span> Discount Amount: </span>
                <span className="dAmount fw-medium text-success">
                  -₹{discountAmount}
                </span>
              </p>
            </div>
          ) : (
            <CouponCodeApplyForm
              couponMsg={couponMsg}
              setCouponMsg={setCouponMsg}
              couponcode={couponcode}
              setCouponCode={setCouponCode}
              couponValidationStatus={couponValidationStatus}
              setCouponValidationStatus={setCouponValidationStatus}
              // ---------------
              subtotalAmount={subtotalAmount}
              setSubtotalAmount={setSubtotalAmount}
              discountAmount={discountAmount}
              setDiscountAmount={setDiscountAmount}
              totalAmount={totalAmount}
              setTotalAmount={setTotalAmount}
              // ---------------
              checkOutFormData={checkOutFormData}
              setCheckOutFormData={setCheckOutFormData}
            />
          )}
        </div>
      </div>
      <div className="payBtn">
        <Button
          type="button"
          variant="contained"
          color="primary"
          size="large"
          className="mt-3"
          fullWidth
          onClick={() => {
            handlePlacePayment(totalAmount);
          }}
        >
          <h2 className="textAccent d-flex-cb p-1 mb-0 w-100 text-white">
            <span className="fw-normal text-white">Total Amout Payable:</span>
            <span className="fw-medium text-white">
              <span className="me-2"> &#8377; </span> {totalAmount}
              <FontAwesomeIcon icon={faCreditCard} className="ms-2" />
            </span>
          </h2>
        </Button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .billingDetails {
    text-align: start;
  }
  h3 {
    font-size: 18px;
  }
  ${'' /* button {
    background-color: var(--clr4);
  } */}
  .payBtn button {
    background-color: var(--clr3);
    &:hover {
      background-color: var(--clr2);
      box-shadow: none;
    }
  }
  .couponBox {
    #coupon-code-field {
      border-bottom: 1px solid;
    }
  }
  .couponBtn {
    border-radius: 0;
    height: 3rem;
    width: 10rem;
    background-color: var(--clr4);
  }
`;
