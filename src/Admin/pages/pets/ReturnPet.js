import React from "react";
import { X, PawPrint } from "lucide-react";
import axios from "axios";
import { gateway } from "../helper";

const ReturnPet = ({ pet, onClose, onConfirm }) => {
  async function confirmReturn() {
    if (!pet.petId) throw new Error("petId is required");
    try {
      await axios.post(`${gateway}/ReturnPet`, null, {
        params: { petId: pet.petId },
      });

      alert("Pet returned successfully!");
      onClose();
    } catch (err) {
      console.error("❌ return failed:", err?.response?.data || err.message);
      alert(
        `Failed to return pet${
          err?.response?.status ? ` (HTTP ${err.response.status})` : ""
        }`
      );
    }
  }
  return (
    <div className="modal-overlay">
      <div className="modal-container delete-modal">
        <div className="modal-header">
          <h2>Return Pet</h2>
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
              <h3>{pet.petName}</h3>
              <p>
                {pet.breed} • {pet.type}
              </p>
            </div>
          </div>

          <p className="warning-message">
            Are you sure you want to return {pet.petName}
          </p>
          <p className="warning-note">
            This action cannot be undone and will remove you as owner of this
            pet.
          </p>
        </div>

        <div className="modal-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="delete-btn" onClick={confirmReturn}>
            <PawPrint size={16} />
            <span>Return</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnPet;
