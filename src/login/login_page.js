import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackendBaseUrl } from "../global_varibels";
import { AuthContext } from "../global_varibels";
const { TextField, Box, FormGroup, Typography, Button } = require("@mui/material")

function LoginPage() {
    const {login,UpdateUser}=useContext(AuthContext)
    const navigate=useNavigate()
    const ReRouteToSignPage=()=>(
        navigate('/signin')
    )
    const [form_data,set_form_data]=useState({
        "name":"",
        "phone_number":"",
        "email":"",
        "password":""})
    const updateFormData=(e)=>{
        const {id,value}=e.target;
        console.log(`${id}=${value}`)
        set_form_data({
            ...form_data,
            [id]:value
        });

    };

    const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log(`form data:${JSON.stringify(form_data)}`);
        try {
            const bkendroute=`${BackendBaseUrl}/user`
            const response=await fetch(bkendroute, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form_data),
            });
            console.log("raw response",response)
            const responseData = await response.json();
            console.log("response:",JSON.stringify(responseData))
            console.log("response data:",responseData)
            if (responseData.status==="success"){
                const user_details= responseData.user_details;
                console.log("user details:", user_details)
                UpdateUser(user_details)
                console.log("user state updated successfully")
                login()
                navigate('/')
            }
            else {
                console.error('failed to create account')
            }
        }
        catch (error) {
            console.error('Error:', error);
        };
        
    };
    // useEffect(() => {
    //     console.log("user_data updated:", user_data);
    //   }, []);
    return (
        <Box component="form" sx={{m:1}}>
        <Typography component="label" variant="h4">Sign Up</Typography>
        <div style={{display:"flex", alignContent:"center"}}>
        <Typography>Already have an account ?</Typography>
        <Button aligncontent="center" variant="text" onClick={ReRouteToSignPage}>Sign in</Button>
        </div>
        <FormGroup sx={{m:1,rowGap:2,maxWidth:300}}>
        <TextField required id="name" label="Name" variant="outlined" type="text" value={form_data.name} onChange={updateFormData}/>
        <TextField id="phone_number" label="Phone Number" variant="outlined" type="number" value={form_data.phone_number} onChange={updateFormData} />
        <TextField required id="email" label="Email" variant="outlined" type="email" value={form_data.email} onChange={updateFormData}/>
        <TextField required id="password" label="Password" variant="outlined" type="password" value={form_data.password} onChange={updateFormData}/>
        <Button variant="contained" type="submit" onClick={handleSubmit}>Create Account</Button>
        </FormGroup>
    </Box>
    )
}

export default LoginPage;