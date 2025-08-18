import React, { useState } from 'react';
import { X, PawPrint } from 'lucide-react';

const AddPet = ({ onClose, onSave, nextId }) => {
  const [formData, setFormData] = useState({
    id: nextId,
    name: '',
    type: 'Dog',
    breed: '',
    age: '',
    status: 'Available',
    lastCheckup: '',
    details: {
      health: 'Excellent',
      temperament: 'Friendly',
      specialNeeds: 'None'
    }
  });

  const petTypes = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];
  const healthOptions = ['Excellent', 'Good', 'Fair', 'Poor'];
  const temperamentOptions = ['Friendly', 'Playful', 'Shy', 'Aggressive'];

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
    const petWithTimestamp = {
      ...formData,
      lastCheckup: formData.lastCheckup || 'Not recorded'
    };
    onSave(petWithTimestamp);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Add New Pet</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Pet Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter pet name"
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
                {petTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Breed</label>
              <input
                type="text"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                placeholder="Enter breed"
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Age (years)</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                min="0"
                max="30"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Available">Available</option>
                <option value="Pending Adoption">Pending Adoption</option>
                <option value="Adopted">Adopted</option>
                <option value="In Treatment">In Treatment</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Last Checkup</label>
            <input
              type="text"
              name="lastCheckup"
              value={formData.lastCheckup}
              onChange={handleChange}
              placeholder="E.g., 2 weeks ago"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Health Status</label>
              <select
                name="health"
                value={formData.details.health}
                onChange={handleChange}
              >
                {healthOptions.map(health => (
                  <option key={health} value={health}>{health}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Temperament</label>
              <select
                name="temperament"
                value={formData.details.temperament}
                onChange={handleChange}
              >
                {temperamentOptions.map(temp => (
                  <option key={temp} value={temp}>{temp}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Special Needs</label>
            <input
              type="text"
              name="specialNeeds"
              value={formData.details.specialNeeds}
              onChange={handleChange}
              placeholder="Any special requirements"
            />
          </div>
          
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              <PawPrint size={16} />
              <span>Add Pet</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPet;