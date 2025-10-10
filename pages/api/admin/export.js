import { getAuth } from '@clerk/nextjs/server';
import { query } from '../../../lib/d1';

export const runtime = 'edge';

export default async function handler(req) {
  const { userId } = getAuth(req);
  
  if (!userId) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const db = req.env?.DB || process.env.DB;
  if (!db) {
    return new Response(JSON.stringify({ message: 'Database not available' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (req.method === 'GET') {
    try {
      const url = new URL(req.url);
      const type = url.searchParams.get('type');

      let data;
      if (type === 'employers') {
        data = await query(db, 'SELECT * FROM Employer ORDER BY createdAt DESC', []);
      } else if (type === 'job-seekers') {
        data = await query(db, 'SELECT * FROM JobSeeker ORDER BY createdAt DESC', []);
      } else {
        return new Response(JSON.stringify({ message: 'Invalid export type' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="${type}-export.json"`
        }
      });
    } catch (error) {
      console.error('Error exporting data:', error);
      return new Response(JSON.stringify({ message: 'Error exporting data' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  return new Response(JSON.stringify({ message: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
}
