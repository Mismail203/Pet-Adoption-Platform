import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2,
  PawPrint,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import AddPet from './AddPet';
import EditPet from './EditPet';
import DeletePet from './DeletePet';
import './Pets.css';
import './PetsModals.css';

const Pets = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPet, setExpandedPet] = useState(null);
  const [editingPet, setEditingPet] = useState(null);
  const [deletingPet, setDeletingPet] = useState(null);
  const [addingPet, setAddingPet] = useState(false);
  const [pets, setPets] = useState([
    {
      id: 1,
      name: 'Buddy',
      type: 'Dog',
      breed: 'Golden Retriever',
      age: 3,
      status: 'Available',
      lastCheckup: '2 weeks ago',
      details: {
        health: 'Excellent',
        temperament: 'Friendly',
        specialNeeds: 'None'
      }
    },
    {
      id: 2,
      name: 'Whiskers',
      type: 'Cat',
      breed: 'Siamese',
      age: 2,
      status: 'Pending Adoption',
      lastCheckup: '1 month ago',
      details: {
        health: 'Good',
        temperament: 'Playful',
        specialNeeds: 'Allergic to fish'
      }
    }
  ]);

  const togglePetDetails = (petId) => {
    setExpandedPet(expandedPet === petId ? null : petId);
  };

  const handleAddPet = (newPet) => {
    setPets([...pets, { ...newPet, id: pets.length + 1 }]);
    setAddingPet(false);
  };

  const handleSave = (updatedPet) => {
    setPets(pets.map(pet => 
      pet.id === updatedPet.id ? updatedPet : pet
    ));
    setEditingPet(null);
  };

  const handleDeleteConfirm = () => {
    setPets(pets.filter(pet => pet.id !== deletingPet.id));
    setDeletingPet(null);
  };

  const filteredPets = pets.filter(pet =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pet.breed.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <button 
            className="add-pet-btn"
            onClick={() => setAddingPet(true)}
          >
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
              <th>Age</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPets.map(pet => (
              <React.Fragment key={pet.id}>
                <tr className="pet-row">
                  <td>
                    <div className="pet-info">
                      <div className="pet-avatar">
                        <PawPrint size={18} />
                      </div>
                      <span>{pet.name}</span>
                    </div>
                  </td>
                  <td>{pet.type}</td>
                  <td>{pet.breed}</td>
                  <td>{pet.age} years</td>
                  <td>
                    <span className={`status-badge ${pet.status.toLowerCase().replace(' ', '-')}`}>
                      {pet.status}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      <button 
                        className="expand-btn"
                        onClick={() => togglePetDetails(pet.id)}
                      >
                        {expandedPet === pet.id ? (
                          <ChevronDown size={18} />
                        ) : (
                          <ChevronRight size={18} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
                
                {expandedPet === pet.id && (
                  <tr className="pet-details-row">
                    <td colSpan="6">
                      <div className="pet-details">
                        <div className="detail-item">
                          <span className="detail-label">Last Checkup:</span>
                          <span>{pet.lastCheckup}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Health:</span>
                          <span>{pet.details.health}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Temperament:</span>
                          <span>{pet.details.temperament}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Special Needs:</span>
                          <span>{pet.details.specialNeeds}</span>
                        </div>
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
                )}
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
        <EditPet 
          pet={editingPet}
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