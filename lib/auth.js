import { SignJWT, jwtVerify } from 'jose';
import { v4 as uuidv4 } from 'uuid';

// For password hashing, we need an Edge-compatible library. 
// For now, we'll use a placeholder or a simple hash, but this needs a proper solution.
// A common approach for Edge is to use Web Crypto API for hashing, 
// or a library like `argon2-browser` if its compatible with Edge Runtime.
// For demonstration, we'll use a simple placeholder for hashing.

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key-change-in-production');
const JWT_EXPIRES_IN = '7d';

/**
 * Hash a password (placeholder - replace with a proper Edge-compatible hashing)
 * @param {string} password - Plain text password
 * @returns {Promise<string>} - Hashed password
 */
export async function hashPassword(password) {
  // This is a placeholder. In a real application, use a strong, Edge-compatible hashing algorithm.
  // For example, using Web Crypto API or a library like `argon2-browser`.
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedPassword = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashedPassword;
}

/**
 * Compare a plain text password with a hashed password (placeholder)
 * @param {string} password - Plain text password
 * @param {string} hashedPassword - Hashed password
 * @returns {Promise<boolean>} - True if passwords match
 */
export async function comparePassword(password, hashedPassword) {
  const newHashedPassword = await hashPassword(password);
  return newHashedPassword === hashedPassword;
}

/**
 * Generate a JWT token for a user
 * @param {object} user - User object
 * @returns {Promise<string>} - JWT token
 */
export async function generateToken(user) {
  return new SignJWT(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    }
  )
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(JWT_SECRET);
}

/**
 * Verify a JWT token
 * @param {string} token - JWT token
 * @returns {Promise<object|null>} - Decoded token or null if invalid
 */
export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}

/**
 * Generate a unique user ID
 * @returns {string} - Unique user ID
 */
export function generateUserId() {
  return uuidv4();
}

/**
 * Generate a unique session ID
 * @returns {string} - Unique session ID
 */
export function generateSessionId() {
  return uuidv4();
}

/**
 * Calculate session expiration date
 * @param {number} days - Number of days until expiration
 * @returns {Date} - Expiration date
 */
export function getSessionExpiration(days = 7) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

