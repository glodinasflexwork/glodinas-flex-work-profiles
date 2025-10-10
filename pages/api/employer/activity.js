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
  // Check authentication and authorization
  const session = await auth();
  
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  if (user.role !== 'EMPLOYER') {
    return res.status(403).json({ message: 'Forbidden: Employer access only' });
  }

  // Handle GET request to fetch employer activity
  if (req.method === 'GET') {
    try {
      // Get employer profile ID
      const employerProfile = await prisma.employerProfile.findUnique({
        where: {
          userId: user.id
        }
      });
      
      if (!employerProfile) {
        return res.status(404).json({ message: 'Employer profile not found' });
      }
      
      // For now, generate mock activity data
      // In a real implementation, this would come from a database table
      const mockActivity = [
        {
          type: 'job_created',
          message: 'You created a new job posting: "Senior Software Developer"',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
        },
        {
          type: 'candidate_match',
          message: 'New candidate match (85%) for "Frontend Developer"',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
        },
        {
          type: 'job_status_change',
          message: 'Job posting "Marketing Specialist" changed to Active',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
        },
        {
          type: 'candidate_match',
          message: 'New candidate match (72%) for "Frontend Developer"',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
        },
        {
          type: 'job_created',
          message: 'You created a new job posting: "Frontend Developer"',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
        }
      ];
      
      return res.status(200).json(mockActivity);
    } catch (error) {
      console.error('Error fetching employer activity:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  // Return 405 for unsupported methods
  return res.status(405).json({ message: 'Method not allowed' });
}
