import React, { useState } from "react";
import "../userApp.css";

const LoginForm = ({ goRegister, goForgotPassword, onLoginSuccess }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "email" ? value.toLowerCase() : value, // email always lowercase
    });
  };

// User/Auth/login.js
const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");

  try {
    const response = await fetch(
      "https://node-api-wlq1.onrender.com/api/users/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setForm({ email: "", password: "" });
      
      console.log("Login successful - Email:", form.email);
      
      // Pass the email to onLoginSuccess - FIXED: pass the actual email
      onLoginSuccess(form.email); // This was the main issue
    } else {
      setMessage("❌ " + (data.message || data.error));
    }
  } catch (error) {
    console.error(error);
    setMessage("❌ Something went wrong. Check your internet connection.");
  }
};

  return (
    // <div className="cont">
    <div className="login-container1">
      <h2 className="login-title">Login</h2>
      {message && <p className="login-message">{message}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="login-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="login-input"
        />
        <div className="login-buttons">
          <button type="submit" className="btn-primary">
            Login
          </button>
          <button type="button" onClick={goRegister} className="btn-secondary">
            SignUp
          </button>
        </div>
        <button
          type="button"
          onClick={goForgotPassword}
          className="forgot-password-btn"
        >
          Forgot Password?
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
