// import React from 'react';
// import { X } from 'lucide-react';

// const DeleteTreatment = ({ treatment, onClose, onConfirm }) => {
//   return (
//     <div className="modal-overlay">
//       <div className="modal-container delete-modal">
//         <div className="modal-header">
//           <h2>Delete Treatment</h2>
//           <button className="close-btn" onClick={onClose}>
//             <X size={20} />
//           </button>
//         </div>
        
//         <div className="delete-content">
//           <p>Are you sure you want to delete the treatment <strong>{treatment.name}</strong> for {treatment.pet}?</p>
//           <p>This action cannot be undone.</p>
//         </div>
        
//         <div className="modal-actions">
//           <button type="button" className="cancel-btn" onClick={onClose}>
//             Cancel
//           </button>
//           <button type="button" className="delete-btn" onClick={onConfirm}>
//             Delete Treatment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteTreatment;

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
        `https://medication-service.onrender.com/delete-treatment/${treatment.id}`,
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
