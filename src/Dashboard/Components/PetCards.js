import React from "react";

const fmtPrice = (n, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(n);

export function PetCard({ pet, onClick }) {
  return (
    <div
      className="pet-card"
      onClick={() => onClick?.(pet)}
      role={onClick ? "button" : undefined}
    >
      <div className="pet-image-wrap">
        <img
          className="pet-image"
          src={pet.images[0]?.url ?? "https://placedog.net/800/600"}
          alt={pet.petName}
          loading="lazy"
        />
      </div>

      <div className="pet-body">
        <h3 className="pet-name" title={pet.petName}>
          {pet.petName}
        </h3>
        <span className="pet-price">{fmtPrice(pet.price, pet.currency)}</span>
      </div>
    </div>
  );
}

export function PetGrid({ pets, onCardClick }) {
  return (
    <div className="pet-grid">
      {pets.map((p) => (
        <PetCard key={p.id} pet={p} onClick={onCardClick} />
      ))}
    </div>
  );
}
