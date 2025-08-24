import React from "react";
import { X, PawPrint } from "lucide-react";
import axios from "axios";
import { gateway } from "../helper";

const DeletePet = ({ pet, onClose, onConfirm }) => {
  async function confirmDelete(petId) {
    if (!petId) throw new Error("petId is required");
    try {
      const res = await axios.delete(`${gateway}/getPetById/${petId}`);
      console.log("✅ Pet deleted:", res.data);
      alert("Pet deleted successfully!");
    } catch (err) {
      console.error("❌ Delete failed:", err?.response?.data || err.message);
      alert(
        `Failed to delete pet${
          err?.response?.status ? ` (HTTP ${err.response.status})` : ""
        }`
      );
    }
  }
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
              <h3>{pet.petName}</h3>
              <p>
                {pet.breed} • {pet.type}
              </p>
            </div>
          </div>

          <p className="warning-message">
            Are you sure you want to permanently delete {pet.petName}
          </p>
          <p className="warning-note">
            This action cannot be undone and will remove all information about
            this pet.
          </p>
        </div>

        <div className="modal-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="delete-btn" onClick={confirmDelete}>
            <PawPrint size={16} />
            <span>Delete Permanently</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePet;
