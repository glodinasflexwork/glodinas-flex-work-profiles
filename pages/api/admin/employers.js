import { getAuth } from '@clerk/nextjs/server';
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  // Check authentication with Clerk
  const { userId } = getAuth(req);
  
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Get user from database to check role
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { role: true }
  });

  if (!user || user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Forbidden: Admin access required' });
  }

  if (req.method === 'GET') {
    try {
      const { status, page = 1, limit = 10 } = req.query;
      const skip = (parseInt(page) - 1) * parseInt(limit);

      const where = status ? { status } : {};

      const [employers, total] = await Promise.all([
        prisma.employerProfile.findMany({
          where,
          skip,
          take: parseInt(limit),
          include: {
            user: {
              select: {
                email: true,
                name: true,
                createdAt: true
              }
            },
            subscription: true
          },
          orderBy: { createdAt: 'desc' }
        }),
        prisma.employerProfile.count({ where })
      ]);

      return res.status(200).json({
        employers,
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

  if (req.method === 'PUT') {
    try {
      const { id, status } = req.body;

      if (!id || !status) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const updatedEmployer = await prisma.employerProfile.update({
        where: { id },
        data: { status },
        include: {
          user: {
            select: {
              email: true,
              name: true
            }
          }
        }
      });

      return res.status(200).json(updatedEmployer);
    } catch (error) {
      console.error('Error updating employer:', error);
      return res.status(500).json({ message: 'Error updating employer' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

