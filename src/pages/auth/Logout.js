import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear authentication tokens/user data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    // Redirect to login after 1 second (for visual feedback)
    const timer = setTimeout(() => {
      navigate('/login');
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="logout-container">
      <Loader className="spinner" size={32} />
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;