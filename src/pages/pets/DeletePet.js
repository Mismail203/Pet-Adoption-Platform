import React from 'react';
import { X, PawPrint } from 'lucide-react';

const DeletePet = ({ pet, onClose, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container delete-modal">
        <div className="modal-header">
          <h2>Delete Pet</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="delete-content">
          <div className="pet-info">
            <div className="pet-avatar">
              <PawPrint size={24} />
            </div>
            <div>
              <h3>{pet.name}</h3>
              <p>{pet.breed} • {pet.type}</p>
            </div>
          </div>
          
          <p className="warning-message">
            Are you sure you want to permanently delete {pet.name}'s record?
          </p>
          <p className="warning-note">
            This action cannot be undone and will remove all information about this pet.
          </p>
        </div>
        
        <div className="modal-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="delete-btn" onClick={onConfirm}>
            <PawPrint size={16} />
            <span>Delete Permanently</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePet;