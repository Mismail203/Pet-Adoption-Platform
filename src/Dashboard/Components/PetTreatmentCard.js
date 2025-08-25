// PetTreatmentCard.jsx
import React from "react";

export function PetTreatMentCard({ pet, onAddTreatment }) {
  const styles = {
    card: {
      backgroundColor: "#fff",
      borderRadius: 12,
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      cursor: "default",
      transition: "transform 0.2s, box-shadow 0.2s",
    },
    imageWrap: {
      width: "100%",
      height: 150,
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f8f8f8",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.3s",
    },
    body: {
      padding: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    name: {
      fontSize: "1.1rem",
      fontWeight: 600,
      marginBottom: 8,
      textAlign: "center",
      color: "#333",
    },
    button: {
      padding: "8px 12px",
      backgroundColor: "#4caf50",
      color: "white",
      border: "none",
      borderRadius: 8,
      cursor: "pointer",
      fontWeight: 600,
      width: "100%",
      transition: "background-color 0.2s, transform 0.2s",
    },
  };

  return (
    <div
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
      }}
    >
      <div style={styles.imageWrap}>
        <img
          style={styles.image}
          src={pet.images[0]?.url ?? "https://placedog.net/800/600"}
          alt={pet.petName}
          loading="lazy"
        />
      </div>

      <div style={styles.body}>
        <h3 style={styles.name}>{pet.petName}</h3>
        <button
          style={styles.button}
          onClick={() => onAddTreatment?.(pet)}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#45a049";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#4caf50";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Add Treatment
        </button>
      </div>
    </div>
  );
}

export function PetGridForTreatment({ pets, onAddTreatment }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 20,
        padding: 10,
      }}
    >
      {pets.map((p) => (
        <PetTreatMentCard key={p.id} pet={p} onAddTreatment={onAddTreatment} />
      ))}
    </div>
  );
}
