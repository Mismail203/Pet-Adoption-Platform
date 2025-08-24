import axios from "axios";

export const gateway = "https://petgatewayapi.onrender.com";
const CLOUD_NAME = "duighpvyh";
const UPLOAD_PRESET = "ADOPTED_PET_IMAGES";

async function uploadToCloudinary(file) {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: fd,
    }
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || "Upload failed");
  }
  const data = await res.json();
  return data.secure_url; // <- public image URL
}
export async function addPetImage(petId, file) {
  const url = await uploadToCloudinary(file);

  // Your existing endpoint expects URLs
  await axios.post(
    `${gateway}/addImages`,
    {
      petId,
      imageUrls: [url],
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return url;
}
