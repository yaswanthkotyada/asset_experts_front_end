
import LoginPage from "./login/login_page";
import HomePage from "./login/home_page";
import SignInPage from "./login/sign_in";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { AuthProvider  } from "./global_varibels";
import ManageUserProfile from "./login/profile_page";
import PropertyForm from "./login/property_form";
import { MyProperties } from "./login/my_properties";
import { ShowPropertyDetails } from "./show_property_details";
import { UpdateProperty } from "./login/update_property";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signup" element={<LoginPage/>}/>
        <Route path="/signin" element={<SignInPage/>} />
        <Route path="/profile" element={<ManageUserProfile/>} />
        <Route path="/add-property" element={<PropertyForm/>} />
        <Route path="/my-properties" element={<MyProperties/>} />
        <Route path="/property/:propertyId" element={<ShowPropertyDetails/>} />
        <Route path="/update-property" element={<UpdateProperty/>}/>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
