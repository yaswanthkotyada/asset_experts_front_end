import { GenerateCards } from "./home_page";
import { AuthContext } from "../global_varibels";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { HeaderComponent } from "./home_page";

export function MyProperties() {
  const navigate = useNavigate();
  const { isAuthinticated, user_props } = useContext(AuthContext);
  console.log("user properties", user_props);
  console.log("isAuthinticated", isAuthinticated);
  const ReRouteToSignInPage = () => {
    navigate("/signin");
  };
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      rowGap: 5,
    }}>
    <Box>
      <HeaderComponent/>
    </Box>
    <Box>
      {isAuthinticated ? (
        <Box
          sx={{
            m: 5,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            rowGap: 2,
            flexGrow: "unset",
          }}
        >
          {GenerateCards(user_props)}
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
          <Button onClick={ReRouteToSignInPage} variant="text">
            <Typography variant="h3">Please login</Typography>
          </Button>
        </Box>
      )}
    </Box>
    </Box>
  );
}
