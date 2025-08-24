import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  PawPrint,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import AddPet from "./AddPet";
import EditPet from "./EditPet";
import DeletePet from "./DeletePet";
import "./Pets.css";
import "./PetsModals.css";
import axios from "axios";

const Pets = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPet, setExpandedPet] = useState(null);
  const [editingPet, setEditingPet] = useState(null);
  const [deletingPet, setDeletingPet] = useState(null);
  const [addingPet, setAddingPet] = useState(false);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios
      .get("https://petgatewayapi.onrender.com/getAllPets")
      .then((response) => {
        setPets(response.data);
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
  }, []);
  const togglePetDetails = (petId) => {
    setExpandedPet(expandedPet === petId ? null : petId);
  };

  const handleAddPet = (newPet) => {
    setPets([...pets, { ...newPet, id: pets.length + 1 }]);
    setAddingPet(false);
  };

  const handleSave = (updatedPet) => {
    setPets(pets.map((pet) => (pet.id === updatedPet.id ? updatedPet : pet)));
    setEditingPet(null);
  };

  const handleDeleteConfirm = () => {
    setPets(pets.filter((pet) => pet.id !== deletingPet.id));
    setDeletingPet(null);
  };

  const filteredPets =
    searchQuery.length > 0
      ? pets.filter(
          (pet) =>
            pet.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pet.specie.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pet.adoptionStatus.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : pets;

  return (
    <div className="pets-page">
      <div className="pets-header">
        <h1>Pet Management</h1>
        <div className="header-actions">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search pets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="add-pet-btn" onClick={() => setAddingPet(true)}>
            <Plus size={18} />
            <span>Add Pet</span>
          </button>
        </div>
      </div>

      <div className="pets-table-container">
        <table className="pets-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Breed</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Status</th>
              <th>Owner</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPets.map((pet) => (
              <React.Fragment key={pet.id}>
                <tr className="pet-row">
                  <td>
                    <div className="pet-info">
                      <div className="pet-avatar">
                        <PawPrint size={18} />
                      </div>
                      <span>{pet.petName}</span>
                    </div>
                  </td>
                  <td>{pet.specie}</td>
                  <td>{pet.breed}</td>
                  <td>{pet.gender}</td>
                  <td>{pet.age} years</td>
                  <td>
                    <span
                      className={`status-badge ${pet.adoptionStatus
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {pet.adoptionStatus}
                    </span>
                  </td>
                  <td>{pet.owner?.name ?? "-"}</td>

                  <td>
                    <div className="detail-actions">
                      <button
                        className="edit-btn"
                        onClick={() => setEditingPet(pet)}
                      >
                        <Edit size={20} />
                        {/* <span>Edit</span> */}
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => setDeletingPet(pet)}
                      >
                        <Trash2 size={16} />
                        {/* <span>Delete</span> */}
                      </button>
                    </div>
                  </td>
                </tr>

                {/* {expandedPet === pet.id && (
                  <tr className="pet-details-row">
                    <td colSpan="6">
                      <div className="pet-details">
                        <div className="detail-actions">
                          <button
                            className="edit-btn"
                            onClick={() => setEditingPet(pet)}
                          >
                            <Edit size={16} />
                            <span>Edit</span>
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => setDeletingPet(pet)}
                          >
                            <Trash2 size={16} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )} */}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button className="pagination-btn disabled">Previous</button>
        <span className="page-info">Page 1 of 1</span>
        <button className="pagination-btn">Next</button>
      </div>

      {addingPet && (
        <AddPet
          onClose={() => setAddingPet(false)}
          onSave={handleAddPet}
          nextId={pets.length + 1}
        />
      )}

      {editingPet && (
        <AddPet
          pet={editingPet}
          isEdit={true}
          onClose={() => setEditingPet(null)}
          onSave={handleSave}
        />
      )}

      {deletingPet && (
        <DeletePet
          pet={deletingPet}
          onClose={() => setDeletingPet(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default Pets;
