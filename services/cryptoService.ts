
/**
 * Servicio de Criptografía utilizando Web Crypto API
 * Implementa AES-GCM (Advanced Encryption Standard with Galois/Counter Mode)
 */

const ITERATIONS = 100000;
const KEY_LENGTH = 256;
const SALT_LENGTH = 16;
const IV_LENGTH = 12;

// Codificador/Decodificador para manejar strings y bytes
const encoder = new TextEncoder();
const decoder = new TextDecoder();

/**
 * Deriva una llave criptográfica a partir de un password y un salt usando PBKDF2
 */
async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const passwordKey = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: ITERATIONS,
      hash: 'SHA-256',
    },
    passwordKey,
    { name: 'AES-GCM', length: KEY_LENGTH },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encripta un texto usando AES-GCM
 * Retorna una cadena Base64 que contiene [salt + iv + ciphertext]
 */
export async function encryptText(text: string, password: string): Promise<string> {
  const salt = window.crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const iv = window.crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  
  const key = await deriveKey(password, salt);
  const encryptedContent = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(text)
  );

  const encryptedBytes = new Uint8Array(encryptedContent);
  const combined = new Uint8Array(salt.length + iv.length + encryptedBytes.length);
  
  combined.set(salt, 0);
  combined.set(iv, salt.length);
  combined.set(encryptedBytes, salt.length + iv.length);

  return btoa(String.fromCharCode(...combined));
}

/**
 * Desencripta un texto previamente encriptado con esta misma lógica
 */
export async function decryptText(encryptedBase64: string, password: string): Promise<string> {
  try {
    const combined = new Uint8Array(
      atob(encryptedBase64)
        .split('')
        .map((c) => c.charCodeAt(0))
    );

    const salt = combined.slice(0, SALT_LENGTH);
    const iv = combined.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
    const ciphertext = combined.slice(SALT_LENGTH + IV_LENGTH);

    const key = await deriveKey(password, salt);
    
    const decryptedContent = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      ciphertext
    );

    return decoder.decode(decryptedContent);
  } catch (error) {
    throw new Error('Clave incorrecta o datos corruptos');
  }
}
