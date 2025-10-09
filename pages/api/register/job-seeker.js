import { hash } from 'bcryptjs';
import prisma from '../../../lib/prisma';

export const runtime = 'edge';
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      dateOfBirth,
      nationality,
      location,
      experience,
      education,
      skills,
      preferredJobType,
      preferredLocation,
      availability,
      resumeUrl
    } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !password) {
      return res.status(400).json({ 
        message: 'Please provide all required fields: first name, last name, email, phone, and password' 
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered. Please use a different email or login.' });
    }
    
    // Hash password
    const hashedPassword = await hash(password, 10);
    
    // Prepare skills data (convert array to JSON string if needed)
    const skillsData = Array.isArray(skills) ? JSON.stringify(skills) : skills;
    
    // Create user and worker profile in a transaction
    const user = await prisma.user.create({
      data: {
        email,
        name: `${firstName} ${lastName}`,
        role: 'WORKER',
        workerProfile: {
          create: {
            firstName,
            lastName,
            phone,
            experience: experience || null,
            skills: skillsData || null,
            availability: availability || null,
            preferredLocation: preferredLocation || location || null,
            resumeUrl: resumeUrl || null,
            status: 'pending'
          }
        }
      },
      include: {
        workerProfile: true
      }
    });
    
    // Log successful registration
    console.log(`New job seeker registered: ${email} (${firstName} ${lastName})`);
    
    res.status(201).json({
      success: true,
      message: 'Registration successful! You can now login with your credentials.',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
    
  } catch (error) {
    console.error('Job seeker registration error:', error);
    
    // Handle specific Prisma errors
    if (error.code === 'P2002') {
      return res.status(400).json({ 
        message: 'Email already registered' 
      });
    }
    
    res.status(500).json({ 
      message: 'Registration failed. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    await prisma.$disconnect();
  }
}

