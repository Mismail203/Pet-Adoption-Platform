import React, { useState } from "react";
import "../userApp.css";

const VerifyOtp = ({ email, goResetPassword, goBack }) => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async () => {
    setMessage("");

    try {
      const response = await fetch(
        "https://node-api-wlq1.onrender.com/api/users/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ OTP verified!");
        goResetPassword();
      } else {
        setMessage("❌ " + (data.message || data.error));
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Something went wrong");
    }
  };

  return (
    <div className="verify-container">
      <h2 className="verify-title">Verify OTP</h2>
      {message && <p className="verify-message">{message}</p>}

      <input
        className="verify-input"
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
      />

      <button
        style={{ marginBlock: "10px" }}
        type="button"
        onClick={handleVerify}
        className="btn-primary"
      >
        Verify OTP
      </button>

      {/* Back button */}
      <button
        type="button"
        onClick={goBack}
        className="btn-secondary btnn_back"
      >
        &larr; Back
      </button>
    </div>
  );
};

export default VerifyOtp;
