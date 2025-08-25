

import React, { useState } from "react";
import { X } from "lucide-react";

const EditTreatment = ({ treatment, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    treatmentType: treatment.treatmentType || "",
    description: treatment.description || "",
    date: treatment.date || "",
    timeSlot: treatment.timeSlot || "",
    vetName: treatment.vetName || "",
    treatment_id: treatment.treatment_id || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  console.log("Submitting treatment:", treatment);
  console.log("Form data:", formData);

  if (!treatment.treatment_id) {
    console.error("❌ Error: treatment.id is undefined");
    setError("Treatment ID missing. Cannot update.");
    setLoading(false);
    return;
  }

  try {
    const response = await fetch(
      `https://medication-service.onrender.com/update-treatment/${treatment.treatment_id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...formData, id: formData.treatment_id}),
      }
    );

    console.log("Response status:", response.status);

    const resData = await response.json();
    console.log("Response data:", resData);

    if (!response.ok) throw new Error(resData.error || "Failed to update treatment");

    onSave();
    onClose();
  } catch (err) {
    console.error("❌ Error updating treatment:", err);
    setError("Error updating treatment. Please try again.");
  } finally {
    setLoading(false);
  }
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
          {error && <p className="error-text">{error}</p>}

          <div className="form-group">
            <label>Treatment Type</label>
            <input
              type="text"
              name="treatmentType"
              value={formData.treatmentType}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
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

          <div className="form-group">
            <label>Time Slot</label>
            <input
              type="text"
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              placeholder="e.g. 14:00"
              required
            />
          </div>

          <div className="form-group">
            <label>Veterinarian</label>
            <input
              type="text"
              name="vetName"
              value={formData.vetName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? "Saving..." : "Update Treatment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTreatment;
