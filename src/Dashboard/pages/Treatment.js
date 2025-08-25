import React, { useEffect, useState } from "react";
import "./Pets.css";
import axios from "axios";
import { PetGridForTreatment } from "../Components/PetTreatmentCard";

export default function Treatment({ userData }) {
  const [pets, setPets] = useState([]);
  //   const [detailPet, setDetailPet] = useState();

  useEffect(() => {
    axios
      //   .get("https://petgatewayapi.onrender.com/getAllPets")
      .get(
        `https://petadoptionwebapi-1.onrender.com/api/pet/by-owner/${
          userData.name === "Admin" ? null : userData.id
        }`
      )
      .then((response) => {
        setPets(response.data);
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
  }, []);

  return (
    <div className="pets-page">
      <h1
        style={{ color: "black", alignSelf: "self-start", paddingBottom: 20 }}
      >
        My Pets
      </h1>
      <PetGridForTreatment pets={pets ?? []} />
    </div>
  );
}
