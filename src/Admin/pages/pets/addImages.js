// AddImageModal.jsx
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gateway } from "../helper"; // e.g. https://petgatewayapi.onrender.com

// TODO: fill these from env or config
const CLOUD_NAME = "duighpvyh";
const UPLOAD_PRESET = "Adoption_pet_images";

function Modal({ open, title, children, onClose }) {
  const backdropRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const modal = (
    <div
      ref={backdropRef}
      onMouseDown={(e) => e.target === backdropRef.current && onClose?.()}
      style={styles.backdrop}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div style={styles.modal}>
        <div style={styles.header}>
          <h3 id="modal-title" style={{ margin: 0 }}>
            {title || "Add Image"}
          </h3>
          <button onClick={onClose} aria-label="Close" style={styles.iconBtn}>
            ✕
          </button>
        </div>
        <div style={styles.body}>{children}</div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

export default function AddImageModal({
  open,
  pet, // expects { petId: number, ... }
  onClose,
  onAdded, // optional: (createdImages) => void
}) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setFile(null);
      setPreview("");
      setError("");
      setBusy(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  function onSelect(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    // (Optional) size limit e.g. 5MB
    if (f.size > 5 * 1024 * 1024) {
      setError("Max size is 5MB.");
      return;
    }
    setError("");
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function uploadToCloudinary(imageFile) {
    const fd = new FormData();
    fd.append("file", imageFile);
    fd.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: fd,
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error?.message || "Upload failed");
    }
    return data.secure_url; // public URL
  }

  const handleAdd = async () => {
    if (!pet?.petId) {
      setError("Missing petId.");
      return;
    }
    if (!file) {
      setError("Please choose an image file.");
      return;
    }

    try {
      setBusy(true);
      // 1) Upload file to Cloudinary -> get URL
      const imageUrl = await uploadToCloudinary(file);
      // 2) Call your existing URL-based endpoint through the gateway
      const payload = { petId: pet.petId, imageUrls: [imageUrl] };
      const res = await axios.post(`${gateway}/addImages`, payload, {
        //       const res = await axios.post(
        //         `https://petadoptionwebapi-1.onrender.com/api/Pet/add-images
        // `,
        //         payload,
        //         {
        headers: { "Content-Type": "application/json" },
      });

      onAdded?.(res.data); // [{ imageId, url }, ...]
      alert("Image added successfully!");
      onClose?.();
    } catch (err) {
      console.error(
        "❌ Image upload failed:",
        err?.response?.data || err.message
      );
      const status = err?.response?.status;
      setError(
        typeof err?.response?.data === "string"
          ? err.response.data
          : err.message || "Failed to upload image."
      );
      alert(`Failed to upload image${status ? ` (HTTP ${status})` : ""}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Add image">
      <div style={{ display: "grid", gap: 12 }}>
        <label style={{ fontWeight: 600 }}>Choose an image</label>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onSelect}
          disabled={busy}
          style={styles.inputFile}
        />

        {preview && (
          <div style={styles.previewWrap}>
            {/* eslint-disable-next-line */}
            <img src={preview} alt="preview" style={styles.previewImg} />
          </div>
        )}

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.actions}>
          <button
            type="button"
            onClick={onClose}
            style={styles.btnSecondary}
            disabled={busy}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!file || busy}
            style={{ ...styles.btnPrimary, opacity: !file || busy ? 0.7 : 1 }}
          >
            {busy ? "Uploading..." : "Add"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ----- styles -----
const styles = {
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
    maxWidth: 520,
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
  body: { padding: 16 },
  inputFile: {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    background: "#fff",
  },
  error: { color: "#b91c1c", fontSize: 12 },
  previewWrap: {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    overflow: "hidden",
    background: "#f3f4f6",
  },
  previewImg: {
    width: "100%",
    height: 240,
    objectFit: "cover",
    display: "block",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 8,
  },
  btnSecondary: {
    padding: "10px 14px",
    borderRadius: 10,
    background: "#f3f4f6",
    border: "1px solid #e5e7eb",
    cursor: "pointer",
  },
  btnPrimary: {
    padding: "10px 14px",
    borderRadius: 10,
    background: "#111827",
    border: "1px solid #111827",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  },
};
