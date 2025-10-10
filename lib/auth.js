import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

/**
 * Hash a password using bcrypt
 * @param {string} password - Plain text password
 * @returns {Promise<string>} - Hashed password
 */
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compare a plain text password with a hashed password
 * @param {string} password - Plain text password
 * @param {string} hashedPassword - Hashed password
 * @returns {Promise<boolean>} - True if passwords match
 */
export async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Generate a JWT token for a user
 * @param {object} user - User object
 * @returns {string} - JWT token
 */
export function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

/**
 * Verify a JWT token
 * @param {string} token - JWT token
 * @returns {object|null} - Decoded token or null if invalid
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
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

