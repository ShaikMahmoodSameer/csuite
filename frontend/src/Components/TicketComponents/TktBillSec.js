import React, { useEffect } from "react";
import BASE_URL from "../../config/apiConfig";
import axios from "axios";

const TktBillSec = ({ tktInfo, billing, setBilling }) => {
  useEffect(() => {
    const fetchTktBnfDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/ticket/billing-details/${tktInfo.order_billing_id}`
        );

        if (response && response.data.length > 0) {
          const data = response.data[0];
          setBilling({
            tktSubtotalAmount: data.order_subtotal_amount,
            order_coupon_code: data.order_coupon_code_applied,
            tktDiscountAmount: data.order_discount_amount,
            tktTotalAmount: data.order_total_amount,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTktBnfDetails();
  }, [tktInfo, setBilling]);

  return (
    <div className="py-3 pb-3">
      <p className="d-flex-cb small mb-1">
        <span className="w-30">Sub-total </span>
        <span> {billing.tktSubtotalAmount} </span>
      </p>
      <p className="d-flex-cb small mb-1">
        <span className="w-30">Discount </span>
        <span className="text-success"> - {billing.tktDiscountAmount} </span>
      </p>
      <p className="d-flex-cb small mb-1">
        <span className="">TOTAL AMOUNT </span>
        <span className="fw-bold"> &#8377; {billing.tktTotalAmount} </span>
      </p>
    </div>
  );
};

export default TktBillSec;
