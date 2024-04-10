import { React, useState } from 'react'
import "../Css/Login.css"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, TextField, colors } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    // height: "100%",
    // width: "90vw",
    border: "1px solid grey"

}));


export default function Login() {
    const [errorV, setError] = useState({
        errorEmail:false,
        emailMessage:"",
        errorPassword:false,
        passwordMessage:""
    });
    
  const navigate = useNavigate();
    const [inputs, setInputs] = useState({

        email: "",
        password: ""
    });
    const reEmail = /^([a-zA-Z0-9._%-]+@[a-z]+\.[a-z]{2,5})$/;
    const rePass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
    const formHandler = (e) => {
        e.preventDefault();
        if (reEmail.test(inputs.email)===false) {
           setError((prev)=>({
            ...prev,
            emailMessage:"Enter Correct Email",
            errorEmail:true,
           }))
            
            return; // Stop further execution if email is invalid
        }else{
            setError((prev)=>({
              ...prev ,
              emailMessage:"",
              errorEmail:false 
            }))
        }
        if (!rePass.test(inputs.password)) {
            setError((prev)=>({
             ...prev,
             passwordMessageMessage:"Enter password with capital ,small,number,Charecter",
             errorPassword:true,
            }))
             
             return; // Stop further execution if email is invalid
         }else{
             setError((prev)=>({
               ...prev ,
               passwordMessage:"",
               errorPassword:false 
             }))
         }

        // If email is valid, proceed with form submission
        console.log(inputs);
        sendRequest().then(() => navigate('/'));

    }
    const sendRequest = async () => {
        const res = await axios.post('https://fundoonotes.incubation.bridgelabz.com/api/user/login', {
            
            email: inputs.email,
            password: inputs.password,
            
        }).catch(e => console.log(e));
        const data = res.data;
        console.log(data);
        
        localStorage.setItem('token',data.id)
        return data;
    }

    const handleChange = (e) => {
        setInputs(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    return (
        <Box sx={{width:'100%'}}>
            <Grid xs={12} lg={12} sm={12} width={"100%"} height={'100vh'} display={'grid'} justifyContent={'space-evenly'} alignContent={'center'} >
                <Paper sx={{ width: "100%",height:"500px" }} className='paperDiv-one'>
                    <div className="text-login">
                        <h1><span style={{ color: "#4D6AFF" }}>G</span><span style={{ color: "red" }}>o</span><span style={{ color: "yellow" }}>o</span><span style={{ color: "#4D6AFF" }}>g</span><span style={{ color: "green" }}>l</span><span style={{ color: "red" }}>e</span></h1>
                        <h2>Sign In</h2>
                        <h3>with your google account</h3>
                    </div>
                    <div className="inputField-one">
                        <TextField
                            label="Email or phone"
                            placeholder='Enter your Email'
                            type='email'
                            fullWidth
                            value={inputs.email}
                            onChange={handleChange}
                            
                            name='email'
                            error={errorV.errorEmail}
                            helperText={errorV.emailMessage}
                        />

                        <p className='inputP' >Forget Email ?</p>
                    </div>
                    <div className="inputField-one">
                        <TextField
                            label='Password'
                            placeholder='password'
                            type='password'
                            fullWidth

                            error={errorV.errorPassword }
                            
                            
                            value={inputs.password}
                            onChange={handleChange}
                            helperText={errorV.passwordMessage}
                            name='password'
                        />

                        <p className='inputP'>Forget Passowrd ?</p>
                        <br/>
                        <p style={{opacity:'0.8'}}>Not your Computer? Use Guest mode to sign in privately</p>
                        <p className='inputP'> Learn more</p>
                    </div>
                    <div className="inputText" style={{ display: "flex", justifyContent: "space-around", alignItems: "center", marginTop: "15px", marginBottom: "20px" }} >
                        <div>
                            <Link to='/register'><Button  >Create Account</Button></Link>
                        </div>
                        <div>
                            <Button variant='contained' onClick={formHandler}>Next</Button>
                        </div>
                    </div>

                </Paper>
            </Grid>
        </Box>
    );
}