import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

// Initialize Prisma Client
let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get the user session
    const session = await getSession({ req });
    
    // Check if user is authenticated and is a worker
    if (!session || session.user.role !== 'WORKER') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Get user ID from session
    const userId = session.user.id;

    // Get worker profile ID
    const workerProfile = await prisma.workerProfile.findUnique({
      where: { userId: userId }
    });

    if (!workerProfile) {
      return res.status(404).json({ message: 'Worker profile not found' });
    }

    // Fetch applications from the database
    const applications = await prisma.application.findMany({
      where: { workerId: workerProfile.id },
      orderBy: { createdAt: 'desc' },
      include: {
        jobPosting: true
      }
    });

    // Map the applications to the expected format
    const formattedApplications = applications.map(app => ({
      id: app.id,
      jobTitle: app.jobPosting.title,
      company: app.jobPosting.employer ? app.jobPosting.employer.companyName : 'Unknown Company',
      location: app.jobPosting.location,
      appliedDate: app.createdAt,
      status: app.status,
      jobId: app.jobPostingId
    }));

    // Return the applications data
    return res.status(200).json(formattedApplications);
  } catch (error) {
    console.error('Error fetching worker applications:', error);
    return res.status(500).json({ 
      message: 'Error fetching worker applications', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
