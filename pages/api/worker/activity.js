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

    // Fetch recent applications
    const applications = await prisma.application.findMany({
      where: { workerId: workerProfile.id },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        jobPosting: true
      }
    });

    // Transform applications into activity format
    const activityItems = applications.map(app => {
      let type, message;
      
      switch(app.status) {
        case 'INTERVIEW':
          type = 'interview_scheduled';
          message = `Interview scheduled for ${app.jobPosting.title} at ${app.jobPosting.location}`;
          break;
        case 'ACCEPTED':
          type = 'application_accepted';
          message = `Your application for ${app.jobPosting.title} was accepted!`;
          break;
        case 'REJECTED':
          type = 'application_rejected';
          message = `Your application for ${app.jobPosting.title} was not selected`;
          break;
        case 'PENDING':
        default:
          type = 'application_submitted';
          message = `You applied for ${app.jobPosting.title} at ${app.jobPosting.location}`;
      }
      
      return {
        id: app.id,
        type: type,
        message: message,
        timestamp: app.createdAt,
        status: app.status
      };
    });

    // Return the activity data
    return res.status(200).json(activityItems);
  } catch (error) {
    console.error('Error fetching worker activity:', error);
    return res.status(500).json({ 
      message: 'Error fetching worker activity', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
