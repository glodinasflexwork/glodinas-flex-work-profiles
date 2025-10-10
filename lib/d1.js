// D1 Database Helper for Cloudflare Workers
// This provides a simple interface to interact with D1 database

/**
 * Get the D1 database instance from the request context
 * @param {Request} req - The incoming request
 * @returns {D1Database} The D1 database instance
 */
export function getD1(req) {
  // In Cloudflare Workers/Pages, the DB binding is available on the request
  return req.env?.DB || global.DB;
}

/**
 * Generate a UUID v4
 * @returns {string} UUID
 */
export function generateId() {
  return crypto.randomUUID();
}

/**
 * Get current timestamp in milliseconds
 * @returns {number} Timestamp
 */
export function now() {
  return Date.now();
}

/**
 * Execute a SELECT query and return all results
 * @param {D1Database} db - D1 database instance
 * @param {string} sql - SQL query
 * @param {Array} params - Query parameters
 * @returns {Promise<Array>} Query results
 */
export async function query(db, sql, params = []) {
  const result = await db.prepare(sql).bind(...params).all();
  return result.results || [];
}

/**
 * Execute a SELECT query and return first result
 * @param {D1Database} db - D1 database instance
 * @param {string} sql - SQL query
 * @param {Array} params - Query parameters
 * @returns {Promise<Object|null>} First result or null
 */
export async function queryOne(db, sql, params = []) {
  const result = await db.prepare(sql).bind(...params).first();
  return result;
}

/**
 * Execute an INSERT/UPDATE/DELETE query
 * @param {D1Database} db - D1 database instance
 * @param {string} sql - SQL query
 * @param {Array} params - Query parameters
 * @returns {Promise<Object>} Result with meta information
 */
export async function execute(db, sql, params = []) {
  const result = await db.prepare(sql).bind(...params).run();
  return result;
}

/**
 * Execute multiple queries in a batch
 * @param {D1Database} db - D1 database instance
 * @param {Array<{sql: string, params: Array}>} queries - Array of queries
 * @returns {Promise<Array>} Results array
 */
export async function batch(db, queries) {
  const statements = queries.map(q => 
    db.prepare(q.sql).bind(...(q.params || []))
  );
  const results = await db.batch(statements);
  return results;
}

/**
 * Convert ISO date string to timestamp
 * @param {string} dateString - ISO date string
 * @returns {number} Timestamp
 */
export function dateToTimestamp(dateString) {
  return new Date(dateString).getTime();
}

/**
 * Convert timestamp to ISO date string
 * @param {number} timestamp - Timestamp
 * @returns {string} ISO date string
 */
export function timestampToDate(timestamp) {
  return new Date(timestamp).toISOString();
}

