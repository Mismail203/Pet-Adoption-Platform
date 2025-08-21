import React, { useState } from "react";
import "../userApp.css";

const ForgotPassword = ({ goVerifyOtp, setEmail, goLogin }) => {
  const [email, setLocalEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOtp = async () => {
    setMessage("");

    try {
      const response = await fetch(
        "https://node-api-wlq1.onrender.com/api/users/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.toLowerCase() }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ OTP sent to your email!");
        setEmail(email.toLowerCase());
        goVerifyOtp();
      } else {
        setMessage("❌ " + (data.message || data.error));
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Something went wrong");
    }
  };

  return (
    <div className="forgot-container">
      <h2 className="forgot-title">Forgot Password</h2>
      {message && <p className="forgot-message">{message}</p>}

      <input
        className="forgot-input"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setLocalEmail(e.target.value.toLowerCase())}
        required
      />

      <button
        style={{ marginBlock: "10px" }}
        type="button"
        onClick={handleSendOtp}
        className="btn-primary"
      >
        Send OTP
      </button>

      {/* Back button */}
      <button
        type="button"
        onClick={goLogin}
        className="btn-secondary btnn_back"
      >
        &larr; Back
      </button>
    </div>
  );
};

export default ForgotPassword;
