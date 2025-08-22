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
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
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
    }
  }, [location.pathname]);

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

        {page === "register" && (
          <RegisterForm goLogin={() => setPage("login")} />
        )}

        {page === "login" && (
          <LoginForm
            goRegister={() => setPage("register")}
            goForgotPassword={() => setPage("forgot")}
            onLoginSuccess={() => { setPage("dashboard"); navigate("/app/dashboard"); }}
          />
        )}

        {page === "forgot" && (
          <ForgotPassword
            setEmail={(email) => setUserEmail(email)}
            goVerifyOtp={() => setPage("verify")}
            goLogin={() => setPage("login")}
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
            goLogin={() => setPage("login")}
            goBack={() => setPage("forgot")}
          />
        )}

        {page === "dashboard" && (
          <DashboardApp />
        )}
      </div>
    </div>
  );
}

export default App;
