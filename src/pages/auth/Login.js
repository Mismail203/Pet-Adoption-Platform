import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@petadopt.com');
  const [password, setPassword] = useState('Admin@123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://stripe.faithdiscipline.org.uk/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();

      if (data.status === 'success') {
        localStorage.setItem('authToken', data.data.id);
        localStorage.setItem('userData', JSON.stringify(data.data));
        onLogin();
        navigate('/dashboard');
      } else {
        throw new Error(data.message || 'Authentication failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-section">
          <img 
            src="https://bfpa.org/wp-content/uploads/2020/04/logo_2019_inverse.png" 
            alt="PetAdopt Logo" 
            className="logo"
          />
          <h1 style={{ color: '#ef0056' }}>PetAdopt Admin</h1>
          <hr style={{ border: '1px solid #ccc', margin: '20px 0' }} />
          <p>Manage adoptions, pets, and users</p>
          <h6>admin@petadopt.com</h6>
          <h6>Admin@123</h6>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              {error}
              {error.includes('credentials') && (
                <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>
                  Hint: Try 'admin@petadopt.com' with 'Admin@123'
                </p>
              )}
            </div>
          )}

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
            style={{ backgroundColor: loading ? '#ccc' : '#ef0056' }}
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

        <div className="security-tips">
          <p>🔒 Always log out after use</p>
          <p>🛡️ Enable 2FA in settings</p>
        </div>
      </div>
    </div>
  );
};

export default Login;