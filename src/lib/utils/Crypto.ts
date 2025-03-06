import CryptoJS from "crypto-js";

const CRYPTO_KEY = process.env.NEXT_PUBLIC_APP_CRYPTO_KEY;

if (!CRYPTO_KEY) {
    throw new Error("NEXT_PUBLIC_APP_CRYPTO_KEY is not defined");
}

export const encryptLS = (data: unknown): string => {
    try {
        const stringData = typeof data === "string" ? data : JSON.stringify(data);
        return CryptoJS.AES.encrypt(stringData, CRYPTO_KEY).toString();
    } catch (error) {
        console.error("Encryption error:", error);
        return "";
    }
};

export const decryptLS = (encryptedData: string): unknown => {
    if (!encryptedData) return null;

    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, CRYPTO_KEY);
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedString);
    } catch (error) {
        console.error("Decryption error:", error);
        return null;
    }
};
