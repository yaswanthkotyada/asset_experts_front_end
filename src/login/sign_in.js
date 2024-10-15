import { Alert, Box, Button, FormGroup, Snackbar, TextField, Typography } from "@mui/material";
import { json, useNavigate } from "react-router-dom";
import { BackendBaseUrl } from "../global_varibels";
import { useContext, useState } from "react";
import { AuthContext } from "../global_varibels";

function SignInPage() {
    const {login,UpdateUser,UpdateProperties}=useContext(AuthContext)
    const [message,setMessage]=useState('')
    const [messageType,setMessageType]=useState('')
    const [open,setOpen]=useState(false)
    const [form_data,updateformdata]=useState(
        {
            "email":"",
            "password":""
        }
    )
    const handleClose=()=>{
        setOpen(false)
    }
    const handleFormData=(e)=>{
        const {id,value}=e.target;
        updateformdata({
            ...form_data,
            [id]:value
        });
    }
    const navigate=useNavigate()
    const ReRouteToSignup=()=>(
        navigate('/signup')
    )
    const verifyTheUser=async (e)=>{
        e.preventDefault();
        console.log(JSON.stringify(form_data))
        const queryParams = new URLSearchParams({
            email: form_data.email,
            password: form_data.password
        });
        try{
            const backendrout=`${BackendBaseUrl}/user?${queryParams.toString()}`
            const response=await fetch(backendrout,{
                method:"Get",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const response_data= await response.json()
            console.log("response data",response_data)
            if (response.ok) {
                console.log("user verified successfully")
                const user_details=response_data.user_details;
                const user_props = response_data.sell_properties;
                console.log("user properties",user_props)
                UpdateUser(user_details)
                UpdateProperties(user_props)
                console.log("user state updated successfully")
                login()
                navigate('/')
            }
            else {
                console.error("failed to verify the user")
                setMessageType("error")
                setMessage("Entered email or password is wrong")
                setOpen(true)
            }}
        catch(error) {
            console.log(`error while verifying the user:${error}`)
            setMessage("Interenall Error")
            setOpen(true)
        }
    }

    return (
        <Box>
            <Typography component="div" variant="h4">Sign in</Typography>
            <div style={{display:"flex", alignContent:"center"}}>
                <Typography>Don't have an account ?</Typography>
                <Button onClick={ReRouteToSignup}>Sign Up</Button>
            </div>
            <FormGroup sx={{m:1,rowGap:2,maxWidth:300}}>
                <TextField  id="email" type="email" variant="outlined" label="Email" value={form_data.email} onChange={handleFormData}>Email</TextField>
                <TextField id="password" type="password" variant="outlined" label="password" value={form_data.password} onChange={handleFormData}></TextField>
                <Button variant="contained" type="submit" onClick={verifyTheUser}>Sign in</Button>
            </FormGroup>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
                >
                <Alert severity={messageType} onClose={handleClose}>{message}</Alert>
            </Snackbar>
        </Box>
    )
}

export default SignInPage;