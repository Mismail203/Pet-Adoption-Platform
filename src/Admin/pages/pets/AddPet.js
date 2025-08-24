import React, { useEffect, useState } from "react";
import { X, PawPrint } from "lucide-react";
import axios from "axios";
import { gateway } from "../helper";

const AddPet = ({ onClose, isEdit = false, pet }) => {
  console.log("petid", pet.petId);

  const [formData, setFormData] = useState(
    isEdit
      ? pet
      : {
          petName: null,
          specie: null,
          breed: null,
          price: 0,
          age: 0,
          description: "",
          adoptionStatus: "Available",
          ownerId: null,
          gender: "Male",
        }
  );
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://node-api-wlq1.onrender.com/api/users/get-all-users"
      );
      setUsers(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };
  const petTypes = ["Dog", "Cat", "Bird", "Rabbit", "Other"];
  const gender = ["Male", "Female"];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData", formData);
    const url = isEdit
      ? `${gateway}/editPet/${formData.petId}` // <-- make sure gateway has this mount!
      : `${gateway}/addPet`;

    // If your backend expects PUT for edits, change method to "put"
    const method = isEdit ? "post" : "post";

    try {
      const res = await axios({
        method,
        url,
        data: formData,
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
      });
      console.log("✅ Success:", res.data);
      alert(isEdit ? "Pet updated successfully!" : "Pet added successfully!");
    } catch (err) {
      console.error("❌ Request failed:", err?.response?.data || err.message);
      alert(
        `Failed to ${isEdit ? "update" : "add"} pet${
          err?.response?.status ? ` (HTTP ${err.response.status})` : ""
        }`
      );
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{isEdit ? "Edit Pet" : "Add New Pet"}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Pet Name</label>
              <input
                type="text"
                name="petName"
                value={formData.petName}
                onChange={handleChange}
                placeholder="Enter pet name"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Type</label>
              <select
                name="specie"
                value={formData.specie}
                onChange={handleChange}
                required
              >
                {petTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
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
                value={parseFloat(formData.age)}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    age: parseFloat(e.target.value),
                  }))
                }
                placeholder="Enter age"
                min={0}
                max={30}
                required
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="adoptionStatus"
                value={formData.adoptionStatus}
                onChange={handleChange}
                required
              >
                <option value="Available">Available</option>
                <option value="Adopted">Adopted</option>
                <option value="Reserved">Reserved</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Price ($)</label>
              <input
                type="number"
                name="price"
                value={parseFloat(formData.price)}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    price: parseFloat(e.target.value),
                  }))
                }
                placeholder="0"
                min={0}
                required
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={formData.adoptionStatus}
                onChange={handleChange}
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Owner</label>
              <select
                name="ownerId"
                value={formData.owner.name}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    ownerId: parseFloat(e.target.value.id),
                    owner: {
                      ownerId: parseFloat(e.target.value.id),
                      ownerName: e.target.value.name,
                    },
                  }))
                }
              >
                {users.map((user) => (
                  <option key={user.id} value={user}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                required
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              <PawPrint size={16} />
              <span>{isEdit ? "Update" : "Submit"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPet;
