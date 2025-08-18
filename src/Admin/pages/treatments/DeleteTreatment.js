import React from 'react';
import { X } from 'lucide-react';

const DeleteTreatment = ({ treatment, onClose, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container delete-modal">
        <div className="modal-header">
          <h2>Delete Treatment</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="delete-content">
          <p>Are you sure you want to delete the treatment <strong>{treatment.name}</strong> for {treatment.pet}?</p>
          <p>This action cannot be undone.</p>
        </div>
        
        <div className="modal-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="delete-btn" onClick={onConfirm}>
            Delete Treatment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTreatment;