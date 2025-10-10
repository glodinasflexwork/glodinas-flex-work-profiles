import { getAuth } from '@clerk/nextjs/server';
import prisma from '../../../lib/prisma';
export default async function handler(req, res) {
  // Check authentication with Clerk
  const { userId } = getAuth(req);
  
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Get user from database
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { role: true, id: true }
  });

  if (!user) {
    return res.status(403).json({ message: 'User not found' });
  }
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get the user session
    const session = await auth();
    
    // Check if user is authenticated and is a worker
    if (!user || user.role !== 'WORKER') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Get user ID from session
    const userId = user.id;

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
