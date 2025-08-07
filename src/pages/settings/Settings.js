import React, { useState } from 'react';
import { 
  Lock, 
  Image, 
  Mail, 
  CreditCard, 
  Shield, 
  Clock,
  Database,
  Sun,
  Moon
} from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [platformName, setPlatformName] = useState('PetAdopt');
  const [logo, setLogo] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [enable2FA, setEnable2FA] = useState(false);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
    // API call to save settings
  };

  return (
    <div className="settings-page">
      <h1>Platform Settings</h1>
      
      <div className="settings-tabs">
        <button 
          className={activeTab === 'general' ? 'active' : ''}
          onClick={() => setActiveTab('general')}
        >
          <Sun size={16} /> General
        </button>
        <button 
          className={activeTab === 'security' ? 'active' : ''}
          onClick={() => setActiveTab('security')}
        >
          <Shield size={16} /> Security
        </button>
        <button 
          className={activeTab === 'email' ? 'active' : ''}
          onClick={() => setActiveTab('email')}
        >
          <Mail size={16} /> Email
        </button>
      </div>

      <div className="settings-content">
        {activeTab === 'general' && (
          <div className="settings-section">
            <h2><Image size={18} /> Branding</h2>
            <div className="form-group">
              <label>Platform Name</label>
              <input
                type="text"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Logo</label>
              <input type="file" accept="image/*" onChange={handleLogoUpload} />
              {logo && <img src={logo} alt="Logo Preview" className="logo-preview" />}
            </div>
            <div className="form-group">
              <label>Theme</label>
              <div className="theme-toggle">
                <button 
                  className={!darkMode ? 'active' : ''}
                  onClick={() => setDarkMode(false)}
                >
                  <Sun size={16} /> Light
                </button>
                <button 
                  className={darkMode ? 'active' : ''}
                  onClick={() => setDarkMode(true)}
                >
                  <Moon size={16} /> Dark
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="settings-section">
            <h2><Lock size={18} /> Admin Security</h2>
            <div className="form-group">
              <label>Change Admin Password</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="New password"
              />
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={enable2FA}
                  onChange={() => setEnable2FA(!enable2FA)}
                />
                Enable Two-Factor Authentication (2FA)
              </label>
            </div>
            <div className="form-group">
              <label>Session Timeout</label>
              <select>
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>1 hour</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'email' && (
          <div className="settings-section">
            <h2><Mail size={18} /> Email Notifications</h2>
            <div className="form-group">
              <label>SMTP Host</label>
              <input type="text" placeholder="smtp.example.com" />
            </div>
            <div className="form-group">
              <label>SMTP Port</label>
              <input type="number" placeholder="587" />
            </div>
            <div className="form-group">
              <label>
                <input type="checkbox" defaultChecked />
                Notify admins when new pets are added
              </label>
            </div>
          </div>
        )}
      </div>

      <div className="settings-actions">
        <button className="cancel-btn">Reset Changes</button>
        <button className="save-btn" onClick={handleSaveSettings}>
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;