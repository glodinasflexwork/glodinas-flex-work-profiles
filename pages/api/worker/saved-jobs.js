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
  
  // Handle GET request - fetch saved jobs
  if (req.method === 'GET') {
    try {
      // Find worker saved jobs
      const savedJobs = await prisma.savedJob.findMany({
        where: { 
          userId 
        },
        include: {
          job: {
            select: {
              id: true,
              title: true,
              location: true,
              salary: true,
              jobType: true,
              description: true,
              requirements: true,
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
      
      // Format saved jobs for frontend
      const formattedSavedJobs = savedJobs.map(saved => ({
        id: saved.job.id,
        jobTitle: saved.job.title,
        company: saved.job.company.name,
        location: saved.job.location,
        salary: saved.job.salary,
        jobType: saved.job.jobType,
        savedDate: saved.createdAt,
        description: saved.job.description,
        requirements: saved.job.requirements
      }));
      
      return res.status(200).json(formattedSavedJobs);
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      return res.status(500).json({ error: 'Failed to fetch saved jobs' });
    }
  }
  
  // Handle POST request - save a job
  if (req.method === 'POST') {
    try {
      const { jobId } = req.body;
      
      if (!jobId) {
        return res.status(400).json({ error: 'Job ID is required' });
      }
      
      // Check if job exists
      const job = await prisma.job.findUnique({
        where: { id: jobId }
      });
      
      if (!job) {
        return res.status(404).json({ error: 'Job not found' });
      }
      
      // Check if job is already saved
      const existingSavedJob = await prisma.savedJob.findFirst({
        where: {
          userId,
          jobId
        }
      });
      
      if (existingSavedJob) {
        return res.status(400).json({ error: 'Job already saved' });
      }
      
      // Save the job
      const savedJob = await prisma.savedJob.create({
        data: {
          user: {
            connect: { id: userId }
          },
          job: {
            connect: { id: jobId }
          }
        }
      });
      
      return res.status(201).json({ success: true, savedJob });
    } catch (error) {
      console.error('Error saving job:', error);
      return res.status(500).json({ error: 'Failed to save job' });
    }
  }
  
  // Handle DELETE request - remove a saved job
  if (req.method === 'DELETE') {
    try {
      const { jobId } = req.query;
      
      if (!jobId) {
        return res.status(400).json({ error: 'Job ID is required' });
      }
      
      // Delete the saved job
      await prisma.savedJob.deleteMany({
        where: {
          userId,
          jobId
        }
      });
      
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error removing saved job:', error);
      return res.status(500).json({ error: 'Failed to remove saved job' });
    }
  }
  
  // Handle unsupported methods
  return res.status(405).json({ error: 'Method not allowed' });
}
