import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {  // Destructure onLogin from props
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (email === 'admin@petadopt.com' && password === 'Admin@123') {
        localStorage.setItem('authToken', 'admin');
        onLogin();
        navigate('/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo Section */}
        <div className="logo-section">
          <img 
            src="../../../public/logo.png" 
            alt="PetAdopt Logo" 
            className="logo"
          />
          <h1>PetAdopt Admin</h1>
          <p>Manage adoptions, pets, and users</p>
          <h5>admin@petadopt.com</h5>
          <h5>Admin@123</h5>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="input-group">
            <Mail size={18} className="input-icon" />
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <Lock size={18} className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
              type="button" 
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader size={18} className="spinner" />
                Authenticating...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Security Tips */}
        <div className="security-tips">
          <p>🔒 Always log out after use</p>
          <p>🛡️ Enable 2FA in settings</p>
        </div>
      </div>
    </div>
  );
};

export default Login;