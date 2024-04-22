import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { TextField } from "@mui/material";
import axios from "axios";
import BASE_URL from "../config/apiConfig";

export default function CouponCodeApplyForm({
  couponMsg,
  setCouponMsg,
  couponcode,
  setCouponCode,
  couponValidationStatus,
  setCouponValidationStatus,
  // -----------------
  subtotalAmount,
  setSubtotalAmount,
  discountAmount,
  setDiscountAmount,
  totalAmount,
  setTotalAmount,
  // -----------------
  checkOutFormData,
  setCheckOutFormData,
}) {
  const submitCouponCode = async (e) => {
    e.preventDefault();

    const verifyDiscountCoupon = async (code) => {
      try {
        const response = await axios.get(
          `${BASE_URL}/coupons/verify-coupon/${code}`,
          {
            params: {
              subtotalAmount: subtotalAmount,
              discountAmount: discountAmount,
              totalAmount: totalAmount,
            },
          }
        );
        if (response.data.Status === "OK") {
          setCouponValidationStatus("success");
          setCouponMsg(`Coupon Code { ${couponcode} } Verified Successfully.`);

          // setSubtotalAmount(response.data.subtotalAmount);
          setDiscountAmount(response.data.discountAmount);
          setTotalAmount(response.data.totalAmount);
        } else {
          setCouponValidationStatus("error");
          setCouponMsg("Invalid Coupon Code. Try again...");
        }
      } catch (error) {
        console.log(error);
      }
    };

    await verifyDiscountCoupon(couponcode);
  };

  useEffect(() => {
    setCheckOutFormData((prevData) => ({
      ...prevData,
      amount: {
        ...prevData.amount,
        subTotalAmount: subtotalAmount,
        couponCode: couponcode,
        couponCodeDiscount: discountAmount,
        totalAmount: totalAmount,
      },
    }));
  }, [
    subtotalAmount,
    couponcode,
    discountAmount,
    totalAmount,
    setCheckOutFormData,
  ]);

  return (
    <Form
      onSubmit={submitCouponCode}
      className="couponBox d-flex align-items-start"
    >
      <TextField
        required
        size="small"
        label="Coupon Code"
        placeholder="FLATOFF50"
        name="couponCode"
        id="coupon-code-field "
        variant="filled"
        className={`text-uppercase w-100`}
        value={couponcode}
        onChange={(e) => {
          setCouponCode(e.target.value.toUpperCase());
        }}
        error={couponValidationStatus === "error"}
        helperText={couponMsg}
        disabled={couponValidationStatus === "success"}
      />

      <Button
        type="submit"
        // variant="dark"
        id="button-addon2"
        className="couponBtn border-0"
        disabled={couponValidationStatus === "success"}
      >
        Apply
      </Button>
    </Form>
  );
}
