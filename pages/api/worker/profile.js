import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

// Initialize Prisma Client
let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default async function handler(req, res) {
  try {
    // Get the user session
    const session = await getSession({ req });
    
    // Check if user is authenticated and is a worker
    if (!session || session.user.role !== 'WORKER') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Get user ID from session
    const userId = session.user.id;

    // Handle GET request - fetch profile
    if (req.method === 'GET') {
      try {
        // Get user and worker profile from database
        const user = await prisma.user.findUnique({
          where: { id: userId },
          include: {
            workerProfile: true
          }
        });

        if (!user || !user.workerProfile) {
          return res.status(404).json({ message: 'Worker profile not found' });
        }

        // Format the profile data
        const profile = {
          id: user.id,
          firstName: user.workerProfile.firstName,
          lastName: user.workerProfile.lastName,
          email: user.email,
          phone: user.workerProfile.phone || '',
          skills: user.workerProfile.skills ? user.workerProfile.skills.split(',').map(skill => skill.trim()) : [],
          availability: user.workerProfile.availability || 'Full-time',
          preferredLocation: user.workerProfile.preferredLocation || '',
          resumeUrl: user.workerProfile.resumeUrl || '',
          coverLetterUrl: user.workerProfile.coverLetterUrl || '',
          experience: user.workerProfile.experience || '',
          // Add additional fields with default values for UI compatibility
          address: '',
          city: '',
          postalCode: '',
          country: 'Netherlands',
          bio: '',
          education: [],
          languages: [
            { language: 'English', proficiency: 'Intermediate' },
            { language: 'Dutch', proficiency: 'Intermediate' }
          ],
          preferredLocations: user.workerProfile.preferredLocation ? 
            [user.workerProfile.preferredLocation] : ['Amsterdam', 'Remote'],
          preferredSalary: ''
        };

        return res.status(200).json(profile);
      } catch (error) {
        console.error('Error fetching worker profile:', error);
        return res.status(500).json({ 
          message: 'Error fetching worker profile', 
          error: error.message,
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
      }
    }
    
    // Handle PUT request - update profile
    else if (req.method === 'PUT') {
      try {
        const profileData = req.body;
        
        // Get worker profile ID
        const workerProfile = await prisma.workerProfile.findUnique({
          where: { userId: userId }
        });

        if (!workerProfile) {
          return res.status(404).json({ message: 'Worker profile not found' });
        }

        // Update the worker profile
        await prisma.workerProfile.update({
          where: { id: workerProfile.id },
          data: {
            firstName: profileData.firstName || workerProfile.firstName,
            lastName: profileData.lastName || workerProfile.lastName,
            phone: profileData.phone || workerProfile.phone,
            skills: Array.isArray(profileData.skills) ? profileData.skills.join(', ') : workerProfile.skills,
            experience: profileData.experience || workerProfile.experience,
            availability: profileData.availability || workerProfile.availability,
            preferredLocation: profileData.preferredLocation || 
              (Array.isArray(profileData.preferredLocations) && profileData.preferredLocations.length > 0 ? 
                profileData.preferredLocations[0] : workerProfile.preferredLocation),
            resumeUrl: profileData.resumeUrl || workerProfile.resumeUrl,
            coverLetterUrl: profileData.coverLetterUrl || workerProfile.coverLetterUrl
          }
        });
        
        return res.status(200).json({ message: 'Profile updated successfully' });
      } catch (error) {
        console.error('Error updating worker profile:', error);
        return res.status(500).json({ 
          message: 'Error updating worker profile', 
          error: error.message,
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
      }
    }
    
    // Handle unsupported methods
    else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in worker profile API:', error);
    return res.status(500).json({ 
      message: 'Server error', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
