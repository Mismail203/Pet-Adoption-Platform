import React, { useEffect, useState } from "react";
import { Search, PawPrint } from "lucide-react";
import moment from "moment";
import axios from "axios";

const Adoptions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios
      .get("https://petgatewayapi.onrender.com/getAllAdoptions")
      .then((response) => {
        setPets(response.data);
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
  }, []);

  const filteredPets =
    searchQuery.length > 0
      ? pets.filter(
          (pet) =>
            pet.petName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pet.owner.name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : pets;

  return (
    <div className="pets-page">
      <div className="pets-header">
        <h1>Pet Adoption Records</h1>
        <div className="header-actions">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="pets-table-container">
        <table className="pets-table">
          <thead>
            <tr>
              <th>AdoptionId</th>
              <th>Name</th>
              <th>Owner</th>
              <th>Adoption Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredPets.map((pet) => (
              <React.Fragment key={pet.id}>
                <tr className="pet-row">
                  <td>{pet.adoptionId}</td>

                  <td>
                    <div className="pet-info">
                      <div className="pet-avatar">
                        <PawPrint size={18} />
                      </div>
                      <span>{pet.petName}</span>
                    </div>
                  </td>

                  <td>{pet.owner.name}</td>
                  <td>
                    {moment(pet.adoptionDate).format("MMMM Do YYYY, h:mm A")}
                  </td>

                  {/* <td>
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
                  </td> */}
                </tr>

                {/* {expandedPet === pet.id && (
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
    </div>
  );
};

export default Adoptions;
