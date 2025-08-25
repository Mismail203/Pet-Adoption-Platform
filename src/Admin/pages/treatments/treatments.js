

import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight,
  Syringe,
  Activity,
} from "lucide-react";
import AddTreatment from "./AddTreatment";
import EditTreatment from "./EditTreatment";
import DeleteTreatment from "./DeleteTreatment";
import "./Treatments.css";
import "./TreatmentModals.css";

const Treatments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedTreatment, setExpandedTreatment] = useState(null);
  const [editingTreatment, setEditingTreatment] = useState(null);
  const [deletingTreatment, setDeletingTreatment] = useState(null);
  const [addingTreatment, setAddingTreatment] = useState(false);
  const [treatments, setTreatments] = useState([]);
  

  // 🔹 Fetch treatments from Flask backend
const fetchTreatments = async () => {
  try {
    const res = await fetch(
      "https://medication-service.onrender.com/all-treatments"
    );
    const data = await res.json();
    console.log("Fetched treatments raw:", data);

    console.log("Normalized treatments:", data);

    setTreatments(data);
  } catch (err) {
    console.error("Error fetching treatments:", err);
  }
};



  useEffect(() => {
    fetchTreatments();
  }, []);

  // 🔹 Toggle expanded row
  const toggleTreatmentDetails = (treatmentId) => {
    setExpandedTreatment(expandedTreatment === treatmentId ? null : treatmentId);
  };

  // 🔹 Handle Add Treatment
  const handleAddTreatment = () => {
    fetchTreatments();
    setAddingTreatment(false);
  };

  // 🔹 Handle Edit Save
  const handleSave = () => {
    fetchTreatments();
    setEditingTreatment(null);
  };

  // 🔹 Handle Delete
  const handleDeleteConfirm = async () => {
    try {
      await fetch(
        `https://medication-service.onrender.com/delete-treatment/${deletingTreatment.treatment_id}`,
        { method: "DELETE" }
      );
      fetchTreatments();
      setDeletingTreatment(null);
    } catch (err) {
      console.error("Error deleting treatment:", err);
    }
  };

  // 🔹 Filter search
  const filteredTreatments = treatments.filter(
    (t) =>
      t.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.treatmentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.vetName.toLowerCase().includes(searchQuery.toLowerCase())
  );
console.log("Editing treatment:", treatments);

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

          <tbody>
            {filteredTreatments.map((treatment) => (
              <React.Fragment key={treatment.id}>
                <tr className="treatment-row">
                  <td>
                    <div className="treatment-info">
                      <div className="treatment-icon">
                        {treatment.treatmentType === "Vaccine" ? (
                          <Syringe size={18} />
                        ) : (
                          <Activity size={18} />
                        )}
                      </div>
                      <span>{treatment.treatmentType}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`type-badge ${treatment.treatmentType.toLowerCase()}`}>
                      {treatment.treatmentType}
                    </span>
                  </td>
                  <td>{treatment.petName}</td>
                  <td>{treatment.date}</td>
                  <td>
                    <span className={`status-badge completed`}>completed</span>
                  </td>
                  <td>{treatment.vetName}</td>
                  <td>
                    <div className="actions">
                      <button
                        className="expand-btn"
                        onClick={() => {toggleTreatmentDetails(treatment.treatment_id); console.log("Toggled treatment details for:", treatment);}}
                      >
                        {expandedTreatment === treatment.treatment_id ? (
                          <ChevronDown size={18} />
                        ) : (
                          <ChevronRight size={18} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>

                {expandedTreatment === treatment.treatment_id && (
                  <tr className="treatment-details-row">
                    <td colSpan="7">
                      <div className="treatment-details">
                        <div className="detail-item">
                          <span className="detail-label">Description:</span>
                          <span>{treatment.description}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Time Slot:</span>
                          <span>{treatment.timeSlot}</span>
                        </div>
                        <div className="detail-actions">
                          <button
  className="edit-btn"
  onClick={() => {
    console.log("Editing treatment clicked:", treatment);
    setEditingTreatment(treatment);
  }}
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

      {/* Modals */}
      {addingTreatment && (
        <AddTreatment onClose={() => setAddingTreatment(false)} onSave={handleAddTreatment} />
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
