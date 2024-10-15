import {
  AppBar,
  Avatar,
  Box,
  Button,
  capitalize,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../global_varibels";
import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AddIcon from '@mui/icons-material/Add';
import PhotoAlbumSharpIcon from '@mui/icons-material/PhotoAlbumSharp';

export function FloatingActionButton() {
  try {
    const handleWhatsAppClick = () => {
      const phoneNumber = "9542926041"; // Enter the recipient's phone number here (in international format, without '+' or dashes)
      const message = encodeURIComponent(
        "Hello, I am interested in your property listing!"
      ); // Your pre-filled message

      // Redirect to WhatsApp with the phone number and message
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    };
    return (
      <Box
        onClick={handleWhatsAppClick}
        sx={{
          position: "fixed",
          top: "50%", // You can adjust this to move it further from the bottom
          right: 16, // You can adjust this to move it further from the right
          zIndex: 1000, // Ensure it's on top of other elements
          backgroundColor: "green", // WhatsApp green color for the background
          padding: "10px", // Some padding around the icon
          borderRadius: "50%", // To make it a circular button
          color: "white", // White icon color
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.0)", // Shadow for a floating effect
          cursor: "pointer",
          
        }}
      >
        <WhatsAppIcon sx={{ fontSize: 40 }} />
      </Box>
    );
  } catch (error) {
    console.log("error in floating action button", error);
  }
}


export function GenerateCards(sell_props) {
  const navigate=useNavigate()
  console.log("data to generate card",sell_props)
  const ReRouteToPropertyPage=(prop_id)=>{
    console.log("property to reroue",prop_id)
    navigate(`/property/${prop_id}`)
  }
  const getPropertyTitile = (listing_type, property_type, unit, size) => {
    const captalized_prop_type = capitalize(property_type);
    console.log("property type", captalized_prop_type);
    if (listing_type == "sell") {
      return `${size} ${unit}, ${captalized_prop_type} For Sale`;
    } else if (listing_type == "renatl") {
      return `${size} ${unit}, ${captalized_prop_type} For Rent`;
    } else if (listing_type == "wanted") {
      return `Wanted ${captalized_prop_type}, ${size} ${unit}`;
    }
  };

  const getPrice = (price, unit, prop_type) => {
    if (prop_type == "commercial" || prop_type == "house") {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Box>
            <CurrencyRupeeOutlinedIcon sx={{ height: 15 }} />
          </Box>
          <Box>{price}</Box>
        </Box>
      );
    } else {
      return (
        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Box>
            <CurrencyRupeeOutlinedIcon sx={{ height: 15 }} />
          </Box>
          <Box>
            {price}/{unit}
          </Box>
        </Box>
      );
    }
  };
  // const recent_properties = home_page_data.recent_properties || {};
  // console.log("recent properties", recent_properties);
  // const sell_props = recent_properties.sell_properties || [];
  return sell_props.map((prop_obj, index) => {
    const prop_url =
      prop_obj.images?.[0]?.img_url ||
      "https://aebkend.assetexperts.in/files/images/2043_plot_300.0_2024_10_03_06_16_09_180079.jpeg";
    const listing_type = prop_obj.listing_type || " ";
    const price = prop_obj.price || 0;
    const prop_type = prop_obj.p_type || "";
    const size = prop_obj.size || "";
    const units = prop_obj.unit || "";
    const landmark = prop_obj.landmark || prop_obj.village || "";
    return (
      <Card
        key={index}
        sx={{
          width: 350,
          height: 250,
          direction: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardActionArea onClick={() => ReRouteToPropertyPage(prop_obj.p_id)}>
        <Box sx={{ position: "relative" }}>
          <CardMedia
            sx={{ height: 140 }}
            image={prop_url}
            title="PropertyImage"
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              color: "white",
              // padding: "4px 8px",
              borderRadius: "4px",
              margin: 1,
            }}
          >
            <Typography variant="h9">
              {getPrice(price, units, prop_type)}
            </Typography>
          </Box>
        </Box>
        <CardContent sx={{ padding: 0, marginTop: 1 }}>
          <Box sx={{ margin: 1 }}>
            <Typography
              gutterBottom
              variant="h8"
              component="div"
              sx={{ fontWeight: "bold", margin: 0, padding: 0 }}
            >
              {getPropertyTitile(listing_type, prop_type, units, size)}
            </Typography>
          </Box>
          <Box
            sx={{
              margin: 1,
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              columnGap: 1,
            }}
          >
            <LocationOnIcon />
            <Typography variant="div" sx={{ color: "text.secondary" }}>
              {landmark}
            </Typography>
          </Box>
        </CardContent>
        </CardActionArea>
      </Card>
    );
  });
}


