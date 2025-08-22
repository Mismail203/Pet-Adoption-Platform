import React, { useState } from "react";
import "../userApp.css";

const ResetPassword = ({ email, goBack, goLogin }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (newPassword.length < 6) {
      setMessage("❌ Password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "https://node-api-wlq1.onrender.com/api/users/reset-password",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("✅ Your password has been reset successfully!");
        setNewPassword("");
        setConfirmPassword("");
        goLogin();
      } else {
        setMessage("❌ " + (data.message || data.error));
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Something went wrong");
    }
  };

  return (
    <div className="reset-container">
      <h2 className="reset-title">Reset Password</h2>
      {message && <p className="reset-message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          className="reset-input"
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <input
          className="reset-input"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          style={{ marginBlock: "10px" }}
          type="submit"
          className="btn-primary"
        >
          Enter New Password
        </button>
      </form>

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

export default ResetPassword;
