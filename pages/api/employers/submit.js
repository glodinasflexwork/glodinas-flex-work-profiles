import { execute, generateId, now } from '../../../lib/d1';

export const runtime = 'edge';

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
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

  try {
    const body = await req.json();
    const {
      companyName,
      contactPerson,
      email,
      phone,
      industry,
      jobRequirements,
      workersNeeded,
      location
    } = body;

    // Validate required fields
    if (!companyName || !contactPerson || !email || !phone || !industry || !jobRequirements || !workersNeeded || !location) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ message: 'Invalid email format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Insert employer submission
    const id = generateId();
    await execute(db, `
      INSERT INTO Employer (
        id, companyName, contactPerson, email, phone, 
        industry, jobRequirements, workersNeeded, location, 
        createdAt, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      id,
      companyName,
      contactPerson,
      email,
      phone,
      industry,
      jobRequirements,
      parseInt(workersNeeded),
      location,
      now(),
      'pending'
    ]);

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Employer submission received successfully',
      data: { id }
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error submitting employer form:', error);
    return new Response(JSON.stringify({ 
      success: false,
      message: 'An error occurred while processing your submission'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

