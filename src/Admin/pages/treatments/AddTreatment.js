// import React, { useState, useEffect } from 'react';
// import { X } from 'lucide-react';

// const TreatmentsList = () => {
//   const [treatments, setTreatments] = useState([]);

//   const fetchTreatments = async () => {
//     const res = await fetch("https://medication-service.onrender.com/all-treatments");
//     const data = await res.json();
//     setTreatments(data);
//   };

//   useEffect(() => {
//     fetchTreatments();
//   }, []);

// const AddTreatment = ({ onClose, onSave, nextId }) => {
//   const [formData, setFormData] = useState({
//     id: nextId,
//     name: '',
//     type: 'Vaccine',
//     pet: '',
//     date: new Date().toISOString().split('T')[0],
//     status: 'completed',
//     vet: '',
//     details: {
//       dosage: '',
//       notes: '',
//       nextDue: ''
//     }
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name in formData.details) {
//       setFormData((prev) => ({
//         ...prev,
//         details: {
//           ...prev.details,
//           [name]: value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch("https://medication-service.onrender.com/add-treatment", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: 1, // 🔹 you can make this dynamic later
//           petId: "PET123", // 🔹 temporary fixed, replace with actual pet id
//           petName: formData.pet,
//           petType: "Dog", // 🔹 add dropdown later if needed
//           treatmentType: formData.type,
//           description: formData.details.notes,
//           date: formData.date,
//           timeSlot: "14:00", // 🔹 can add input later
//           vetName: formData.vet,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to add treatment");
//       }

//       const data = await response.json();
//       console.log("✅ Treatment added:", data);

//       onSave();
//       // if (onSave) {
//       //   onSave(formData); // Update parent state if needed
//       // }

//       onClose(); // Close modal
//     } catch (err) {
//       console.error("❌ Error submitting treatment:", err);
//       setError("Error submitting treatment. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-container">
//         <div className="modal-header">
//           <h2>Add New Treatment</h2>
//           <button className="close-btn" onClick={onClose}>
//             <X size={20} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit}>
//           {/* 🔹 Show error */}
//           {error && <p className="error-text">{error}</p>}

//           <div className="form-group">
//             <label>Treatment Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter treatment name"
//               required
//             />
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>Type</label>
//               <select
//                 name="type"
//                 value={formData.type}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="Vaccine">Vaccine</option>
//                 <option value="Medication">Medication</option>
//                 <option value="Surgery">Surgery</option>
//                 <option value="Checkup">Checkup</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label>Status</label>
//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="completed">Completed</option>
//                 <option value="pending">Pending</option>
//                 <option value="canceled">Canceled</option>
//               </select>
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>Pet</label>
//               <input
//                 type="text"
//                 name="pet"
//                 value={formData.pet}
//                 onChange={handleChange}
//                 placeholder="Enter pet name"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>Date</label>
//               <input
//                 type="date"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Veterinarian</label>
//             <input
//               type="text"
//               name="vet"
//               value={formData.vet}
//               onChange={handleChange}
//               placeholder="Enter veterinarian name"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Dosage</label>
//             <input
//               type="text"
//               name="dosage"
//               value={formData.details.dosage}
//               onChange={handleChange}
//               placeholder="Enter dosage information"
//             />
//           </div>

//           <div className="form-group">
//             <label>Notes</label>
//             <textarea
//               name="notes"
//               value={formData.details.notes}
//               onChange={handleChange}
//               placeholder="Enter any notes"
//               rows="3"
//             />
//           </div>

//           <div className="form-group">
//             <label>Next Due Date</label>
//             <input
//               type="date"
//               name="nextDue"
//               value={formData.details.nextDue}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="modal-actions">
//             <button
//               type="button"
//               className="cancel-btn"
//               onClick={onClose}
//               disabled={loading}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="save-btn"
//               disabled={loading}
//             >
//               {loading ? "Saving..." : "Add Treatment"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddTreatment;

import React, { useState } from "react";
import { X } from "lucide-react";

const AddTreatment = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    pet: "",
    type: "Vaccine",
    date: new Date().toISOString().split("T")[0],
    status: "completed",
    vet: "",
    details: {
      dosage: "",
      notes: "",
      nextDue: ""
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.details) {
      setFormData((prev) => ({
        ...prev,
        details: {
          ...prev.details,
          [name]: value
        }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: 1, // 🔹 Replace with actual userId later
            petId: "PET123", // 🔹 Replace with dynamic petId
            petName: formData.pet,
            petType: "Dog", // 🔹 Could be dropdown later
            treatmentType: formData.type,
            description: formData.details.notes,
            date: formData.date,
            timeSlot: "14:00", // 🔹 Can make dynamic
            vetName: formData.vet
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add treatment");
      }

      const data = await response.json();
      console.log("✅ Treatment added:", data);

      if (onSave) {
        onSave(); // Refresh treatments list
      }
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
          <h2>Add New Treatment</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <p className="error-text">{error}</p>}

          <div className="form-group">
            <label>Pet Name</label>
            <input
              type="text"
              name="pet"
              value={formData.pet}
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
              <label>Veterinarian</label>
              <input
                type="text"
                name="vet"
                value={formData.vet}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.details.notes}
              onChange={handleChange}
              placeholder="Enter any notes"
              rows="3"
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="save-btn"
              disabled={loading}
            >
              {loading ? "Saving..." : "Add Treatment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTreatment;
