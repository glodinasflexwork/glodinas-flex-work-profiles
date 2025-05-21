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

    // Since we don't have a SavedJob model yet in the schema,
    // we'll return some job postings as saved jobs for demonstration
    // In a real implementation, we would have a SavedJob model with a relation to JobPosting and WorkerProfile
    const jobPostings = await prisma.jobPosting.findMany({
      where: { status: 'ACTIVE' },
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        employer: true
      }
    });

    // Transform job postings into saved jobs format
    const savedJobs = jobPostings.map((job, index) => ({
      id: job.id,
      jobTitle: job.title,
      company: job.employer ? job.employer.companyName : 'Unknown Company',
      location: job.location,
      salary: job.salary || 'Not specified',
      jobType: job.jobType,
      savedDate: new Date(Date.now() - (index + 1) * 2 * 24 * 60 * 60 * 1000).toISOString(), // Random saved dates
      description: job.description,
      requirements: job.requirements || 'No specific requirements listed',
      jobId: job.id
    }));

    // Return the saved jobs data
    return res.status(200).json(savedJobs);
  } catch (error) {
    console.error('Error fetching saved jobs:', error);
    return res.status(500).json({ 
      message: 'Error fetching saved jobs', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
