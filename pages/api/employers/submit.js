import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      companyName,
      contactPerson,
      email,
      phone,
      industry,
      jobRequirements,
      workersNeeded,
      location
    } = req.body;

    // Validate required fields
    if (!companyName || !contactPerson || !email || !phone || !industry || !jobRequirements || !workersNeeded || !location) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Create employer record in database
    const employer = await prisma.employer.create({
      data: {
        companyName,
        contactPerson,
        email,
        phone,
        industry,
        jobRequirements,
        workersNeeded: parseInt(workersNeeded),
        location,
        status: 'pending'
      }
    });

    return res.status(201).json({ 
      success: true, 
      message: 'Employer submission received successfully',
      data: employer 
    });
  } catch (error) {
    console.error('Error submitting employer form:', error);
    return res.status(500).json({ 
      success: false,
      message: 'An error occurred while processing your submission' 
    });
  }
}
