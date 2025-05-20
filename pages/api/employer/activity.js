import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  // Check authentication and authorization
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  if (session.user.role !== 'EMPLOYER') {
    return res.status(403).json({ message: 'Forbidden: Employer access only' });
  }

  // Handle GET request to fetch employer activity
  if (req.method === 'GET') {
    try {
      // Get employer profile ID
      const employerProfile = await prisma.employerProfile.findUnique({
        where: {
          userId: session.user.id
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
