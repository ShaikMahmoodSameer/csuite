import React, { useState } from 'react';
import { TextField, Button, FormControl, Box, FormControlLabel, Radio, FormLabel, RadioGroup } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function CouponForm({ onSubmit }) {
    const [couponCode, setCouponCode] = useState('');
    const [discountType, setDiscountType] = useState('');
    const [discountValue, setDiscountValue] = useState('');
    const [validity, setValidity] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedValidity = validity ? validity.toISOString().slice(0, 19).replace('T', ' ') : null;
        onSubmit({ couponCode, discountType, discountValue, validity: formattedValidity });
    };    

    return (
        <div className='p-md-5 p-3 mb-4 rounded-4 bg-white shadow-sm'>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { my: 0.5, } }}
                noValidate
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <div className="w-100 row">
                    <div className="col-md-6">
                        <TextField
                            label="Coupon Code"
                            variant="outlined"
                            value={couponCode}
                            onChange={(e) => { setCouponCode(e.target.value.toUpperCase()) }}
                            required
                            fullWidth
                            className={`text-uppercase`}
                        />
                    </div>
                    <div className="col-md-6">
                        <FormControl fullWidth>
                            <FormLabel id="discTypeRadio">Coupon Discount Type</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="discTypeRadioLabel"
                                name="row-radio-buttons-group"
                                onChange={(e) => setDiscountType(e.target.value)}
                            >
                                <FormControlLabel value="perc" control={<Radio />} label="Percentage" />
                                <FormControlLabel value="flat" control={<Radio />} label="Flat" />
                                <FormControlLabel value="absl" control={<Radio />} label="Absolute" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="w-100 row">
                    <div className="col-md-6 py-2">
                        <TextField
                            label="Discount Value"
                            variant="outlined"
                            value={discountValue}
                            onChange={(e) => setDiscountValue(e.target.value)}
                            fullWidth
                            required
                        />
                    </div>
                    <div className="col-md-6 p-0">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']} className='m-0 p-0'>
                                <DatePicker
                                    label="Validity"
                                    value={validity}
                                    onChange={(newValue) => setValidity(newValue)}
                                    renderInput={(params) => <TextField {...params} />}
                                    fullWidth
                                    required
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size='large'
                    fullWidth
                    className='mt-3'
                >
                    Submit
                </Button>
            </Box>
        </div>
    );
}
