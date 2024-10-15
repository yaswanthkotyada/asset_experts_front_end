import { SellPropertyForm } from "./property_form";
import { HeaderComponent } from "./home_page";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

export function UpdatePropertyData(property_data) {
    console.log("property data", property_data)
    return (
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: 7 }}>
            <Box>
                <HeaderComponent/>
            </Box>
            <Box>
            <SellPropertyForm form_fields={property_data} update={true} />
            </Box>
        </Box>

    )
}


export function UpdateProperty(){
    const location=useLocation()
    const property_details = location.state?.property_data;
    console.log("property details", property_details)
    return (
        <Box>
            {UpdatePropertyData(property_details)}
        </Box>
    )
}


