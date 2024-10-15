import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
// import theme from './theme';
import { HeaderComponent } from "./home_page";
import React, { useContext, useState } from "react";
import { AuthContext, BackendBaseUrl } from "../global_varibels";
import { useTheme } from "@emotion/react";

function ManageUserProfile() {
  //   try {
  const { user_data, UpdateUser } = useContext(AuthContext);
  const [user_profile_data, setData] = useState({ ...user_data });
  console.log("user data", user_data);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdateTheUser = async (e) => {
    e.preventDefault();
    console.log("data to udate", user_profile_data);
    
    try {
      const bkendroute = `${BackendBaseUrl}/user`;
      const response = await fetch(bkendroute, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user_profile_data),
      });
      const responseData = await response.json();
      console.log(`response:${JSON.stringify(responseData)}`);
      if (responseData.status === "success") {
        const user_details = responseData.user_details;
        console.log("user details:", user_details);
        UpdateUser(user_details);
        console.log("user state updated successfully");
      } else {
        console.error("failed to update");
      }
      handleClose()
    } catch (error) {
      console.log("error", error);
      handleClose()
    }
  };
  const handleChangeValues = (e) => {
    const { id, value } = e.target;
    console.log(id, value);
    setData({
      ...user_profile_data,
      [id]: value,
    });
  };
  //   const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box>
      <HeaderComponent />
      <Box
        sx={{
          mt: 10,
          display: "flex",
          justifyContent: "center",
          marginLeft: 2,
          marginRight: 2,
        }}
      >
        <Paper elevation={10} sx={{ padding: 3, width: 370 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              rowGap: 2,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontWeight: "bold" }}>Name</Typography>
              <Typography>{user_data.name}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontWeight: "bold" }}>Phone Number</Typography>
              <Typography>{user_data.phone_number}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontWeight: "bold" }}>Email</Typography>
              <Typography>{user_data.email}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Button variant="contained" onClick={handleClickOpen}>
                Update
              </Button>
            </Box>
            <Box>
              <Dialog
                // fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                  <FormGroup sx={{ m: 1, rowGap: 2, maxWidth: 300 }}>
                    <TextField
                      required
                      id="name"
                      label="Name"
                      variant="outlined"
                      value={user_profile_data.name}
                      type="text"
                      onChange={handleChangeValues}
                    />
                    <TextField
                      id="phone_number"
                      label="Phone Number"
                      variant="outlined"
                      type="number"
                      value={user_profile_data.phone_number}
                      onChange={handleChangeValues}
                    />
                    <TextField
                      required
                      id="email"
                      label="Email"
                      variant="outlined"
                      type="email"
                      value={user_profile_data.email}
                      onChange={handleChangeValues}
                    />
                  </FormGroup>
                </DialogContent>
                <DialogActions>
                  <Button variant="contained" onClick={handleUpdateTheUser}>
                    Update
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
}

export default ManageUserProfile;
