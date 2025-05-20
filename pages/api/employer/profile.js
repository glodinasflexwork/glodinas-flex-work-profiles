import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const session = await getSession({ req });
  
  // Check authentication and authorization
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  if (session.user.role !== 'EMPLOYER') {
    return res.status(403).json({ message: 'Forbidden: Only employers can access this endpoint' });
  }
  
  // Get the employer profile
  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
          employerProfile: {
            include: {
              subscription: true
            }
          }
        }
      });
      
      if (!user || !user.employerProfile) {
        return res.status(404).json({ message: 'Employer profile not found' });
      }
      
      return res.status(200).json(user.employerProfile);
    } catch (error) {
      console.error('Error fetching employer profile:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  // Update the employer profile
  if (req.method === 'PUT') {
    try {
      // Only allow updating specific fields
      const { phone, vatNumber, location } = req.body;
      
      // Validate required fields
      if (!phone || !location) {
        return res.status(400).json({ message: 'Phone and location are required' });
      }
      
      // Get the employer profile ID
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { employerProfile: true }
      });
      
      if (!user || !user.employerProfile) {
        return res.status(404).json({ message: 'Employer profile not found' });
      }
      
      // Update the profile
      const updatedProfile = await prisma.employerProfile.update({
        where: { id: user.employerProfile.id },
        data: {
          phone,
          vatNumber,
          location,
          updatedAt: new Date()
        }
      });
      
      return res.status(200).json(updatedProfile);
    } catch (error) {
      console.error('Error updating employer profile:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  // Method not allowed
  return res.status(405).json({ message: 'Method not allowed' });
}
