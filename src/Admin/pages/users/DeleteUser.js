import React, { useState } from 'react';
import axios from 'axios';
import './UserModals.css';

const DeleteUser = ({ user, onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await axios.delete(
        `https://node-api-wlq1.onrender.com/api/users/delete-user/${user.email}`
      );

      onConfirm(user); // pass deleted user back to parent
      setLoading(false);
      onClose();
    } catch (err) {
      console.error(err);
      let message = 'Failed to delete user';
      if (err.response && err.response.data) {
        if (typeof err.response.data === 'string') {
          message = err.response.data;
        } else if (err.response.data.message) {
          message = err.response.data.message;
        } else {
          message = JSON.stringify(err.response.data);
        }
      }
      setError(message);
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container delete-modal">
        <div className="modal-header">
          <h2>Delete User</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        
        <div className="delete-content">
          <p>Are you sure you want to delete <strong>{user.name}</strong>?</p>
          <p>This action cannot be undone.</p>
          {error && <p className="error-text">{error}</p>}
        </div>
        
        <div className="modal-actions">
          <button 
            type="button" 
            className="cancel-btn" 
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            type="button" 
            className="delete-btn" 
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete User'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
