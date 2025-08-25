import React, { useState } from "react";
import { X } from "lucide-react";

const DeleteTreatment = ({ treatment, onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://medication-service.onrender.com/delete-treatment/${treatment.treatment_id}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Failed to delete treatment");

      await response.json();
      onConfirm();
      onClose();
    } catch (err) {
      console.error("❌ Error deleting treatment:", err);
      setError("Error deleting treatment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Delete Treatment</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {error && <p className="error-text">{error}</p>}

        <p>
          Are you sure you want to delete treatment{" "}
          <strong>{treatment.treatmentType}</strong> for{" "}
          <strong>{treatment.petName}</strong>?
        </p>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button
            className="delete-btn"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTreatment;
