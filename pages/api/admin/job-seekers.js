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

  // Handle different HTTP methods
  switch (req.method) {
    case 'GET':
      return getJobSeekers(req, db);
    case 'PUT':
      return updateJobSeeker(req, db);
    case 'DELETE':
      return deleteJobSeeker(req, db);
    default:
      return new Response(JSON.stringify({ message: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
  }
}

// Get job seekers with filtering and pagination
async function getJobSeekers(req, db) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const status = url.searchParams.get('status');
    const search = url.searchParams.get('search');
    const offset = (page - 1) * limit;
    
    // Build filter conditions
    let whereClauses = [];
    let params = [];
    
    if (status) {
      whereClauses.push('status = ?');
      params.push(status);
    }
    
    if (search) {
      whereClauses.push(`(
        firstName LIKE ? OR 
        lastName LIKE ? OR 
        email LIKE ? OR 
        skills LIKE ? OR 
        preferredLocation LIKE ?
      )`);
      const searchPattern = `%${search}%`;
      params.push(searchPattern, searchPattern, searchPattern, searchPattern, searchPattern);
    }
    
    const whereClause = whereClauses.length > 0 ? 'WHERE ' + whereClauses.join(' AND ') : '';
    
    // Get job seekers with pagination
    const jobSeekers = await query(db, `
      SELECT * FROM JobSeeker
      ${whereClause}
      ORDER BY createdAt DESC
      LIMIT ? OFFSET ?
    `, [...params, limit, offset]);
    
    // Get total count for pagination
    const countResult = await queryOne(db, `
      SELECT COUNT(*) as total FROM JobSeeker
      ${whereClause}
    `, params);
    const total = countResult?.total || 0;
    
    return new Response(JSON.stringify({
      data: jobSeekers,
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
    console.error('Error fetching job seekers:', error);
    return new Response(JSON.stringify({ message: 'Error fetching job seekers', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Update job seeker status
async function updateJobSeeker(req, db) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    const body = await req.json();
    const { status } = body;
    
    if (!id) {
      return new Response(JSON.stringify({ message: 'Job seeker ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (!status || !['pending', 'reviewed', 'matched'].includes(status)) {
      return new Response(JSON.stringify({ message: 'Valid status is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    await execute(db, 
      'UPDATE JobSeeker SET status = ? WHERE id = ?',
      [status, id]
    );
    
    const jobSeeker = await queryOne(db, 
      'SELECT * FROM JobSeeker WHERE id = ?',
      [id]
    );
    
    return new Response(JSON.stringify({ 
      success: true,
      message: 'Job seeker status updated successfully',
      data: jobSeeker
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error updating job seeker:', error);
    return new Response(JSON.stringify({ message: 'Error updating job seeker', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Delete job seeker
async function deleteJobSeeker(req, db) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return new Response(JSON.stringify({ message: 'Job seeker ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    await execute(db, 
      'DELETE FROM JobSeeker WHERE id = ?',
      [id]
    );
    
    return new Response(JSON.stringify({ 
      success: true,
      message: 'Job seeker deleted successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error deleting job seeker:', error);
    return new Response(JSON.stringify({ message: 'Error deleting job seeker', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

