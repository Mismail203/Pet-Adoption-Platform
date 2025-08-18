import React from 'react';
import './UserModals.css';

const DeleteUser = ({ user, onClose, onConfirm }) => {
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
        </div>
        
        <div className="modal-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="delete-btn" onClick={onConfirm}>
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;