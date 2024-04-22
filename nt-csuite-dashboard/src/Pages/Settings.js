import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { styled } from "styled-components";
import BASE_URL from '../config/apiConfig';
import { Button, Grid, TextField, Typography } from '@mui/material';

export default function Settings() {
  const [editMode, setEditMode] = useState(false);
  const [price, setPrice] = useState(0);
  const [newPrice, setNewPrice] = useState(price);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleCancelClick = () => {
    setEditMode(false);
    setNewPrice(price); // Reset newPrice to the current price
  };

  useEffect(() => {
    const fetchTicketAmount = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/ticket/get-price`);
        if (response) {
          setPrice(response.data)
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchTicketAmount();
  }, []);

  const handleEditBtnClick = async (e) => {
    e.preventDefault();

    if (editMode) {
      try {
        const response = await axios.post(`${BASE_URL}/ticket/set-price/${newPrice}`);
        if (response.data.Status === 'Success') {
          setPrice(newPrice);
          setEditMode(false);
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 2000);
          console.log("Price Updated");
        }
      } catch (error) {
        console.error('Error updating price:', error);
      }
    } else {
      setEditMode(true);
    }
  };

  return (
    <Wrapper>
      <div className={`settingBox border rounded p-md-4 ${showSuccessMessage ? 'border-success' : ''}`}>
        <h2 className='textPrimary txtClrPrimary'>Pricing</h2>
        <hr />

        <div>
          <h2 className='textSecondary fw-normal py-2'>Price of ticket : <span className="txtClrSecondary"> {price} </span> <span className='me-2'> &#8377; </span> </h2>
        </div>

        <div className='d-flex gap-2'>
          {editMode &&
            <Grid item xs={12}>
              <TextField
                required
                label="New Price"
                variant="outlined"
                value={newPrice}
                type="number"
                onChange={(e) => setNewPrice(e.target.value)}
              />
            </Grid>
          }
          <Grid item xs={12} className='d-flex gap-2'>
            {editMode ? (
              <>
                <Button
                  type='submit'
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleEditBtnClick}
                >
                  Update Price
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  size="large"
                  onClick={handleCancelClick}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleEditBtnClick}
              >
                Edit Price
              </Button>
            )}
          </Grid>
        </div>
        {showSuccessMessage && (
          <Typography variant="body2" className="text-success mt-3">
            Price updated successfully
          </Typography>
        )}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div``;
