import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RegisterForm from "./Auth/register.js";
import LoginForm from "./Auth/login.js";
import ForgotPassword from "./Auth/ForgotPassword.js";
import VerifyOtp from "./Auth/VerifyOtp.js";
import ResetPassword from "./Auth/ResetPassword.js";
import DashboardApp from "../Dashboard/App";
import "./userApp.css";

function App() {
  const [page, setPage] = useState("login");
  const [userEmail, setUserEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserData(parsedData);
      console.log("User data loaded from storage:", parsedData);
    }

    // Handle routing based on URL path
    if (location.pathname.startsWith("/app/logout")) {
      setPage("login");
    } else if (
      location.pathname.startsWith("/app/dashboard") ||
      location.pathname.startsWith("/app/pets") ||
      location.pathname.startsWith("/app/treatment")
    ) {
      setPage("dashboard");
    } else if (location.pathname.startsWith("/app/login")) {
      setPage("login");
    } else if (location.pathname.startsWith("/app/register")) {
      setPage("register");
    } else if (location.pathname.startsWith("/app/forgot-password")) {
      setPage("forgot");
    }
  }, [location.pathname]);

  // Function to fetch user ID by email
  const fetchUserIdByEmail = async (email) => {
    try {
      setIsLoading(true);
      console.log("Fetching user ID for email:", email);
      
      const response = await fetch("https://node-api-wlq1.onrender.com/api/users/get-all-users");
      const data = await response.json();
      
      console.log("API Response:", data);
      
      if (response.ok) {
        // Find user with matching email
        const user = data.find(user => user.email === email.toLowerCase());
        
        if (user) {
          console.log("User found:", user);
          const userData = { id: user._id, email: user.email };
          
          // Store in localStorage
          localStorage.setItem("userData", JSON.stringify(userData));
          setUserData(userData);
          
          return userData;
        } else {
          console.error("User not found with email:", email);
          console.log("Available emails:", data.map(u => u.email));
          return null;
        }
      } else {
        console.error("Failed to fetch users:", data.message);
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle login success
  const handleLoginSuccess = async (email) => {
    console.log("Login successful, fetching user data for:", email);
    
    if (!email) {
      console.error("Email is undefined!");
      alert("Login error: Email not received");
      return;
    }
    
    const userData = await fetchUserIdByEmail(email);
    
    if (userData) {
      // Update URL and show dashboard
      navigate("/app/dashboard");
      setPage("dashboard");
    } else {
      alert("Failed to fetch user data. Please try again.");
    }
  };

  return (
    <div className="cont">
      <div
        style={{
          textAlign: "center",
          height: "100%",
          margin: "0px",
          padding: "0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ margin: "0px", padding: "20px", color: "white" }}>
          Pet Adoption
        </h1>

        {isLoading && <div className="loading">Loading user data...</div>}

        {page === "register" && (
          <RegisterForm 
            goLogin={() => {
              setPage("login");
              navigate("/app/login");
            }} 
          />
        )}

        {page === "login" && (
          <LoginForm
            goRegister={() => {
              setPage("register");
              navigate("/app/register");
            }}
            goForgotPassword={() => {
              setPage("forgot");
              navigate("/app/forgot-password");
            }}
            onLoginSuccess={(email) => handleLoginSuccess(email)}
          />
        )}

        {page === "forgot" && (
          <ForgotPassword
            setEmail={(email) => setUserEmail(email)}
            goVerifyOtp={() => setPage("verify")}
            goLogin={() => {
              setPage("login");
              navigate("/app/login");
            }}
          />
        )}

        {page === "verify" && (
          <VerifyOtp
            email={userEmail}
            goResetPassword={() => setPage("reset")}
            goBack={() => setPage("forgot")}
          />
        )}

        {page === "reset" && (
          <ResetPassword
            email={userEmail}
            goLogin={() => {
              setPage("login");
              navigate("/app/login");
            }}
            goBack={() => setPage("forgot")}
          />
        )}

        {page === "dashboard" && (
          <DashboardApp userData={userData} />
        )}
      </div>
    </div>
  );
}

export default App;