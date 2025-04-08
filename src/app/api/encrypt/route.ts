import { NextResponse } from "next/server";
import crypto from "crypto";

const SECRET_KEY = process.env.SECRET_KEY || "default_secret_key"; // 32-byte key required
const IV_LENGTH = 16; // AES requires a 16-byte IV

// Function to encrypt data
function encryptData(data: string) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(SECRET_KEY.padEnd(32, "0")),
    iv
  );

  let encrypted = cipher.update(data, "utf-8", "hex");
  encrypted += cipher.final("hex");

  return {
    encryptedData: encrypted,
    iv: iv.toString("hex"),
  };
}

// Function to decrypt data
function decryptData(encryptedData: string, iv: string) {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(SECRET_KEY.padEnd(32, "0")),
    Buffer.from(iv, "hex")
  );

  let decrypted = decipher.update(encryptedData, "hex", "utf-8");
  decrypted += decipher.final("utf-8");

  return decrypted;
}

// Handle POST requests for encryption
export async function POST(req: Request) {
  const { data } = await req.json();
  if (!data)
    return NextResponse.json({ error: "No data provided" }, { status: 400 });

  const encrypted = encryptData(data);
  return NextResponse.json(encrypted);
}

// Handle GET requests for decryption
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const encryptedData = searchParams.get("encryptedData");
  const iv = searchParams.get("iv");

  if (!encryptedData || !iv)
    return NextResponse.json(
      { error: "Missing encrypted data or IV" },
      { status: 400 }
    );

  try {
    const decrypted = decryptData(encryptedData, iv);
    return NextResponse.json({ decrypted });
  } catch (error) {
    return NextResponse.json({ error: "Decryption failed" }, { status: 500 });
  }
}
