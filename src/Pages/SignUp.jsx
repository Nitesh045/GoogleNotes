import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import "../Css/Signup.css"
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useState } from 'react';
import logoImage from '../assets/01-removebg-preview.png'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { RegisterPost } from '../Service/UserServices';
import toast from 'react-hot-toast';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),

    color: theme.palette.text.secondary,
}));

export default function SignUp() {

    const [formData, setFormdata] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
        confirmPassword: ""
    });


    const navigate= useNavigate()
    const [showPassword, setShowPassword] = useState(false);

    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
    };
    // handle error here......................................


    const [errorV, setError] = useState({
        errorFirstName: false,
        FnamelMessage: "",
        errorLastName: false,
        LnameMessage: "",
        errorUserN: false,
        UNameMessage: "",
        errorPass: false,
        PassWordMessage: "",
        errorConFirmP: false,
        ConfirmPmessage: ""
    });



    // regex apply here...........................
    const nameRegF = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;


    const userNameReg = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const rePass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/


    const createAcc = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError((prev) => ({
                ...prev,
                errorConFirmP: true,
                ConfirmPmessage: "Password not match"

            }))
            return;
        } else {
            if (!nameRegF.test(formData.firstName)) {
                setError((prev) => ({
                    ...prev,
                    errorFirstName: true,
                    FnamelMessage: "Please enter a valid first name"
                }));
                return;
            } else {
                setError((prev) => ({
                    ...prev,
                    errorFirstName: false,
                    FnamelMessage: ""
                }));
            }
            if (!nameRegF.test(formData.lastName)) {
                setError((prev) => ({
                    ...prev,
                    errorLastName: true,
                    LnameMessage: "Please enter a valid last name"
                }));
                return;
            } else {
                setError((prev) => ({
                    ...prev,
                    errorLastName: false,
                    LnameMessage: ""
                }));
            }
            if (!userNameReg.test(formData.userName)) {
                setError((prev) => ({
                    ...prev,
                    errorUserN: true,
                    UNameMessage: "Please enter a valid username name"
                }));
                return;
            } else {
                setError((prev) => ({
                    ...prev,
                    errorUserN: false,
                    UNameMessage: ""
                }));
            }

            if (!rePass.test(formData.password)) {
                setError((prev) => ({
                    ...prev,
                    errorPass: true,
                    PassWordMessage: "Please enter a valid password"
                }));
                return;
            } else {
                setError((prev) => ({
                    ...prev,
                    errorPass: false,
                    PassWordMessage: ""
                }));
            }
        }
        // console.log(formData)
        const data =  {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.userName,
            password: formData.password,
            service: "advance"
        }

        RegisterPost(data)
        .then((d)=>{
            console.log(d)
             toast.success(d.data.data.message)
             navigate('/login')
        }).catch((err)=>{
            console.log(err)
        })

    }

    const handleChange = (e) => {
        setFormdata((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
  const loginPage=()=>{
    window.location.assign('/login')
  }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1} className='gridContainer' height={'100vh'} >
                <Grid item xs={12} lg={8} >
                    <Item className='itemClass'>
                        <Grid lg={7} sm={10} xs={12} spacing={1} className='itemClass-content'>
                            <h1><span style={{ color: "#4D6AFF" }}>G</span><span style={{ color: "red" }}>o</span><span style={{ color: "yellow" }}>o</span><span style={{ color: "#4D6AFF" }}>g</span><span style={{ color: "green" }}>l</span><span style={{ color: "red" }}>e</span></h1>
                            <h3 style={{ color: "black" }}>Create Your Google Account</h3>
                            <Grid lg={12} sm={12} xs={12} className='itemClass-content-1'>
                                <Grid lg={5.5} sm={5.5} xs={12}>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        label="First Name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        name='firstName'
                                        error={errorV.errorFirstName}
                                        helperText={errorV.FnamelMessage}
                                    />

                                </Grid>
                                <Grid lg={5.5} sm={5.5} xs={12} className='confirmDivPass'>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        label="Last Name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        name='lastName'
                                    />

                                </Grid>
                            </Grid>

                            <Grid lg={12} sm={12} xs={12} className='confirmDivPass'>
                                <TextField
                                    fullWidth
                                    size='small'
                                    label="UserName *"
                                    helperText={errorV.errorUserN ? "Please enter valid username" : "You can use letters , Number , dot"}
                                    value={formData.userName}
                                    onChange={handleChange}
                                    name='userName'
                                    error={errorV.errorUserN}

                                />

                            </Grid>
                            <p className='innperP'>Use my current Email address instead</p>
                            <Grid lg={12} sm={12} xs={12} className='itemClass-content-1'>
                                <Grid lg={5.5}>
                                    <TextField
                                        fullWidth
                                        type={showPassword ? "text" : "password"}
                                        size='small'
                                        label="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        name='password'
                                        error={errorV.errorPass}
                                        helperText={errorV.PassWordMessage}
                                    />

                                </Grid>
                                <Grid lg={5.5} className='confirmDivPass ConfPass'>
                                    <TextField
                                        fullWidth
                                        type={showPassword ? "text" : "password"}
                                        size='small'
                                        label="Confirm Password"

                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        name='confirmPassword'
                                        error={errorV.errorConFirmP}
                                        helperText={errorV.ConfirmPmessage}
                                    />

                                </Grid>

                            </Grid>
                            <p>You can use letters ,Numbers and any special Characters</p>
                            <Grid>
                                <FormControlLabel
                                    control={<Checkbox checked={showPassword} onChange={handleCheckboxChange} />}
                                    label={showPassword ? "Hide Password" : "Show Password"}
                                />
                            </Grid>
                            <Grid className='butttonDiv'>
                                <Grid ><Link className='linkText' onClick={loginPage}>Login</Link></Grid>
                                <Grid><Button variant='contained' onClick={createAcc}>Create</Button></Grid>
                            </Grid>

                        </Grid>
                        <Grid item sm={4} xs={0} lg={4} className='itemClass-content itemClass-lower'>

                            <Grid>
                                <img src={logoImage} alt="" />
                                <p className='imgp'>One account. All of Google <br />
                                    working for you
                                </p>
                            </Grid>
                        </Grid>
                    </Item>
                </Grid>


            </Grid>
        </Box>
    );
}