import React, { useEffect, useState } from "react";
import "./Pets.css";
import axios from "axios";
import { PetGrid } from "../Components/PetCards";
import PetDetailsModal from "./petDetailModal";

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [detailPet, setDetailPet] = useState();
  const [openModal, setOpenModal] = useState();

  useEffect(() => {
    axios
      //   .get("https://petgatewayapi.onrender.com/getAllPets")
      .get("https://petadoptionwebapi-1.onrender.com/api/pet/all")
      .then((response) => {
        setPets(response.data);
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
  }, []);

  const filteredPet = pets.filter((pet) => pet.adoptionStatus === "Available");

  return (
    <div className="pets-page">
      <PetGrid
        pets={filteredPet ?? []}
        onCardClick={(p) => {
          setDetailPet(p);
          setOpenModal(true);
        }}
      />
      {openModal && (
        <PetDetailsModal
          onClose={() => {
            setDetailPet({});
            setOpenModal(false);
          }}
          open={openModal}
          pet={detailPet}
        />
      )}
    </div>
  );
}
