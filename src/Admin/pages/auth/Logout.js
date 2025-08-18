import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    // Call parent logout handler
    if (typeof onLogout === 'function') {
      onLogout();
    }

    // Redirect to login immediately
    navigate('/admin/login', { replace: true });
  }, [navigate, onLogout]);

  return (
    <div className="logout-container">
      <Loader className="spinner" size={32} />
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;