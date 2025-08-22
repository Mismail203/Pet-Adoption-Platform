import React, { useState } from "react";
import "../userApp.css";

const RegisterForm = ({ goLogin }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "email" ? value.toLowerCase() : value, // email always lowercase
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (form.password.length < 6) {
      setMessage("❌ Password must be at least 6 characters long");
      return;
    }

    try {
      const response = await fetch(
        "https://node-api-wlq1.onrender.com/api/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form), // already lowercase email
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("✅ " + data.message);
        setForm({ name: "", email: "", password: "" });
        goLogin();
      } else {
        setMessage("❌ " + (data.message || data.error));
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Something went wrong");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      {message && <p className="register-message">{message}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <input
          className="register-input"
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="register-input"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="register-input"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <div className="register-buttons">
          <button type="submit" className="btn-primary">
            Register
          </button>
          <button type="button" onClick={goLogin} className="btn-secondary">
            I already have an account
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
