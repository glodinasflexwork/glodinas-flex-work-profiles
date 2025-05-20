import { getSession } from "next-auth/react";
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  // Check authentication
  const session = await getSession({ req });
  if (!session || !session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Verify admin role
  const admin = await prisma.admin.findUnique({
    where: { email: session.user.email }
  });

  if (!admin) {
    return res.status(403).json({ message: 'Forbidden: Admin access required' });
  }

  // Handle different HTTP methods
  switch (req.method) {
    case 'GET':
      return getJobSeekers(req, res);
    case 'PUT':
      return updateJobSeeker(req, res);
    case 'DELETE':
      return deleteJobSeeker(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

// Get job seekers with filtering and pagination
async function getJobSeekers(req, res) {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build filter conditions
    const where = {};
    if (status) {
      where.status = status;
    }
    
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { skills: { contains: search, mode: 'insensitive' } },
        { preferredLocation: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    // Get job seekers with pagination
    const jobSeekers = await prisma.jobSeeker.findMany({
      where,
      skip,
      take: parseInt(limit),
      orderBy: { createdAt: 'desc' }
    });
    
    // Get total count for pagination
    const total = await prisma.jobSeeker.count({ where });
    
    return res.status(200).json({
      data: jobSeekers,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching job seekers:', error);
    return res.status(500).json({ message: 'Error fetching job seekers' });
  }
}

// Update job seeker status
async function updateJobSeeker(req, res) {
  try {
    const { id } = req.query;
    const { status } = req.body;
    
    if (!id) {
      return res.status(400).json({ message: 'Job seeker ID is required' });
    }
    
    if (!status || !['pending', 'reviewed', 'matched'].includes(status)) {
      return res.status(400).json({ message: 'Valid status is required' });
    }
    
    const jobSeeker = await prisma.jobSeeker.update({
      where: { id },
      data: { status }
    });
    
    return res.status(200).json({ 
      success: true,
      message: 'Job seeker status updated successfully',
      data: jobSeeker
    });
  } catch (error) {
    console.error('Error updating job seeker:', error);
    return res.status(500).json({ message: 'Error updating job seeker' });
  }
}

// Delete job seeker
async function deleteJobSeeker(req, res) {
  try {
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ message: 'Job seeker ID is required' });
    }
    
    await prisma.jobSeeker.delete({
      where: { id }
    });
    
    return res.status(200).json({ 
      success: true,
      message: 'Job seeker deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting job seeker:', error);
    return res.status(500).json({ message: 'Error deleting job seeker' });
  }
}
