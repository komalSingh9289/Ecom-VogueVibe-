import { createContext, useContext, useEffect, useState } from "react";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize token from localStorage
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null); // Keep user as null initially

  // Store the token in localStorage and update the token state
  const storeTokenInLocal = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken); // Update token state
  };

  // Determine if the user is logged in based on the token's presence
  const isLoggedIn = !!token;

  // Logout function to clear the token from both state and localStorage
  const LogoutUser = () => {
    setToken(null); // Clear token state
    localStorage.removeItem("token"); // Remove token from localStorage
    setUser(null); // Clear user state
  };

  // JWT authentication - to get currently logged in user data
  const userAuthentication = async () => {
    if (!token) return; // Avoid calling the API if no token is present

    try {
      const response = await fetch(`http://localhost:5000/api/users/logData`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Logged in user data:", data);
        setUser(data.userData);
      } else {
        // If unauthorized (e.g., invalid token), log out the user
        if (response.status === 401) {
          console.log("Token expired or invalid. Logging out...");
          LogoutUser();
        }
      }
    } catch (error) {
      console.log("Error fetching user data", error);
    }
  };

  // Fetch user data whenever the token changes
  useEffect(() => {
    userAuthentication();
  }, [token]); // Ensure token is a dependency

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLocal, LogoutUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const authContextVal = useContext(AuthContext);

  if (!authContextVal) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return authContextVal;
};
