export const runtime = 'edge';

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Get token from cookie
    const cookies = req.headers.get('cookie') || '';
    const tokenMatch = cookies.match(/auth-token=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (token) {
      // Get D1 database binding from environment
      const db = process.env.DB;

      // Delete session from database
      await db.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run();
    }

    // Clear cookie
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': 'auth-token=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/',
      },
    });
  } catch (error) {
    console.error('Logout error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

