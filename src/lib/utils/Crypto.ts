import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || "default_secret_key"; // Keep this safe!

// Encrypt Function
// 🔹 Encrypt Data
export function encryptData(data: string): string {
  const ciphertext = CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
  return btoa(ciphertext) // Encode ke Base64
    .replace(/\//g, "_") // Ganti "/" dengan "_"
    .replace(/\+/g, "-") // Ganti "+" dengan "-"
    .replace(/=+$/, ""); // Hapus "="
}

// 🔹 Decrypt Data
export function decryptData(encrypted: string): string {
  const normalized = encrypted.replace(/_/g, "/").replace(/-/g, "+"); // Kembalikan ke normal
  const bytes = CryptoJS.AES.decrypt(atob(normalized), SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}
