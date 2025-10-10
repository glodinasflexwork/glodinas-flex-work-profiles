import { hashPassword, generateUserId, generateToken, generateSessionId, getSessionExpiration } from '../../../lib/auth';

export const runtime = 'edge';

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { email, password, name, role = 'user' } = await req.json();

    // Validate input
    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate password strength
    if (password.length < 8) {
      return new Response(JSON.stringify({ error: 'Password must be at least 8 characters long' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get D1 database binding from environment
    const db = process.env.DB;

    // Check if user already exists
    const existingUser = await db.prepare('SELECT id FROM users WHERE email = ?').bind(email).first();

    if (existingUser) {
      return new Response(JSON.stringify({ error: 'User already exists' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Generate user ID
    const userId = generateUserId();

    // Insert user into database
    await db.prepare(
      'INSERT INTO users (id, email, password, name, role) VALUES (?, ?, ?, ?, ?)'
    ).bind(userId, email, hashedPassword, name || null, role).run();

    // Generate JWT token
    const token = generateToken({ id: userId, email, role });

    // Create session
    const sessionId = generateSessionId();
    const expiresAt = getSessionExpiration(7);

    await db.prepare(
      'INSERT INTO sessions (id, user_id, token, expires_at) VALUES (?, ?, ?, ?)'
    ).bind(sessionId, userId, token, expiresAt.toISOString()).run();

    // Return success response with token
    return new Response(JSON.stringify({
      success: true,
      token,
      user: {
        id: userId,
        email,
        name: name || null,
        role,
      },
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `auth-token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}; Path=/`,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

