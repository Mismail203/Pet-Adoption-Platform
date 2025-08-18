import React, { useState } from 'react';
import { X } from 'lucide-react';

const EditTreatment = ({ treatment, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    ...treatment,
    details: {
      ...treatment.details
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.details) {
      setFormData(prev => ({
        ...prev,
        details: {
          ...prev.details,
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Edit Treatment</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Treatment Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="Vaccine">Vaccine</option>
                <option value="Medication">Medication</option>
                <option value="Surgery">Surgery</option>
                <option value="Checkup">Checkup</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Pet</label>
              <input
                type="text"
                name="pet"
                value={formData.pet}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Veterinarian</label>
            <input
              type="text"
              name="vet"
              value={formData.vet}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Dosage</label>
            <input
              type="text"
              name="dosage"
              value={formData.details.dosage}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.details.notes}
              onChange={handleChange}
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label>Next Due Date</label>
            <input
              type="date"
              name="nextDue"
              value={formData.details.nextDue}
              onChange={handleChange}
            />
          </div>
          
          <div className="modal-actions">
            <button 
              type="button" 
              className="cancel-btn" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="save-btn"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTreatment;