// PetDetailsModal.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import PaymentModal from "./PaymentModal"; // We'll create this next

export default function PetDetailsModal({
  open,
  pet,
  userData, // Add userData prop
  onClose,
}) {
  const backdropRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    if (open) setIndex(0);
  }, [open]);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const imgs = useMemo(() => pet?.images?.filter(Boolean) ?? [], [pet]);
  const hasImgs = imgs.length > 0;

  const next = () => setIndex((i) => (i + 1) % Math.max(imgs.length, 1));
  const prev = () =>
    setIndex(
      (i) => (i - 1 + Math.max(imgs.length, 1)) % Math.max(imgs.length, 1)
    );

const handleAdoptClick = () => {
  if (!userData?.id || !userData?.email) {
    alert("Please log in to adopt a pet");
    return;
  }
  console.log("Adopting pet:", pet?.name); // log for debug
  setShowPayment(true);
};


  const handlePaymentClose = () => {
    setShowPayment(false);
  };

  if (!open || !pet) return null;

  const fmt = (n, cur = pet.currency || "USD") =>
    typeof n === "number"
      ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: cur,
      }).format(n)
      : n;

  const modal = (
    <div
      ref={backdropRef}
      onMouseDown={(e) => e.target === backdropRef.current && onClose?.()}
      style={S.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pet-title"
    >
      <div style={S.modal}>
        {/* Header */}
        <div style={S.header}>
          <h3 id="pet-title" style={{ margin: 0, fontSize: 18 }}>
            {pet.name || "Pet details"}
          </h3>
          <button onClick={onClose} aria-label="Close" style={S.iconBtn}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={S.body}>
          {/* Left: carousel */}
          <div style={S.left}>
            <div style={S.carousel}>
              <div style={S.slideWrap}>
                {hasImgs ? (
                  // eslint-disable-next-line jsx-a11y/img-redundant-alt
                  <img
                    key={index}
                    src={imgs[index]?.url}
                    alt={`${pet.name || "pet"} image ${index + 1}`}
                    style={S.slideImg}
                    onError={(e) => (e.currentTarget.style.opacity = "0.4")}
                  />
                ) : (
                  <div style={S.placeholder}>No images</div>
                )}
              </div>

              {/* Controls */}
              {imgs.length > 1 && (
                <>
                  <button
                    style={S.navLeft}
                    onClick={prev}
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button
                    style={S.navRight}
                    onClick={next}
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </>
              )}

              {/* Dots */}
              {imgs.length > 1 && (
                <div style={S.dots}>
                  {imgs.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      style={{
                        ...S.dot,
                        opacity: i === index ? 1 : 0.35,
                        transform: i === index ? "scale(1)" : "scale(.9)",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: details */}
          <div style={S.right}>
            <div style={{ display: "grid", gap: 12 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 22 }}>{pet.petName}</h2>
                {pet.price != null && (
                  <div style={{ marginTop: 4, fontWeight: 700 }}>
                    {fmt(pet.price)}
                  </div>
                )}
              </div>

              {pet.description && <p style={S.desc}>{pet.description}</p>}

              <div style={S.metaGrid}>
                {pet.gender && <Meta label="Gender" value={pet.gender} />}
                {pet.breed && <Meta label="Breed" value={pet.breed} />}
                {pet.type && <Meta label="Type" value={pet.type} />}
                {pet.age && <Meta label="Age" value={String(pet.age)} />}
                {pet.color && <Meta label="Color" value={pet.color} />}
                {pet.weight && (
                  <Meta label="Weight" value={`${pet.weight} kg`} />
                )}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                <button
                  style={S.primaryBtn}
                  onClick={handleAdoptClick}
                >
                  Adopt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <PaymentModal
          open={showPayment}
          onClose={handlePaymentClose}
          userData={userData}
          pet={pet}
        />
      )}
    </div>
  );

  return createPortal(modal, document.body);
}

function Meta({ label, value }) {
  return (
    <div style={S.metaItem}>
      <div style={S.metaLabel}>{label}</div>
      <div style={S.metaValue} title={value}>
        {value}
      </div>
    </div>
  );
}

// --- inline styles ---
const S = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.45)",
    display: "grid",
    placeItems: "center",
    padding: 16,
    zIndex: 50,
  },
  modal: {
    width: "100%",
    maxWidth: 980,
    borderRadius: 16,
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,.15)",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    borderBottom: "1px solid #eee",
  },
  iconBtn: {
    border: "none",
    background: "transparent",
    fontSize: 18,
    cursor: "pointer",
    lineHeight: 1,
  },
  body: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: 16,
    padding: 16,
  },
  left: { minWidth: 0 },
  right: { minWidth: 0 },

  carousel: {
    position: "relative",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    overflow: "hidden",
    background: "#f3f4f6",
  },
  slideWrap: { position: "relative", width: "100%", aspectRatio: "4 / 3" },
  slideImg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  placeholder: {
    display: "grid",
    placeItems: "center",
    width: "100%",
    height: "100%",
    color: "#6b7280",
    fontSize: 14,
  },
  navLeft: navBtn(-8),
  navRight: navBtn(undefined, -8),
  dots: {
    position: "absolute",
    bottom: 8,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: 6,
    padding: 6,
    borderRadius: 999,
    background: "rgba(0,0,0,.35)",
    backdropFilter: "blur(2px)",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    background: "#fff",
    border: "none",
    cursor: "pointer",
  },

  desc: { margin: 0, color: "#374151", lineHeight: 1.5 },

  metaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 10,
  },
  metaItem: {
    border: "1px solid #eee",
    borderRadius: 10,
    padding: "8px 10px",
    background: "#fafafa",
  },
  metaLabel: { fontSize: 12, color: "#6b7280", marginBottom: 2 },
  metaValue: {
    fontSize: 14,
    fontWeight: 600,
    color: "#111827",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  primaryBtn: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #111827",
    background: "#111827",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
  secondaryBtn: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    background: "#f3f4f6",
    color: "#111827",
    fontWeight: 600,
    cursor: "pointer",
  },
};

function navBtn(leftOffset, rightOffset) {
  return {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    left: leftOffset,
    right: rightOffset,
    width: 36,
    height: 36,
    borderRadius: 999,
    border: "none",
    background: "rgba(0,0,0,.55)",
    color: "#fff",
    cursor: "pointer",
    fontSize: 22,
    lineHeight: 1,
    display: "grid",
    placeItems: "center",
  };
}