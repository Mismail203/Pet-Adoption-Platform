// PaymentModal.jsx
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";

export default function PaymentModal({ open, onClose, userData, pet }) {
  const backdropRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

const handlePayment = async () => {
  const petId = pet.petId; // use correct field
  if (!petId) {
    alert("Pet ID missing");
    return;
  }

  setIsProcessing(true);

  try {
    console.log("Reserving pet:", petId);

    await axios.post(
      "https://petadoptionwebapi-1.onrender.com/api/pet/Reserve",
      null,
      { params: { petId } }
    );

    const paymentData = {
      user_id: userData.id,
      email: userData.email,
      pet_id: petId,
      amount: pet.price * 100,
      currency: pet.currency || "USD",
      pet_name: pet.petName,
    };

    const queryString = new URLSearchParams(paymentData).toString();
    window.location.href = `https://stripe.faithdiscipline.org.uk/stripe-checkout.php?${queryString}`;

  } catch (err) {
    console.error("Error reserving pet:", err);
    alert("Failed to reserve the pet. Check console.");
    setIsProcessing(false);
  }
};



  if (!open) return null;

  const modal = (
    <div
      ref={backdropRef}
      onMouseDown={(e) => e.target === backdropRef.current && onClose?.()}
      style={S.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-title"
    >
      <div style={S.modal}>
        {/* Header */}
        <div style={S.header}>
          <h3 id="payment-title" style={{ margin: 0, fontSize: 18 }}>
            Complete Adoption
          </h3>
          <button onClick={onClose} aria-label="Close" style={S.iconBtn}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={S.body}>
          <div style={S.paymentDetails}>
            <h4 style={{ margin: "0 0 16px 0" }}>Adoption Summary</h4>
            
            <div style={S.detailRow}>
              <span style={S.detailLabel}>Pet:</span>
              <span style={S.detailValue}>{pet.petName}</span>
            </div>
            
            <div style={S.detailRow}>
              <span style={S.detailLabel}>Price:</span>
              <span style={S.detailValue}>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: pet.currency || "USD",
                }).format(pet.price)}
              </span>
            </div>
            
            <div style={S.detailRow}>
              <span style={S.detailLabel}>Your Email:</span>
              <span style={S.detailValue}>{userData.email}</span>
            </div>
          </div>

          <div style={S.paymentNote}>
            <p>You will be redirected to Stripe to complete your payment securely.</p>
          </div>
        </div>

        {/* Footer */}
        <div style={S.footer}>
          <button 
            style={S.secondaryBtn} 
            onClick={onClose}
            disabled={isProcessing}
          >
            Cancel
          </button>
          <button 
            style={S.primaryBtn} 
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

// Styles
const S = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.45)",
    display: "grid",
    placeItems: "center",
    padding: 16,
    zIndex: 100,
  },
  modal: {
    width: "100%",
    maxWidth: 500,
    borderRadius: 16,
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,.15)",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
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
    padding: "20px",
  },
  paymentDetails: {
    marginBottom: "20px",
    padding: "16px",
    border: "1px solid #eee",
    borderRadius: "8px",
    backgroundColor: "#fafafa",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  detailLabel: {
    fontWeight: "600",
    color: "#555",
  },
  detailValue: {
    fontWeight: "500",
  },
  paymentNote: {
    padding: "12px",
    backgroundColor: "#f0f7ff",
    borderRadius: "8px",
    border: "1px solid #c2e0ff",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    padding: "16px 20px",
    borderTop: "1px solid #eee",
  },
  primaryBtn: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    background: "#111827",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    minWidth: "140px",
  },
  secondaryBtn: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "transparent",
    color: "#555",
    fontWeight: "600",
    cursor: "pointer",
  },
};