import { getAuth } from '@clerk/nextjs/server';
import { query, queryOne, execute, now } from '../../../lib/d1';

export const runtime = 'edge';

export default async function handler(req) {
  // Check authentication with Clerk
  const { userId } = getAuth(req);
  
  if (!userId) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Get DB instance
  const db = req.env?.DB || process.env.DB;
  if (!db) {
    return new Response(JSON.stringify({ message: 'Database not available' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Get user from database to check role
  const user = await queryOne(db, 
    'SELECT role FROM User WHERE clerkId = ?',
    [userId]
  );

  if (!user || user.role !== 'ADMIN') {
    return new Response(JSON.stringify({ message: 'Forbidden: Admin access required' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (req.method === 'GET') {
    try {
      const url = new URL(req.url);
      const status = url.searchParams.get('status');
      const page = parseInt(url.searchParams.get('page') || '1');
      const limit = parseInt(url.searchParams.get('limit') || '10');
      const offset = (page - 1) * limit;

      let employersSql = `
        SELECT 
          e.*,
          u.email as userEmail,
          u.name as userName,
          u.createdAt as userCreatedAt,
          s.tier as subscriptionTier,
          s.jobPostingLimit,
          s.activeJobsCount
        FROM EmployerProfile e
        LEFT JOIN User u ON e.userId = u.id
        LEFT JOIN Subscription s ON e.id = s.employerId
      `;
      
      const params = [];
      if (status) {
        employersSql += ' WHERE e.status = ?';
        params.push(status);
      }
      
      employersSql += ' ORDER BY e.createdAt DESC LIMIT ? OFFSET ?';
      params.push(limit, offset);

      const employers = await query(db, employersSql, params);

      // Get total count
      let countSql = 'SELECT COUNT(*) as total FROM EmployerProfile';
      const countParams = [];
      if (status) {
        countSql += ' WHERE status = ?';
        countParams.push(status);
      }
      const countResult = await queryOne(db, countSql, countParams);
      const total = countResult?.total || 0;

      return new Response(JSON.stringify({
        employers: employers.map(e => ({
          ...e,
          user: {
            email: e.userEmail,
            name: e.userName,
            createdAt: e.userCreatedAt
          },
          subscription: e.subscriptionTier ? {
            tier: e.subscriptionTier,
            jobPostingLimit: e.jobPostingLimit,
            activeJobsCount: e.activeJobsCount
          } : null
        })),
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error fetching employers:', error);
      return new Response(JSON.stringify({ message: 'Error fetching employers' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  if (req.method === 'PUT') {
    try {
      const body = await req.json();
      const { id, status } = body;

      if (!id || !status) {
        return new Response(JSON.stringify({ message: 'Missing required fields' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      await execute(db,
        'UPDATE EmployerProfile SET status = ?, updatedAt = ? WHERE id = ?',
        [status, now(), id]
      );

      // Fetch updated employer with user info
      const updatedEmployer = await queryOne(db, `
        SELECT 
          e.*,
          u.email as userEmail,
          u.name as userName
        FROM EmployerProfile e
        LEFT JOIN User u ON e.userId = u.id
        WHERE e.id = ?
      `, [id]);

      return new Response(JSON.stringify({
        ...updatedEmployer,
        user: {
          email: updatedEmployer.userEmail,
          name: updatedEmployer.userName
        }
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error updating employer:', error);
      return new Response(JSON.stringify({ message: 'Error updating employer' }), {
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

