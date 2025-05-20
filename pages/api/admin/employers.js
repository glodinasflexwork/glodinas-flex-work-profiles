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
      return getEmployers(req, res);
    case 'PUT':
      return updateEmployer(req, res);
    case 'DELETE':
      return deleteEmployer(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

// Get employers with filtering and pagination
async function getEmployers(req, res) {
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
        { companyName: { contains: search, mode: 'insensitive' } },
        { contactPerson: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { industry: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    // Get employers with pagination
    const employers = await prisma.employer.findMany({
      where,
      skip,
      take: parseInt(limit),
      orderBy: { createdAt: 'desc' }
    });
    
    // Get total count for pagination
    const total = await prisma.employer.count({ where });
    
    return res.status(200).json({
      data: employers,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching employers:', error);
    return res.status(500).json({ message: 'Error fetching employers' });
  }
}

// Update employer status
async function updateEmployer(req, res) {
  try {
    const { id } = req.query;
    const { status } = req.body;
    
    if (!id) {
      return res.status(400).json({ message: 'Employer ID is required' });
    }
    
    if (!status || !['pending', 'reviewed', 'contacted'].includes(status)) {
      return res.status(400).json({ message: 'Valid status is required' });
    }
    
    const employer = await prisma.employer.update({
      where: { id },
      data: { status }
    });
    
    return res.status(200).json({ 
      success: true,
      message: 'Employer status updated successfully',
      data: employer
    });
  } catch (error) {
    console.error('Error updating employer:', error);
    return res.status(500).json({ message: 'Error updating employer' });
  }
}

// Delete employer
async function deleteEmployer(req, res) {
  try {
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ message: 'Employer ID is required' });
    }
    
    await prisma.employer.delete({
      where: { id }
    });
    
    return res.status(200).json({ 
      success: true,
      message: 'Employer deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting employer:', error);
    return res.status(500).json({ message: 'Error deleting employer' });
  }
}
