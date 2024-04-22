import React, { useEffect, useState } from 'react';
import { styled } from "styled-components";
import axios from 'axios';
import BASE_URL from '../config/apiConfig';
import Button from '@mui/material/Button';
import { AddCircle } from '@mui/icons-material';
import CouponCodesListTable from '../Components/CouponCodesListTable';
import CouponForm from '../Components/CouponForm';

export default function Coupons({ setCouponUpdatePopupShow }) {
  const [couponCodesData, setCouponCodesData] = useState([]);
  const [showCouponForm, setShowCouponForm] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  const fetchAllCoupons = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/coupons`);
      setCouponCodesData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllCoupons();
  }, [])

  const handleAddNewCoupon = () => {
    setShowCouponForm(!showCouponForm);
  };

  const handleFormSubmit = async (formData) => {
    setFormDisabled(true);
    try {
      const response = await axios.post(`${BASE_URL}/coupons/add-discount-coupon`, formData);
      if (response.data.Status === "Success") {
        fetchAllCoupons();
        setShowCouponForm(false); // Hide the form
      }
    } catch (error) {
      console.log(error);
    }
    setFormDisabled(false);
  };

  return (
    <Wrapper>
      <h2 className="text-k-secondary"> Coupons Codes </h2>

      <div className="d-flex-cb mb-3">
        <p className="small"> {couponCodesData && couponCodesData.length} Coupon Codes found</p>

        <Button
          variant="outlined"
          startIcon={<AddCircle />}
          onClick={handleAddNewCoupon}
          color={showCouponForm ? 'error' : 'primary'}
        >
          {showCouponForm ? 'Cancel' : 'Add New Coupon Code'}
        </Button>
      </div>

      {showCouponForm &&
        <CouponForm
          onSubmit={handleFormSubmit}
          disabled={formDisabled}
        />
      }
      {
        couponCodesData && couponCodesData.length > 0 ?
          <CouponCodesListTable 
            couponCodesData={couponCodesData} 
            setCouponCodesData={setCouponCodesData} 
            setCouponUpdatePopupShow={setCouponUpdatePopupShow}
            />
          :
          "No tickets found!"
      }

    </Wrapper>
  )
}

const Wrapper = styled.div``;
