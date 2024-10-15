import {
  Box,
  Button,
  capitalize,
  Card,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material";
import { HeaderComponent } from "./login/home_page";
import {  useNavigate, useParams } from "react-router-dom";
import { BackendBaseUrl, AuthContext } from "./global_varibels";
import { useContext, useEffect, useState } from "react";
function ProcessPorpertyDetails(property_details) {
  const navigate=useNavigate()
  console.log("property details", property_details);
  const property_id=property_details.p_id
  const {isAuthinticated,user_props}=useContext(AuthContext)
  let show_edit_button=false
  console.log("user data",user_props
  )
  if (isAuthinticated && user_props) {
    for (const obj of user_props) {
      const obj_prop_id=obj.p_id
      if (property_id === obj_prop_id) {
        show_edit_button=true
        break
      }
    }
  }
  console.log("show_edit_button",show_edit_button)
  const deatils_to_show = {
    p_type: property_details.p_type || "None",
    facilitated_by: property_details.facilitated_by || "None",
    unit: property_details.unit || "None",
    prop_name: property_details.prop_name || "None",
    size: property_details.size || "None",
    price: property_details.price || "None",
    dimension: property_details.dimension || "None",
    boundary_wall: property_details.boundary_wall || "None",
    num_of_open_roads: property_details.num_of_open_roads || "None",
    state: property_details.state || "None",
    district: property_details.district || "None",
    location: property_details.location || "None",
    landmark: property_details.landmark || "None",
    pincode: property_details.pincode || "None",
    survey_number: property_details.survey_number || "None",
    facing: property_details.facing || "None",
    apr_road: property_details.apr_road || "None",
    doc_number: property_details.doc_number || "None",
    med_name: property_details.med_name || "None",
    med_num: property_details.med_num || "None",
    // ad_info: property_details.ad_info || "None",
  };
  console.log("details to show", deatils_to_show);
  const prop_images = property_details.images;
  //   prop_images.map((img_obj)=>{console.log("url",img_obj.img_url)})
  const image_to_show_in_card = prop_images ? prop_images[0].img_url : "";
  console.log("image_to_show_in_card", image_to_show_in_card);
  const ReRouteToUpdateForm=(property_data)=>{
    console.log("re route to update form")
    navigate(`/update-property`, {
      state: { property_data }, // Pass the property details in state only
    });
    
  }

  return (
    <Box
      sx={{
        margin: { xs: 2, sm: 5 },
        border: "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "60%" },
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "start",
        }}
      >
        <Typography variant="h5">
          {capitalize(property_details.p_type)} For Sale
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "100%", sm: "40%" },
        }}
      >
        {prop_images ? (
          <Card>
            <CardMedia sx={{ height: 350 }} image={image_to_show_in_card} />
          </Card>
        ) : (
          ""
        )}
      </Box>
      <Box
        sx={{
          margin: 2,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          columnGap: 2,
          width: { xs: "100%", sm: "40%" },
          justifyContent: "center",
        }}
      >
        {prop_images
          ? prop_images.map((img_obj) => (
              <Card key={img_obj.img_id}>
                <CardMedia
                  sx={{ height: 50, width: 50 }}
                  image={img_obj.img_url}
                />
              </Card>
            ))
          : ""}
      </Box>
      <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
        <Paper elevation={5}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              rowGap: 2,
              padding: 2,
              justifyItems: "revert",
            }}
          >
            {Object.entries(deatils_to_show).map(([key, value]) => (
              <Box sx={{ display: "flex", flexDirection: "row" }} key={key}>
                <Box>
                  <Typography sx={{ fontWeight: "bold" }}>{key}:</Typography>
                </Box>
                <Box>
                  <Typography>{value}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h5">Additional Information :</Typography>
        </Box>
        <Box sx={{ border: "1px solid black", padding: 1 }}>
          <Typography>{property_details.ad_info}</Typography>
        </Box>
        {show_edit_button?
        <Box  sx={{display:"flex",flexDirection:"row",justifyContent:"flex-end", margin:2}}>
          <Card>
            <Button onClick={() => ReRouteToUpdateForm(property_details)}>
              Edit Property
            </Button>
          </Card>
        </Box>:""}
      </Box>
    </Box>
  );
}

// export function ShowPropertyDetails() {
//   const { propertyId } = useParams();
//   console.log("propertyId", propertyId);
//   const property_data = async (e) => {
//     try{
//     const backend_url = `${BackendBaseUrl}/get-property?prop_id=${propertyId}`;
//     const response = await fetch(backend_url, {
//       method: "Get",
//       headers: {
//         "Content-Type": "application/json",
//       }
//     });
//     const response_data=await response.json()
//     console.log("response data",response_data)
//     if (response_data.status=="success") {
//         console.log("processing for showing details")
//         return response_data.prop_details
//     }
//     else {
//         console.log("error in fetching data")
//     }
// }
// catch (error){
//     console.log("error", error)
// }
//   };
//   const response_data=property_data()
//   console.log("prop details",response_data)
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         rowGap: 5,
//       }}
//     >
//       <Box>
//         <HeaderComponent />
//       </Box>
//       <Box>
//         {response_data?<ProcessPorpertyDetails />:""}
//       </Box>
//     </Box>
//   );
// }

export function ShowPropertyDetails() {
  const { propertyId } = useParams(); // Get the property ID from the URL
  const [propertyDetails, setPropertyDetails] = useState(null); // State to store property details
  const [loading, setLoading] = useState(true); // State for loading status

  // Fetch property details when component mounts
  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const backend_url = `${BackendBaseUrl}/get-property?prop_id=${propertyId}`;
        const response = await fetch(backend_url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const response_data = await response.json();
        if (response_data.status === "success") {
          setPropertyDetails(response_data.prop_details); // Update state with property details
        } else {
          console.error("Error in fetching data");
        }
      } catch (error) {
        console.error("Error fetching property details:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchPropertyData();
  }, [propertyId]);

  // Conditional rendering based on the loading state
  if (loading) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 5 }}>
        <Typography variant="h6">Loading Property Details...</Typography>
      </Box>
    );
  }

  // If propertyDetails is fetched, show the property details
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
      <Box>
        {propertyDetails ? (
          <ProcessPorpertyDetails {...propertyDetails} />
        ) : (
          <Typography
            variant="h5"
            sx={{
              alignContent: "center",
              marginLeft: { xs: "30%", sm: "40%" },
              marginTop: 30,
            }}
          >
            Property not found.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
