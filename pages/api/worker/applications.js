import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const session = await getSession({ req });
  
  // Check authentication
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // Check if user is a worker
  if (session.user.role !== 'WORKER') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  const userId = session.user.id;
  
  // Handle GET request - fetch applications
  if (req.method === 'GET') {
    try {
      // Find worker applications
      const applications = await prisma.jobApplication.findMany({
        where: { 
          applicantId: userId 
        },
        include: {
          job: {
            select: {
              title: true,
              location: true,
              company: {
                select: {
                  name: true
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      
      // Format applications for frontend
      const formattedApplications = applications.map(app => ({
        id: app.id,
        jobTitle: app.job.title,
        company: app.job.company.name,
        location: app.job.location,
        appliedDate: app.createdAt,
        status: app.status,
        interviewDate: app.interviewDate,
        notes: app.notes
      }));
      
      return res.status(200).json(formattedApplications);
    } catch (error) {
      console.error('Error fetching worker applications:', error);
      return res.status(500).json({ error: 'Failed to fetch applications' });
    }
  }
  
  // Handle unsupported methods
  return res.status(405).json({ error: 'Method not allowed' });
}
