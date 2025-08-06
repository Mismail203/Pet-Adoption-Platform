import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2,
  ChevronDown,
  ChevronRight,
  X,
  Syringe,
  Activity
} from 'lucide-react';
import AddTreatment from './AddTreatment';
import EditTreatment from './EditTreatment';
import DeleteTreatment from './DeleteTreatment';
import './Treatments.css';
import './TreatmentModals.css';

const Treatments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTreatment, setExpandedTreatment] = useState(null);
  const [editingTreatment, setEditingTreatment] = useState(null);
  const [deletingTreatment, setDeletingTreatment] = useState(null);
  const [addingTreatment, setAddingTreatment] = useState(false);
  const [treatments, setTreatments] = useState([
    {
      id: 1,
      name: 'Rabies Vaccination',
      type: 'Vaccine',
      pet: 'Max (Dog)',
      date: '2023-05-15',
      status: 'completed',
      vet: 'Dr. Sarah Johnson',
      details: {
        dosage: '1 mL',
        notes: 'No adverse reactions observed',
        nextDue: '2024-05-15'
      }
    },
    {
      id: 2,
      name: 'Deworming',
      type: 'Medication',
      pet: 'Whiskers (Cat)',
      date: '2023-06-20',
      status: 'completed',
      vet: 'Dr. Michael Chen',
      details: {
        dosage: '0.5 mL',
        notes: 'Administered with food',
        nextDue: '2023-09-20'
      }
    },
    // ... other treatments
  ]);

  // Helper functions
  const toggleTreatmentDetails = (treatmentId) => {
    setExpandedTreatment(expandedTreatment === treatmentId ? null : treatmentId);
  };

  const handleAddTreatment = (newTreatment) => {
    setTreatments([...treatments, { ...newTreatment, id: treatments.length + 1 }]);
    setAddingTreatment(false);
  };

  const handleSave = (updatedTreatment) => {
    setTreatments(treatments.map(treatment => 
      treatment.id === updatedTreatment.id ? updatedTreatment : treatment
    ));
    setEditingTreatment(null);
  };

  const handleDeleteConfirm = () => {
    setTreatments(treatments.filter(treatment => treatment.id !== deletingTreatment.id));
    setDeletingTreatment(null);
  };

  const filteredTreatments = treatments.filter(treatment =>
    treatment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    treatment.pet.toLowerCase().includes(searchQuery.toLowerCase()) ||
    treatment.vet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="treatments-page">
      {/* Header Section */}
      <div className="treatments-header">
        <h1>Treatment Management</h1>
        <div className="header-actions">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search treatments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            className="add-treatment-btn"
            onClick={() => setAddingTreatment(true)}
          >
            <Plus size={18} />
            <span>Add Treatment</span>
          </button>
        </div>
      </div>

      {/* Treatments Table */}
      <div className="treatments-table-container">
        <table className="treatments-table">
          {/* Table headers */}
          <thead>
            <tr>
              <th>Treatment</th>
              <th>Type</th>
              <th>Pet</th>
              <th>Date</th>
              <th>Status</th>
              <th>Veterinarian</th>
              <th>Actions</th>
            </tr>
          </thead>
          
          {/* Table body */}
          <tbody>
            {filteredTreatments.map(treatment => (
              <React.Fragment key={treatment.id}>
                <tr className="treatment-row">
                  {/* Treatment info cells */}
                  <td>
                    <div className="treatment-info">
                      <div className="treatment-icon">
                        {treatment.type === 'Vaccine' ? (
                          <Syringe size={18} />
                        ) : (
                          <Activity size={18} />
                        )}
                      </div>
                      <span>{treatment.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`type-badge ${treatment.type.toLowerCase()}`}>
                      {treatment.type}
                    </span>
                  </td>
                  <td>{treatment.pet}</td>
                  <td>{treatment.date}</td>
                  <td>
                    <span className={`status-badge ${treatment.status}`}>
                      {treatment.status}
                    </span>
                  </td>
                  <td>{treatment.vet}</td>
                  <td>
                    <div className="actions">
                      <button 
                        className="expand-btn"
                        onClick={() => toggleTreatmentDetails(treatment.id)}
                      >
                        {expandedTreatment === treatment.id ? (
                          <ChevronDown size={18} />
                        ) : (
                          <ChevronRight size={18} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
                
                {/* Expanded details row */}
                {expandedTreatment === treatment.id && (
                  <tr className="treatment-details-row">
                    <td colSpan="7">
                      <div className="treatment-details">
                        <div className="detail-item">
                          <span className="detail-label">Dosage:</span>
                          <span>{treatment.details.dosage}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Notes:</span>
                          <span>{treatment.details.notes}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Next Due:</span>
                          <span>{treatment.details.nextDue}</span>
                        </div>
                        <div className="detail-actions">
                          <button 
                            className="edit-btn"
                            onClick={() => setEditingTreatment(treatment)}
                          >
                            <Edit size={16} />
                            <span>Edit</span>
                          </button>
                          <button 
                            className="delete-btn"
                            onClick={() => setDeletingTreatment(treatment)}
                          >
                            <Trash2 size={16} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button className="pagination-btn disabled">Previous</button>
        <span className="page-info">Page 1 of 1</span>
        <button className="pagination-btn">Next</button>
      </div>

      {/* Modals */}
      {addingTreatment && (
        <AddTreatment 
          onClose={() => setAddingTreatment(false)}
          onSave={handleAddTreatment}
          nextId={treatments.length + 1}
        />
      )}
      
      {editingTreatment && (
        <EditTreatment 
          treatment={editingTreatment}
          onClose={() => setEditingTreatment(null)}
          onSave={handleSave}
        />
      )}
      
      {deletingTreatment && (
        <DeleteTreatment 
          treatment={deletingTreatment}
          onClose={() => setDeletingTreatment(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default Treatments;