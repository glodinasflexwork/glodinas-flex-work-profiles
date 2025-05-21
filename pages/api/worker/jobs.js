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

    // Get query parameters for filtering
    const { search, location, jobType } = req.query;

    // Build the where clause for filtering
    let whereClause = {
      status: 'ACTIVE'
    };

    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      };
    }

    if (location) {
      whereClause = {
        ...whereClause,
        location: { contains: location, mode: 'insensitive' }
      };
    }

    if (jobType) {
      whereClause = {
        ...whereClause,
        jobType: jobType
      };
    }

    // Fetch job postings from the database
    const jobPostings = await prisma.jobPosting.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      include: {
        employer: true
      }
    });

    // Transform job postings into the expected format
    const jobs = jobPostings.map(job => ({
      id: job.id,
      title: job.title,
      company: job.employer ? job.employer.companyName : 'Unknown Company',
      location: job.location,
      salary: job.salary || 'Competitive',
      jobType: job.jobType,
      postedDate: job.createdAt.toISOString(),
      description: job.description,
      requirements: job.requirements || 'No specific requirements listed',
      benefits: 'Flexible working hours, competitive salary, and professional development opportunities.'
    }));

    // If no jobs found, add some placeholder jobs for demo purposes
    if (jobs.length === 0) {
      const demoJobs = [
        {
          id: 'demo-1',
          title: 'Senior Frontend Developer',
          company: 'Tech Innovations BV',
          location: 'Amsterdam',
          salary: '€60,000 - €75,000',
          jobType: 'FULL_TIME',
          postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          description: 'We are looking for an experienced Frontend Developer with React expertise to join our growing team.',
          requirements: 'Minimum 5 years of experience with modern JavaScript frameworks, preferably React.',
          benefits: 'Flexible working hours, remote work options, competitive salary, and professional development opportunities.'
        },
        {
          id: 'demo-2',
          title: 'UX/UI Designer',
          company: 'Creative Solutions',
          location: 'Rotterdam',
          salary: '€45,000 - €55,000',
          jobType: 'FULL_TIME',
          postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          description: 'Join our creative team to design beautiful and functional user interfaces for our clients.',
          requirements: 'Portfolio showcasing UI/UX projects, proficiency in Figma and Adobe Creative Suite.',
          benefits: 'Creative work environment, international clients, and growth opportunities.'
        }
      ];
      
      return res.status(200).json(demoJobs);
    }

    // Return the jobs data
    return res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return res.status(500).json({ 
      message: 'Error fetching jobs', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
