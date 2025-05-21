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
  
  // Handle GET request - fetch profile
  if (req.method === 'GET') {
    try {
      // Find worker profile
      const profile = await prisma.workerProfile.findUnique({
        where: { userId },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            }
          }
        }
      });
      
      // If profile doesn't exist, return empty profile structure
      if (!profile) {
        return res.status(200).json({
          firstName: session.user.name?.split(' ')[0] || '',
          lastName: session.user.name?.split(' ').slice(1).join(' ') || '',
          email: session.user.email,
          phone: '',
          address: '',
          city: '',
          postalCode: '',
          country: 'Netherlands',
          bio: '',
          skills: '',
          experience: '',
          education: '',
          languages: '',
          availability: 'Full-time',
          preferredLocation: '',
          preferredSalary: '',
          workPermit: true
        });
      }
      
      // Return profile data
      return res.status(200).json({
        firstName: profile.firstName || session.user.name?.split(' ')[0] || '',
        lastName: profile.lastName || session.user.name?.split(' ').slice(1).join(' ') || '',
        email: session.user.email,
        phone: profile.phone || '',
        address: profile.address || '',
        city: profile.city || '',
        postalCode: profile.postalCode || '',
        country: profile.country || 'Netherlands',
        bio: profile.bio || '',
        skills: profile.skills || '',
        experience: profile.experience || '',
        education: profile.education || '',
        languages: profile.languages || '',
        availability: profile.availability || 'Full-time',
        preferredLocation: profile.preferredLocation || '',
        preferredSalary: profile.preferredSalary || '',
        workPermit: profile.workPermit !== null ? profile.workPermit : true
      });
    } catch (error) {
      console.error('Error fetching worker profile:', error);
      return res.status(500).json({ error: 'Failed to fetch profile' });
    }
  }
  
  // Handle POST request - update profile
  if (req.method === 'POST') {
    try {
      const {
        firstName,
        lastName,
        phone,
        address,
        city,
        postalCode,
        country,
        bio,
        skills,
        experience,
        education,
        languages,
        availability,
        preferredLocation,
        preferredSalary,
        workPermit
      } = req.body;
      
      // Update user name
      await prisma.user.update({
        where: { id: userId },
        data: {
          name: `${firstName} ${lastName}`.trim()
        }
      });
      
      // Update or create worker profile
      const profile = await prisma.workerProfile.upsert({
        where: { userId },
        update: {
          firstName,
          lastName,
          phone,
          address,
          city,
          postalCode,
          country,
          bio,
          skills,
          experience,
          education,
          languages,
          availability,
          preferredLocation,
          preferredSalary,
          workPermit
        },
        create: {
          userId,
          firstName,
          lastName,
          phone,
          address,
          city,
          postalCode,
          country,
          bio,
          skills,
          experience,
          education,
          languages,
          availability,
          preferredLocation,
          preferredSalary,
          workPermit
        }
      });
      
      return res.status(200).json({ success: true, profile });
    } catch (error) {
      console.error('Error updating worker profile:', error);
      return res.status(500).json({ error: 'Failed to update profile' });
    }
  }
  
  // Handle unsupported methods
  return res.status(405).json({ error: 'Method not allowed' });
}
