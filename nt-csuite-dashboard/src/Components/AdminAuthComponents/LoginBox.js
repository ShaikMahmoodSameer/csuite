import React from 'react';
import { styled } from '@mui/system';
import { Grid, Button, Typography, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import BASE_URL from '../../config/apiConfig';
import { useNavigate } from 'react-router-dom';

const LoginBox = ({ setAuth, setAdminId }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const [adminIdError, setAdminIdError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const adminId = formData.get('adminId');
        const password = formData.get('password');
        try {
            const response = await axios.post(`${BASE_URL}/admin-auth/login`, { adminId, password });
            if (response.status === 200) {
                console.log('Login Successful');
                setAuth(true);
                setAdminId(response.data.adminId)
                navigate('/tickets');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    setAdminIdError(true);
                    setPasswordError(false);
                } else if (error.response.status === 401) {
                    setAdminIdError(false);
                    setPasswordError(true);
                }
            } else {
                console.error('Unexpected Error:', error);
            }
        }
    };

    return (
        <Wrapper className='shadow-sm border p-4 mx-auto my-md-5 my-4'>
            <h2 className="txtSecondary txtClrSecondary text-center mb-5"> Admin Login </h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="adminId"
                    label="Admin Id"
                    id="outlined-size-small"
                    placeholder="Admin Id"
                    size="normal"
                    className='w-100'
                    error={adminIdError}
                />
                <FormControl className='w-100 my-2' variant="outlined" error={passwordError}>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        name="password"
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        className='w-100'
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <Button type='submit' fullWidth variant='contained' sx={{ mt: 2 }}>Sign in</Button>

                <Grid className='mt-4'>
                    <Typography variant="body2" className='text-center' color="textSecondary" >
                        <a href='#!'>Forgot password?</a>
                    </Typography>
                </Grid>
            </form>
        </Wrapper>
    );
}

export default LoginBox;

const Wrapper = styled('div')({
    width: 500,
});
