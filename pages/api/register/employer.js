import { hash } from 'bcryptjs';
import prisma from '../../../lib/prisma';

export const runtime = 'edge';
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    const {
      companyName,
      contactPerson,
      email,
      phone,
      password,
      industry,
      location,
      employeeCount,
      website,
      description
    } = req.body;
    
    // Validate required fields
    if (!companyName || !contactPerson || !email || !phone || !password) {
      return res.status(400).json({ 
        message: 'Please provide all required fields: company name, contact person, email, phone, and password' 
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
    
    // Create user and employer profile in a transaction
    const user = await prisma.user.create({
      data: {
        email,
        name: contactPerson,
        role: 'EMPLOYER',
        employerProfile: {
          create: {
            companyName,
            contactPerson,
            phone,
            industry: industry || null,
            location: location || null,
            status: 'pending'
          }
        }
      },
      include: {
        employerProfile: true
      }
    });
    
    // Create default FREE subscription
    await prisma.subscription.create({
      data: {
        employerId: user.employerProfile.id,
        tier: 'FREE',
        jobPostingLimit: 3,
        activeJobsCount: 0,
        startDate: new Date()
      }
    });
    
    // Log successful registration
    console.log(`New employer registered: ${email} (${companyName})`);
    
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
    console.error('Employer registration error:', error);
    
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

