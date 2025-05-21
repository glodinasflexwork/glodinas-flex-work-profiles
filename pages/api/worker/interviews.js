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

    // Fetch applications with INTERVIEW status from the database
    const applications = await prisma.application.findMany({
      where: { 
        workerId: workerProfile.id,
        status: 'INTERVIEW'
      },
      orderBy: { updatedAt: 'desc' },
      include: {
        jobPosting: {
          include: {
            employer: true
          }
        }
      }
    });

    // Transform applications into interviews format
    const interviews = applications.map((app, index) => {
      // Generate interview date (some in the future, some in the past)
      const daysOffset = index % 2 === 0 ? (index + 1) * 2 : -(index + 1) * 3;
      const interviewDate = new Date(Date.now() + daysOffset * 24 * 60 * 60 * 1000);
      
      // Determine interview type based on index
      const interviewTypes = ['Video Call', 'In-Person', 'Phone Call'];
      const interviewType = interviewTypes[index % interviewTypes.length];
      
      return {
        id: app.id,
        jobTitle: app.jobPosting.title,
        company: app.jobPosting.employer ? app.jobPosting.employer.companyName : 'Unknown Company',
        location: app.jobPosting.location,
        interviewDate: interviewDate.toISOString(),
        interviewType: interviewType,
        interviewLink: interviewType === 'Video Call' ? 'https://zoom.us/j/123456789' : null,
        interviewLocation: interviewType === 'In-Person' ? app.jobPosting.location : null,
        contactPerson: app.jobPosting.employer ? app.jobPosting.employer.contactPerson : 'HR Department',
        contactEmail: 'contact@example.com', // Placeholder as we don't have this in the schema
        notes: `Interview for ${app.jobPosting.title} position. Please prepare accordingly.`,
        status: interviewDate > new Date() ? 'UPCOMING' : 'COMPLETED',
        applicationId: app.id,
        jobId: app.jobPostingId
      };
    });

    // If no interviews found, add a placeholder interview for demo purposes
    if (interviews.length === 0) {
      interviews.push({
        id: 'demo-1',
        jobTitle: 'Frontend Developer',
        company: 'Tech Innovations BV',
        location: 'Amsterdam',
        interviewDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        interviewType: 'Video Call',
        interviewLink: 'https://zoom.us/j/123456789',
        contactPerson: 'Michael Brown',
        contactEmail: 'michael@example.com',
        notes: 'Technical interview with the development team, bring laptop for coding exercise',
        status: 'UPCOMING',
        applicationId: 'demo-app-1',
        jobId: 'demo-job-1'
      });
    }

    // Return the interviews data
    return res.status(200).json(interviews);
  } catch (error) {
    console.error('Error fetching interviews:', error);
    return res.status(500).json({ 
      message: 'Error fetching interviews', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
