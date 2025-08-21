import React, { useState } from "react";
import RegisterForm from "./Auth/register.js";
import LoginForm from "./Auth/login.js";
import ForgotPassword from "./Auth/ForgotPassword.js";
import VerifyOtp from "./Auth/VerifyOtp.js";
import ResetPassword from "./Auth/ResetPassword.js";
import Dashboard from "./Dashboard/dashboard.js"; // ✅ Import Dashboard
import "./userApp.css";

function App() {
  const [page, setPage] = useState("login");
  const [userEmail, setUserEmail] = useState("");

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
            onLoginSuccess={() => setPage("dashboard")} // ✅ Redirect to Dashboard
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
          <Dashboard goLogout={() => setPage("login")} /> // ✅ Option to logout
        )}
      </div>
    </div>
  );
}

export default App;
