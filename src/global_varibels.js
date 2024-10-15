import { createContext, useState } from "react";

export const BackendBaseUrl = "https://b24bbb80-039b-49b4-994f-bf9f221f37d4-00-1ydgrms3iookv.sisko.replit.dev";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthinticated, setAuthintication] = useState(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    try {
        return storedAuth ? JSON.parse(storedAuth) : false;
    } catch (error) {
        console.error("Failed to parse isAuthenticated:", error);
        return false;
    }
  });

  const [user_data, UpdateUserData] = useState(() => {
    const storedUserdata = localStorage.getItem("user_data");
    try {
        return storedUserdata ? JSON.parse(storedUserdata) : {};
    } catch (error) {
        console.error("Failed to parse user_data:", error);
        return {};
    }
  });
  const [user_props, UpdateUserProps] = useState(() => {
    const storedUserProps = localStorage.getItem("user_props");
    console.log("stored user props",storedUserProps)

    try {
        return storedUserProps ? JSON.parse(storedUserProps) : [];
    } catch (error) {
        console.error("Failed to parse user_props:", error);
        return [];
    }
  });

  const [home_page_data, setHomePageData] = useState(() => {
    const stored_Home_page_Data = localStorage.getItem("home_page_data");
    try {
        return stored_Home_page_Data ? JSON.parse(stored_Home_page_Data) : {};
    } catch (error) {
        console.error("Failed to parse home_page_data:", error);
        return {};
    }
  });

  const GetHomePageData = async (e) => {
    try {
      console.log("sending request for home page data");
      const response = await fetch(`${BackendBaseUrl}/home`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response_data = await response.json();
      console.log("home_page_data", response_data);
      if (response.ok) {
        setHomePageData(response_data);
        localStorage.setItem("home_page_data", JSON.stringify(response_data));
        console.log("home page data has been updayed to the state");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const login = () => {
    setAuthintication(true);
    GetHomePageData();
    localStorage.setItem("isAuthenticated", JSON.stringify(true));
  };

  const logout = () => {
    setAuthintication(false);
    UpdateUserData({});
    UpdateUserProps([]);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user_data");
    localStorage.removeItem("user_props");
    console.log("home page data removed successfully");
    console.log("user props",user_props)
  };

  const UpdateUser = (data) => {
    console.log("data to update:", data);
    const updatedUserData = {
      ...user_data,
      ...data,
    };
    UpdateUserData(updatedUserData);
    console.log("user_data in state:", user_data);
    localStorage.setItem("user_data", JSON.stringify(updatedUserData));
  };

  const UpdateProperties = (data) => {
    console.log("data to update props:", data);
    console.log("user props in the state", user_props);
    const updatedUserData = [
      ...user_props,
      ...data,
    ];
    console.log("updated user props", updatedUserData);
    UpdateUserProps(updatedUserData);
    localStorage.setItem("user_props", JSON.stringify(updatedUserData));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthinticated,
        login,
        logout,
        home_page_data,
        user_data,
        UpdateUser,
        user_props,
        UpdateProperties,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
