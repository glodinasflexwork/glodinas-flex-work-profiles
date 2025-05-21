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
  
  // Handle GET request - fetch activity
  if (req.method === 'GET') {
    try {
      // Get recent activity (applications, interviews, saved jobs)
      const recentApplications = await prisma.jobApplication.findMany({
        where: { applicantId: userId },
        orderBy: { createdAt: 'desc' },
        take: 3,
        include: {
          job: {
            select: {
              title: true,
              company: {
                select: { name: true }
              }
            }
          }
        }
      });
      
      const recentInterviews = await prisma.interview.findMany({
        where: { applicantId: userId },
        orderBy: { scheduledAt: 'desc' },
        take: 3,
        include: {
          job: {
            select: {
              title: true,
              company: {
                select: { name: true }
              }
            }
          }
        }
      });
      
      const recentSavedJobs = await prisma.savedJob.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 3,
        include: {
          job: {
            select: {
              title: true,
              company: {
                select: { name: true }
              }
            }
          }
        }
      });
      
      // Format activity for frontend
      const activity = [
        ...recentApplications.map(app => ({
          id: `app-${app.id}`,
          type: 'application_submitted',
          message: `You applied for ${app.job.title} at ${app.job.company.name}`,
          timestamp: app.createdAt,
          relatedId: app.id
        })),
        ...recentInterviews.map(interview => ({
          id: `int-${interview.id}`,
          type: 'interview_scheduled',
          message: `Interview scheduled for ${interview.job.title} at ${interview.job.company.name}`,
          timestamp: interview.createdAt,
          interviewDate: interview.scheduledAt,
          relatedId: interview.id
        })),
        ...recentSavedJobs.map(saved => ({
          id: `save-${saved.id}`,
          type: 'job_saved',
          message: `You saved ${saved.job.title} at ${saved.job.company.name}`,
          timestamp: saved.createdAt,
          relatedId: saved.jobId
        }))
      ];
      
      // Sort by timestamp (newest first)
      activity.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      // Take only the 5 most recent activities
      const recentActivity = activity.slice(0, 5);
      
      return res.status(200).json(recentActivity);
    } catch (error) {
      console.error('Error fetching worker activity:', error);
      return res.status(500).json({ error: 'Failed to fetch activity' });
    }
  }
  
  // Handle unsupported methods
  return res.status(405).json({ error: 'Method not allowed' });
}
