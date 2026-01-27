import crypto from "crypto";

// Texto a encriptar
//const plaintext = '{"balance":"30000","coins":"99","points":"0","points_tm":null}';

const encrypt = (plaintext) => {
  // Clave e IV en base64

// Convertir base64 → Buffer
const key = Buffer.from(process.env.KEY_B64, "base64");
const iv = Buffer.from(process.env.IV_B64, "base64");

// Crear cifrador AES-CBC
const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

// En Node el padding PKCS7 ya viene automático
let encrypted = cipher.update(plaintext, "utf8", "base64");
encrypted += cipher.final("base64");

return encrypted
console.log(encrypted);
}


export default encrypt