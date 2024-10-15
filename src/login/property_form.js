import {
  Alert,
  Button,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import { BackendBaseUrl, AuthContext } from "../global_varibels";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { HeaderComponent } from "./home_page";
import { useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";

export function SellPropertyForm({ form_fields, update }) {
  const { user_data } = useContext(AuthContext);
  const navigate = useNavigate()
  const [erros, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose=()=>{
        setOpen(false)
    }

  const ReRouteToPropertyPage=(prop_id)=>{
    navigate(`/property/${prop_id}`)
  }
  // const
  const validateForm = () => {
    const newErrors = {};
    // Required fields to validate
    const requiredFields = [
      "p_type",
      "facilitated_by",
      "unit",
      "size",
      "price",
      "pincode",
      "boundary_wall",
      "state",
      "district",
      "location",
    ];

    requiredFields.forEach((field) => {
      if (!form_data[field]) {
        newErrors[field] = "This field is required";
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };
  const [form_data, setFormData] = useState({ ...form_fields });
  // console.log("Form data in the satat", form_data)
  const handleChangeFormData = (event) => {
    const { name, value } = event.target;
    console.log(name, ":", value);
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  const property_types = {
    plot: "Plot",
    flat: "Flat",
    land: "Land",
    commercial: "Commercial",
    project: "Project",
  };

  const facilitated_by_dropdown = {
    owner: "Owner",
    agent: "Agent",
    "asset experts": "Asset Experts",
  };
  const units_dropdown = {
    sqyd: "Sqyd",
    sqft: "Sqft",
    acre: "Acre",
    cent: "Cent",
  };
  const boundary_wall_drop_down = {
    true: "Yes",
    false: "No",
  };
  const state_dropdown = {
    "andhra pradesh": "Andhra Pradesh",
  };
  const district_dropdown = {
    visakhapatnam: "Visakhapatnam",
    vizynagram: "vizynagram",
    srikakulam: "srikakulam",
    "east godavari": "East Godvari",
  };
  const location_dropdown = {
    visakhapatnam: ["mvp", "maddilapalem", "gopalapatnam", "chinna musdiwada"],
    vizynagram: ["ramak", "sivatuporam", "ramnagar"],
    srikakulam: ["frankpalem", "trivatupuram", "jammalmadugu"],
    "east godavari": ["ramavaram", "arjunapalem", "kommpalii"],
  };
  const num_of_open_roads = [1, 2, 3, 4, 5];
  const facing_drop_down = ["north", "south", "east", "west", "north east"];
  const handle_form_submission = async (e) => {
    try {
      e.preventDefault();
      if (!validateForm()) {
        console.log("form has erros", erros);
        return;
      }
      console.log("user data", user_data);
      const parsedData = {
        ...form_data,
        size: parseInt(form_data.size, 10), // Convert size to integer
        price: parseFloat(form_data.price), // Convert price to float
        pincode: parseInt(form_data.pincode, 10), // Convert pincode to integer
        survey_number: parseInt(form_data.survey_number, 10), // Convert survey_number to integer
        num_of_open_roads: parseInt(form_data.num_of_open_roads, 10), // Convert num_of_open_roads to integer
        boundary_wall: JSON.parse(form_data.boundary_wall), // Convert boundary_wall to boolean
        med_num: form_data.med_num ? parseInt(form_data.med_num, 10) : null, // Convert mediator number to integer if available
      };
      parsedData["cont_user_id"] = user_data.id;
      console.log("form data", parsedData);
      const backend_route_to_add_property = `${BackendBaseUrl}/property`;
      let response;
      if (update === true) {
        console.log("updating the property");
        response = await fetch(backend_route_to_add_property, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parsedData),
        });
      } else {
        response = await fetch(backend_route_to_add_property, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parsedData),
        });
      }

      const response_data = await response.json();
      console.log("response data", response_data);
      if (response_data.status === "success") {
        console.log("property added/Updated successfuly");
        setMessageType("success")
        setMessage(response_data.message)
        setOpen(true)
        const sell_prop_data=response_data.sell_property
        ReRouteToPropertyPage(sell_prop_data.p_id)
      } else {
        console.log("failed to add the property");
        console.log("response data", response_data);
        setMessageType("error")
        setMessage(response_data.message)
        setOpen(true)
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log("forma data in sell prop form", form_data);
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        alignContent: "center",
        height: "100vh",
        // overflowY: "auto", // Allows scrolling on small screens
        padding: 2,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          width: "100%",
          maxWidth: 600,
          padding: 2,
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          // height:"100vh",
          rowGap: "20px",
          // marginBottom: 2
          // overflowY: "auto", // Allows scrolling on small screens
          // maxHeight:"90vh"
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {!update ? "Add Property For Sale" : "Update Property"}
        </Typography>
        <FormGroup
          sx={{
            //   height: "400px",
            maxWidth: "100%",
            display: "Grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            rowGap: "20px",
            columnGap: "20px",
            justifyContent: "space-between",
            // alignContent:"center"
            //   padding:8
          }}
        >
          <TextField
            id="property_name"
            label="Property Name"
            variant="outlined"
            name="prop_name"
            value={form_data.prop_name}
            onChange={handleChangeFormData}
          />
          <FormControl variant="outlined" error={!!erros.p_type}>
            <InputLabel required id="property-type">
              Property Type
            </InputLabel>
            <Select
              labelId="property-type"
              id="property-type-selector"
              name="p_type"
              label="Property Type"
              onChange={handleChangeFormData}
              value={form_data.p_type}
            >
              {Object.entries(property_types).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel required id="facilitated_by">
              Facilitated By
            </InputLabel>
            <Select
              labelId="facilitated_by"
              id="facilitated_by_selector"
              name="facilitated_by"
              error={!!erros.facilitated_by}
              label="Facilitated By"
              onChange={handleChangeFormData}
              value={form_data.facilitated_by}
            >
              {Object.entries(facilitated_by_dropdown).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel required id="unit">
              Unit
            </InputLabel>
            <Select
              labelId="unit"
              id="units_selector"
              name="unit"
              label="Unit"
              error={!!erros.unit}
              onChange={handleChangeFormData}
              value={form_data.unit}
            >
              {Object.entries(units_dropdown).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            required
            id="size"
            label="Size"
            variant="outlined"
            type="number"
            name="size"
            error={!!erros.size}
            value={form_data.size}
            onChange={handleChangeFormData}
          />
          <TextField
            required
            id="price"
            label="Price/unit"
            variant="outlined"
            type="number"
            name="price"
            error={!!erros.price}
            value={form_data.price}
            onChange={handleChangeFormData}
          />
          <TextField
            id="dimension"
            label="Dimension"
            variant="outlined"
            type="text"
            name="dimension"
            value={form_data.dimension}
            onChange={handleChangeFormData}
          />
          <FormControl variant="outlined">
            <InputLabel required id="boundary_wall">
              Boundary Wall
            </InputLabel>
            <Select
              labelId="boundary_wall"
              id="boundary_wall_selec"
              name="boundary_wall"
              label="Boundary Wall"
              error={!!erros.boundary_wall}
              onChange={handleChangeFormData}
              value={form_data.boundary_wall}
            >
              {Object.entries(boundary_wall_drop_down).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel id="num_of_open_roads">Number Of Open Roads</InputLabel>
            <Select
              labelId="num_of_open_roads"
              id="num_of_open_roads_selec"
              name="num_of_open_roads"
              label="Number Of Open Roads"
              onChange={handleChangeFormData}
              value={form_data.num_of_open_roads}
            >
              {Object.entries(num_of_open_roads).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel required id="state">
              State
            </InputLabel>
            <Select
              labelId="state"
              id="state_selec"
              name="state"
              label="State"
              error={!!erros.state}
              onChange={handleChangeFormData}
              value={form_data.state}
            >
              {Object.entries(state_dropdown).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel required id="district">
              District
            </InputLabel>
            <Select
              labelId="district"
              id="district_selec"
              name="district"
              error={!!erros.district}
              label="District"
              onChange={handleChangeFormData}
              value={form_data.district}
            >
              {Object.entries(district_dropdown).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel required id="location">
              Location
            </InputLabel>
            <Select
              labelId="location"
              id="location_selec"
              name="location"
              label="Location"
              error={!!erros.location}
              onChange={handleChangeFormData}
              value={form_data.location}
            >
              {form_data.district && location_dropdown[form_data.district]
                ? location_dropdown[form_data.district].map((key) => (
                    <MenuItem key={key} value={key}>
                      {key}
                    </MenuItem>
                  ))
                : ""}
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            id="landmark"
            label="Landmark"
            name="landmark"
            value={form_data.landmark}
            type="text"
            onChange={handleChangeFormData}
          />
          <TextField
            required
            variant="outlined"
            id="pincode"
            label="Pincode"
            name="pincode"
            value={form_data.pincode}
            type="number"
            error={!!erros.pincode}
            onChange={handleChangeFormData}
          />
          <TextField
            variant="outlined"
            id="survey_number"
            label="Survey Number"
            name="survey_number"
            value={form_data.survey_number}
            type="number"
            onChange={handleChangeFormData}
          />
          <FormControl variant="outlined">
            <InputLabel id="facing">Facing</InputLabel>
            <Select
              labelId="facing"
              id="facing_selec"
              name="facing"
              label="Facing"
              onChange={handleChangeFormData}
              value={form_data.facing}
            >
              {facing_drop_down.map((key) => (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel id="approach_road">Approach Road</InputLabel>
            <Select
              labelId="approach_road"
              id="approach_road_selec"
              name="apr_road"
              label="Approach Road"
              onChange={handleChangeFormData}
              value={form_data.apr_road}
            >
              {facing_drop_down.map((key) => (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="doc_number"
            name="doc_number"
            value={form_data.doc_number}
            label="Document Number"
            type="number"
            onChange={handleChangeFormData}
          />
          <TextField
            id="med_name"
            name="med_name"
            value={form_data.med_name}
            label="Mediator Name"
            type="text"
            onChange={handleChangeFormData}
          />
          <TextField
            id="med_num"
            name="med_num"
            value={form_data.med_num}
            label="Mediator Number"
            type="number"
            onChange={handleChangeFormData}
          />
        </FormGroup>

        <Box>
          <TextField
            id="ad_info"
            name="ad_info"
            value={form_data.ad_info}
            label="Property Information"
            type="text"
            onChange={handleChangeFormData}
            sx={{ width: "100%" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={handle_form_submission}
            variant="contained"
            sx={{
              width: "100%",
              margin: 1,
            }}
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </Paper>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={messageType} onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

function PropertyForm() {
  const { isAuthinticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const ReRouteToSignInPage = () => {
    navigate("/signin");
  };
  const form_fields = {
    p_type: "",
    facilitated_by: "",
    unit: "",
    prop_name: "",
    size: "",
    price: "",
    dimension: "",
    boundary_wall: "",
    num_of_open_roads: "",
    state: "",
    district: "",
    location: "",
    landmark: "",
    pincode: "",
    survey_number: "",
    facing: "",
    apr_road: "",
    doc_number: "",
    med_name: "",
    med_num: "",
    ad_info: "",
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: 7 }}>
      <Box>
        <HeaderComponent />
      </Box>
      <Box>
        {isAuthinticated ? (
          <SellPropertyForm form_fields={form_fields} update={false} />
        ) : (
          <Box
            sx={{ display: "flex", justifyContent: "center", marginTop: 30 }}
          >
            <Button onClick={ReRouteToSignInPage} variant="text">
              <Typography variant="h3">Please login</Typography>
            </Button>
          </Box>
        )}
      </Box>
      
    </Box>
  );
}

export default PropertyForm;