export function HeaderComponent() {
  const { isAuthinticated, logout } = useContext(AuthContext);
  const [anchorElUser, setanchel] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleOpenUserMenu = (event) => setanchel(event.currentTarget);
  const handleCloseUserMenu = () => setanchel(null);
  const navigate = useNavigate();
  const handleSignUpClick = () => {
    handleCloseUserMenu(); // Close the menu if it was open
    navigate("/signup"); // Redirect to the "/signup" page
  };
  const ReRouteToHomePage = () => {
    navigate("/");
  };
  const ReRouteToSellProperty = () => {
    navigate("/add-property");
  };
  const ReRouteToSignInPage = () => {
    navigate("/signin");
  };

  const ReRouteProfilePage = () => {
    navigate("/profile");
  };

 

  const HandleLogout = () => {
    logout();
    navigate("/");
  };

  const ReRouteToMyProperties =()=>{
    navigate("/my-properties")
  }
  // Handle drawer toggle
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };



  // Drawer content with evenly spaced buttons
  const drawerContent = (
    <Box
      sx={{
        width: 250,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        // justifyContent: "space-between", // Evenly space the list items vertically
        paddingY: 2,
        backgroundColor: "rgb(25, 118, 210)",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: 1,
        }}
      >
        <IconButton onClick={toggleDrawer(false)} sx={{ color: "inherit" }}>
          {" "}
          {/* Close the drawer when clicked */}
          <MenuIcon />
        </IconButton>
      </Box>
      <List
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "white",
        }}
      >
        <ListItem
         
        >
          <ListItemButton onClick={ReRouteToHomePage}>
            <Box  sx={{
            display: "flex",
            direction: "column",
            columnGap: 2,
          }}>
            <Box>
              <HomeIcon />
            </Box>
            <Box>
              <ListItemText primary="Home"  />
            </Box>
            </Box>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={ReRouteToSellProperty} >
          <Box  sx={{
            display: "flex",
            direction: "column",
            columnGap: 2,
          }}>
            <Box>
              <AddIcon/>
            </Box>
            <Box>
            <ListItemText primary="Sell Your Property" />
            </Box>
            </Box>
          </ListItemButton>
        </ListItem>
        {isAuthinticated?
        <ListItem>
        <ListItemButton onClick={ReRouteToMyProperties} >
        <Box  sx={{
          display: "flex",
          direction: "column",
          columnGap: 2,
        }}>
          <Box>
            <PhotoAlbumSharpIcon/>
          </Box>
          <Box>
          <ListItemText primary="My Properties" />
          </Box>
          </Box>
        </ListItemButton>
      </ListItem>:""}
      </List>
    </Box>
  );
  return (
    <Box>
      <AppBar>
        <Toolbar>
          <IconButton sx={{ color: "inherit" }} onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Button
            sx={{ color: "inherit", flexGrow: 1 }}
            onClick={ReRouteToHomePage}
          >
            Asset Experts
          </Button>
          <Box>
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar src="/1000000345.jpg"></Avatar>
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isAuthinticated ? (
                <>
                  <MenuItem key="logout" onClick={HandleLogout}>
                    <Typography sx={{ textAlign: "center" }}>Logout</Typography>
                  </MenuItem>
                  <MenuItem key="profile" onClick={ReRouteProfilePage}>
                    <Typography sx={{ textAlign: "center" }}>
                      Profile
                    </Typography>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem key="signup" onClick={handleSignUpClick}>
                    <Typography sx={{ textAlign: "center" }}>
                      Sign Up
                    </Typography>
                  </MenuItem>
                  <MenuItem key="sigin" onClick={ReRouteToSignInPage}>
                    <Typography sx={{ textAlign: "center" }}>
                      Sign in
                    </Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </Box>
  );
}

function HomePage() {
  const { home_page_data } = useContext(AuthContext);
  const recent_properties = home_page_data.recent_properties || {};
  const sell_props = recent_properties.sell_properties || [];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        rowGap: 5,
      }}
    >
      <Box>
        <HeaderComponent />
      </Box>
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
        {GenerateCards(sell_props)}
      </Box>
      <Box>
        <FloatingActionButton />
      </Box>
    </Box>
  );
};

export default HomePage;
