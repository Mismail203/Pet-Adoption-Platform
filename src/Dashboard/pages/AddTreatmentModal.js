import React, { useState } from "react";
import { X } from "lucide-react";

const AddTreatment = ({ pet, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    type: "Vaccine",
    date: new Date().toISOString().split("T")[0],
    vet: "",
    notes: "",
    timeSlot: "10:00" // default, but user can change
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

    try {
      const response = await fetch(
        "https://medication-service.onrender.com/add-treatment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: 1, // TODO: replace with logged-in userId
            petId: pet.petId || pet.id, // ✅ safer check
            petName: pet.petName,
            petType: pet.petType || "Dog", // ✅ safer
            treatmentType: formData.type,
            description: formData.notes,
            date: formData.date,
            timeSlot: formData.timeSlot, // ✅ not hardcoded
            vetName: formData.vet
          })
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Failed: ${response.status} - ${errText}`);
      }

      const data = await response.json();
      console.log("✅ Treatment added:", data);

      if (onSave) onSave();
      onClose();
    } catch (err) {
      console.error("❌ Error submitting treatment:", err);
      setError("Error submitting treatment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Add Treatment for {pet.petName}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <p className="error-text">{error}</p>}

          <div className="form-group">
            <label>Treatment Type</label>
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

          <div className="form-row">
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
                type="time"
                name="timeSlot"
                value={formData.timeSlot}
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
            <label>Notes (Description)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter treatment notes"
              rows="3"
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? "Saving..." : "Add Treatment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTreatment;
